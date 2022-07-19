import key from "../constants/keys.json";
import fetch from 'node-fetch';
import { getRankTier, getRankDivision} from "./RankEnums";
import { RiotRank } from "./RiotUsers";

//NOTE: THE JOB OF THIS FUNCTION IS TO GATHER ALL THE INFORMATION FROM THE RIOT API
async function getRiotAccount(name:string, ch:string): Promise<RiotRank | undefined> {
    //Riot Games API link and accessor
    const riotAPIID = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${key.RiotAPIKey}`;
    let idResponse = await fetch(riotAPIID);
    let idInfo = await idResponse.json();
    let id = ""

    if (ch == "id") {
        //Check if the returned id is valid and return id if true: -1 false
        id = idInfo.id;
        
        //TFT Ranked info (has to be created here or id will be empty in riotAPIRankedInfo)
        const riotAPIRankedInfo = `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${key.RiotAPIKey}`
        let rankResponse = await fetch(riotAPIRankedInfo);
        let rankInfo = await rankResponse.json();

        console.log(riotAPIRankedInfo)

        //Check if user has a rank
        if (!rankInfo || rankInfo == undefined) {
            return undefined;
        }

        //Store all the ranked information in an interface
        let riotRank: RiotRank = {
            tier: getRankTier(rankInfo[0].tier),
            division: getRankDivision(rankInfo[0].rank),
            lp: rankInfo[0].leaguePoints as number
        };

        //Return above array if valid
        return riotRank ? riotRank : undefined;
    }
    else {
        console.log("Error acquiring profile.");
        return undefined;
    }
}

export default async function callRiotAPI(name:string, ch:string): Promise<RiotRank | undefined> {
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

    return tokenBucket.removeTokens(2).then(async function(remainingTokens:number){
        console.log('2 tokens removed,' + remainingTokens + ' tokens left');
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