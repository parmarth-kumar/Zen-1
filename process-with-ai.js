// APPROACH
// get title and link from NASA data csv file
// get publication contents
// summarize it using ai (to deal with high number of data multiple API used)
// store data in json file

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Papa from 'papaparse';
import { GoogleGenerativeAI} from '@google/generative-ai';
import 'detenv/config';

// --- CONFIGURATIONS ---
const CSV_URL = 'https://raw.githubusercontent.com/jgalazka/SB_publications/main/SB_publication_PMC.csv';
const OUTPUT_JSON_PATH = './src/data/ai-generated-data.json';
const BATCH_SIZE = 50; // nos. of research paper processed in one go
const CATEGORIESS = ['plant-biology','radiation-effects','human-physiology','microbiology','cellular-biology'];

// --- API & MODEL ---
if (!process.env.GEMINI_API_KEYS) {
  throw new Error("GEMINI_API_KEYS not found in .env file as comma-seperated list.");
}
const apiKeys = process.env.GEMINI_API_KEYS.split(',').map(k => k.trim());
let currentKeyIndex = 0;
let model;


/* Rotates to the next API key and re-initializes the model*/
function rotateApiKey(increment = true) {
  if (increment) currentKeyIndex++;
  if (currentKeyIndex >= apiKeys.length) {
    console.error("🚨 All API keys have excceeded their quotas.");
    return false;
  }
  console.log(`🔄 Switching to API key #${currentKeyIndex + 1}.`);
  const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
  // at time of creating project these model works perfect too 'gemini-2.5-pro' or 'gemini-2.5-flash' or 'gemini-2.5-flash-lite'
  return true
}


/* Load and parse a JSON file */
function loadJsonFile(path) {
    if (!fs.existsSync(path)) return [];
    try {
        const fileContent = fs.readFileSync(path, 'utf-8');
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (e) {
        console.error(`⚠️ Could not parse ${path}. Starting from scratch.`);
        return [];
    }
}


/* Scrapes the full text content from a given URL (PMC / PubMed Central). */
async function scrapeFullText(url) {
    try {
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);

        let textParts = [];

        // Abstract
        const abstract = $('section.abstract, div.abstract, section#abstract1').text().trim();
        if (abstract) textParts.push("Abstract:\n" + abstract);
      
        // Main body
        const body = $('section.body.main-article-body').text().trim();
        if (body) textParts.push("Main Body:\n" + body);
      
        // Fallback selectors (just in case some PMC pages differ)
        if (textParts.length === 0) {
            const fallback = $('div#body, div#maincontent, div.journal-article').text().trim();
            if (fallback) textParts.push(fallback);
        }
        let text = textParts.join("\n\n").replace(/\s\s+/g, ' ').slice(0, 30000);

        if (!text || text.length < 200) {
            console.warn(`⚠️ Scraper found little/no text for ${url}`);
        }

        return text;
    } catch (error) {
        console.error(`❌ Failed to scrape ${url}: ${error.message}`);
        return null;
    }
}


/* Analyzing and creating summary/key findings of research paper text with Gemini & handling retries. */
async function analyzeWithAI(text, title) {
    const prompt = `
        You are a research assistant specializing in space biology.
        Analyze the following research paper text. Based *only* on the text provided, return a JSON object with the following structure:
        {
          "summary": "A concise, easy-to-understand summary and key findings of the research (7-10 sentences).",
          "category": "The most relevant category from this list: [${CATEGORIES.join(', ')}].",
          "year": "The publication year (as a number). If not found, use ${new Date().getFullYear()}.",
          "keywords": ["An array of 5-7 relevant keywords."]
        }
        
        Original Title: "${title}"
        Paper Text: "${text}"
    `;
    // 3 retries
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const jsonText = response.text().replace(/```json|```/g, '').trim();
            return JSON.parse(jsonText);
        } catch (error) {
            if (error.message.includes('429 Too Many Requests')) {
                console.warn(`🔑 Quota exceeded for key #${currentKeyIndex + 1}.`);
                if (!rotateApiKey()) throw new Error("All API keys exhausted.");
                attempt = 0; // Reset attempts for the new key
                continue;
            }
            console.error(`- AI analysis for "${title}" failed (Attempt ${attempt}/3)`);
            if (attempt === 3) {
                console.error(`- ❌ Final attempt failed. Skipping article. Error: ${error.message}`);
                return null;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    return null;
}


