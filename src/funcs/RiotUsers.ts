import { rankTier, rankDivision } from "./RankEnums";

//RiotUser interface to store summoner data
export interface RiotRank {
    tier: rankTier;
    division: rankDivision;
    lp: number;
}

export interface RiotUser {
    username: string;
    rank: RiotRank;
}