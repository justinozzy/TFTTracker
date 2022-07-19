import { rankTier } from "./RankEnums"
import { RiotUser } from "./RiotUsers"

export default function sortUsers (data: RiotUser[]): RiotUser[] {
    data.sort((a, b) =>{
        //Sort the accounts based on tier, division, and lp (-1: a before b, 1: a after b, 0: do nothing)
        if (a.rank.tier == b.rank.tier) {
            if (a.rank.division == b.rank.division) {
                if (a.rank.lp == b.rank.lp) {
                    return 0;
                }
                return a.rank.lp < b.rank.lp ? 1 : -1;
            }
            return a.rank.division < b.rank.division ? -1 : 1;
        }
        else {
            return a.rank.tier < b.rank.tier ? -1 : 1;
        }
    })

    console.log('Sorting complete.')

    return data;
}