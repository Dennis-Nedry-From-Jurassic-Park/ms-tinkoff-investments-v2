import {TinkoffInvestApi} from "tinkoff-invest-api/cjs/api";
import {MarketDataResponse} from "tinkoff-invest-api/dist/generated/marketdata";

export async function waitMarketStreamEvent(api: TinkoffInvestApi, event: 'data' | 'close') {
    return new Promise<MarketDataResponse>(resolve => api.stream.market.on(event, resolve));
}

export const default_retries = 3;
export const default_retry_delay = 5000;
