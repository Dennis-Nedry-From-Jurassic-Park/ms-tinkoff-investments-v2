import {TinkoffInvestApi} from "tinkoff-invest-api";
// https://github.com/vitalets/tinkoff-invest-api/issues/1
// https://github.com/alpacahq/alpaca-ts/issues/106
export class Api {
    private readonly api: TinkoffInvestApi

    constructor({ api } : { api: TinkoffInvestApi }) {
        this.api = api
    }

    get_api = () => this.api
}
