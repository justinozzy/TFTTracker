import key from "../constants/keys.json";
import fetch from 'node-fetch';

//https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${RiotAPIKey}...

//NOTE: THE JOB OF THIS FUNCTION IS TO GATHER ALL THE INFORMATION FROM THE RIOT API

//Are name and ch supposed to be chars or strings? who fucking knows! ill figure out later

export default async function grabProfile(name:string, ch:string) {
    //Riot Games API link and accessor
    const RiotAPILink = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${key.RiotAPIKey}`;
    const response = await fetch(RiotAPILink);

    //Gather the json data from Riot's API
    let info = await response.json();

    //DEBUG
    console.log("\n******************************************");
    console.log(info);
    console.log("******************************************");
    console.log(info.summonerLevel);
    console.log("******************************************");
    console.log(`Name: ${name}`);
    console.log(`ch: ${ch}`);
    console.log("******************************************\n");
    //DEBUG

    if (ch == "summonerLevel") {
        return info.summonerLevel;
    }
    else{
        return console.log("Error acquiring profile.");
    }
}