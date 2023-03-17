//import { Configuration, OpenAIApi } from "openai";
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
require("dotenv").config();

const configuration = new Configuration({
    organization: "org-AnOLa9ySdB1ghFclK0TkTLZt",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

let myPrompt = 
`

`
exports.start = async(req, res) =>{
    let newPrompt = process.env.myprompt;
    try {
        console.log("start called");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: newPrompt,
            max_tokens: 100,
            temperature: 0.6,
        });
        if(response.data.choices[0].text){
            res.json({message: response.data.choices[0].text})
            myPrompt = newPrompt + response.data.choices[0].text;
            console.log(myPrompt);
        }
       
    } catch (error) {
        console.error(error.message);
    }
};

exports.output = async(req, res) =>{
    console.log("\nCHOICE called" + req.body.message);
    try {
        console.log(myPrompt + "\n\nEND of GIVEN PROMPT\n");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: myPrompt + "\n\nPlayer:" + req.body.message,
            max_tokens: 100,
            temperature: 0.6,
        });
        if(response.data.choices[0].text){
            res.json({message: response.data.choices[0].text})  
            myPrompt = myPrompt + response.data.choices[0].text + "\n\nPlayer:" + req.body.message + "\n";
            console.log("NEW PROMPT" + myPrompt);                    
        }
        
       
    } catch (error) {
        console.error(error.message);
    }
};

