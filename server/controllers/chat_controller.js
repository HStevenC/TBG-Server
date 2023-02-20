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


// Pretend you are a text adventure game engine. Prompt me interactively like the game would, but do not assume which action I would take and do not choose for me, rather, let me choose. You will give me 3 options (A,B,C). Do not provide further explanations. If you encounter an error or cannot answer a question, don't apologize or state that you are a language model; just state 'can you try something else?'. Describe the pictures the game displays. Make the game story coherent and not randomly say I came across a fork road, forest, or dungeon even when I pick a choice where I search for something. The game is about trying to rescue a princess. One of the two endings has to occur by choice 7 which are: win if princess is rescued, else lose. Display the 3 options in separate lines for the entirely of this game."

// Pretend you are a pokemon game. Don't ever break out of your character and don't refer to yourself in anyway. The game start with me in a battle with another person in a pokemon battle and we each take turns. We each have a pokemon which will be chosen by you. You will keep track of the skills each pokemon has and its health points. You will keep narrating the game as if you are the game and prompt me like a game would and display the skills (A,B,C) in separate lines once it's my turn and do not choose for me. Don't show me my opponent's skills. The game will end once one of our pokemon reach zero points. I start with 100 health points and will die if it reaches 0 health points while fighting. One of the two endings has to occur by choice 7 which are: I win if I rescue the princess or lose if I die somehow. Display the options nicely. Start with "Game:"

// I want you to act as if you are a two truth one lie game. This game is not about you but about real world facts. I dont want you to ever break out of your character, and you must not refer to yourself in any way. If I want to give you instructions outside the context of the game, I will use curly brackets {like this} but otherwise you are to stick to being the text detective program. Prompt me interactively like the game would, but do not assume which action I would take and do not choose for me, rather, let me choose. You will give me 3 options (A,B,C) and player will pick the lie. Display the options nicely. start with Game:

let myPrompt = 
`

`
exports.start = async(req, res) =>{
    let newPrompt = 
    `
    Pretend you are a text adventure game engine. Prompt me interactively like the game would, but do not assume which action I would take and do not choose for me, rather, let me choose. You will give me 3 options (A,B,C). Do not provide further explanations. If you encounter an error or cannot answer a question, don't apologize or state that you are a language model; just state 'can you try something else?'. Describe the pictures the game displays. Make the game story coherent and not randomly say I came across a fork road, forest, or dungeon even when I pick a choice where I search for something. The game is about trying to rescue a princess. One of the two endings has to occur which are: win if princess is rescued, else lose. I can get pass certain obstacle by solving riddles (you will still give me the 3 options) and do not solve the riddles for me.
    `
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

