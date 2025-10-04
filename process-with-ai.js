// APPROACH
// get title and link from NASA data csv file
// get publication contents
// summarize it using ai
// store data in json file

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Papa from 'papaparse';
import { GoogleGenerativeAI} from '@google/generative-ai';
import 'detenv/config';
