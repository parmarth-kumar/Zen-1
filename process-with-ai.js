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
const OUTPUT_JSON_PATH = './src/data/ai-generated-data.json;
const BATCH_SIZE = 50; // nos. of research paper proccessed in one go
const CATEGORIESS = ['plant-biology','radiation-effects','human-physiology','microbiology','cellular-biology'];

// --- API & MODAL ---
if (!process.env.GEMINI_API_KEYS) {
  throw new Error("GEMINI_API_KEYS not found in .env file as comma-seperated list.");
}
const apiKeys = process.env.GEMINI_API_KEYS.split(',').map(k => k.trim());
let currentKeyIndex = 0;
let modal;








