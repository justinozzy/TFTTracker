import key from "../constants/keys.json";
import fetch from 'node-fetch';

//https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${RiotAPIKey}...

//NOTE: THE JOB OF THIS FUNCTION IS TO GATHER ALL THE INFORMATION FROM THE RIOT API
async function getRiotAccount(name:string, ch:string) {
    //Riot Games API link and accessor
    const RiotAPILink = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${key.RiotAPIKey}`;
    const response = await fetch(RiotAPILink);

    //Look at these later for API limiting
    console.log(response.status, response.headers);

    //Gather the json data from Riot's API
    let info = await response.json();

    //DEBUG
    console.log("\n******************************************");
    console.log(info);
    console.log("******************************************");
    console.log(info.id);
    console.log("******************************************");
    console.log(`Name: ${name}`);
    console.log(`ch: ${ch}`);
    console.log("******************************************\n");
    //DEBUG

    if (ch == "id") {
        //Check if the returned id is valid and return id if true: -1 false
        return info.id ? info.id : -1;
    }
    else {
        console.log("Error acquiring profile.");
        return -1;
    }
}

export default async function callRiotAPI(name:string, ch:string): Promise<string> {
    //TokenBucket to limit API Requests (https://www.npmjs.com/package/tokenbucket)
    var TokenBucket = require('tokenbucket');
    
    //Limits requests per minute
    var parentTokenBucket = new TokenBucket({
        size: 100,
        tokensToAddPerInterval: 100,
        interval: 1000 * 120
    });

    //Limits requests per second while staying in minute limit
    var tokenBucket = new TokenBucket({
        size: 20,
        tokensToAddPerInterval: 20,
        interval: 'second',
        parentBucket: parentTokenBucket
    });

    return tokenBucket.removeTokens(1).then(async function(remainingTokens:number){
        console.log('1 token removed,' + remainingTokens + ' tokens left');
        //Call RiotAccount helper
        return await getRiotAccount(name, ch);
    })
    .catch(function (err:Error){
        console.log(err)
        if (err.name === 'NotEnoughSize') {
            console.log('Token bucket empty, please try again later.');
        }
    });
}