export type BalanceSnapshot = {
    money: (number| undefined)[],
    blocked: (number| undefined)[],
    currency: string,
}

export type NearestPrice = {
    nearestPrice: number,
    minPriceIncrement: number
}

export type LogMsg = any;
