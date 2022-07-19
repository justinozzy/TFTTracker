export enum rankDivision {
    IV = 3,
    III = 2,
    II = 1,
    I = 0,
    UNKNOWN = -1
}

export enum rankTier {
    IRON = 8,
    BRONZE = 7,
    SILVER = 6,
    GOLD = 5,
    PLATINUM = 4,
    DIAMOND = 3,
    MASTER = 2,
    GRANDMASTER = 1,
    CHALLENGER = 0,
    UNKNOWN = -1
}

export function getRankTier (str: string): rankTier {
    switch (str) {
        case "IRON": return rankTier.IRON;
        case "BRONZE": return rankTier.BRONZE;
        case "SILVER": return rankTier.SILVER;
        case "GOLD": return rankTier.GOLD;
        case "PLATINUM": return rankTier.PLATINUM;
        case "DIAMOND": return rankTier.DIAMOND;
        case "MASTER": return rankTier.MASTER;
        case "GRANDMASTER": return rankTier.GRANDMASTER;
        case "CHALLENGER": return rankTier.CHALLENGER;
        default: return rankTier.UNKNOWN;
    }
}

export function getRankDivision (str: string): rankDivision {
    switch(str) {
        case "IV": return rankDivision.IV;
        case "III": return rankDivision.III;
        case "II": return rankDivision.II;
        case "I": return rankDivision.I;
        default: return rankDivision.UNKNOWN;
    }
}