import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("API Key not found");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function checkModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            fs.writeFileSync('available_models.txt', `API Error: ${JSON.stringify(data.error, null, 2)}`);
            console.log("Error written to available_models.txt");
            return;
        }

        if (data.models) {
            const models = data.models
                .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name)
                .join('\n');
            fs.writeFileSync('available_models.txt', models);
            console.log("Models written to available_models.txt");
        } else {
            fs.writeFileSync('available_models.txt', `No models found: ${JSON.stringify(data, null, 2)}`);
            console.log("No models found, check available_models.txt");
        }
    } catch (err) {
        fs.writeFileSync('available_models.txt', `Request failed: ${err.message}`);
        console.error(err);
    }
}

checkModels();
