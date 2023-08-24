import {TinkoffInvestApi} from "tinkoff-invest-api";
// https://github.com/vitalets/tinkoff-invest-api/issues/1
// https://github.com/alpacahq/alpaca-ts/issues/106

export const api = new TinkoffInvestApi({ token: process.env.TOKEN + '' });
