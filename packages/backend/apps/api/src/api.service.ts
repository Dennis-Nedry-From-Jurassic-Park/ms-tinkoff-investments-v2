import {TinkoffInvestApi} from "tinkoff-invest-api";

export class ApiService {
    private readonly api: TinkoffInvestApi

    constructor({ api } : { api: TinkoffInvestApi }) {
        this.api = api
    }

    get_api = () => this.api
}
