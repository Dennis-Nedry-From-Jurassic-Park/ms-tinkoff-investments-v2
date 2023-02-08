import {TinkoffInvestApi} from "tinkoff-invest-api/cjs/api";

export const api = new TinkoffInvestApi({ token: process.env.TOKEN + '' });
delete process.env.TOKEN;
