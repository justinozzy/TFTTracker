//RiotUser interface to store summoner data
export interface RiotUser {
    username:string;
    id:string;
    rank?:number;
    division?:number;
    lp?:number;
}