//RiotUser interface to store summoner data
export interface RiotUser {
    username:string;
    level:number;
    rank?:number;
    division?:number;
    lp?:number;
}