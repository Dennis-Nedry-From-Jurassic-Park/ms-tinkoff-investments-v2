import {TinkoffInvestApi} from "tinkoff-invest-api/cjs/api";
import {LastPrice} from "tinkoff-invest-api/dist/generated/marketdata";
import {Share} from "tinkoff-invest-api/dist/generated/instruments";

export const api = new TinkoffInvestApi({ token: process.env.TOKEN + '' });
delete process.env.TOKEN;




