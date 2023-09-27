import BigNumber from "bignumber.js";
import {MoneyValue, Quotation} from "tinkoff-invest-api/cjs/generated/common";
import {TinkoffInvestApi} from "tinkoff-invest-api";

export class PriceHelper {
    private api: TinkoffInvestApi
    private nanoPrecision = 1_000_000_000;

    constructor({ api }: { api: TinkoffInvestApi }) {
        this.api = api
    }

    toBigNum = (value: Quotation | MoneyValue | undefined): BigNumber | undefined => {
        return (value ? BigNumber(value.units + value.nano / 1000000000) : value) as BigNumber extends undefined ? undefined : BigNumber
    }

    toNum_
        = (qutation: { units: number, nano: number }) => Number(qutation.units + (qutation.nano / this.nanoPrecision));

    toQuotation_ = (number: number) => ({
        units: Math.floor(number),
        nano: Math.trunc(number),
    });

    toNum = (value: Quotation | MoneyValue | undefined): number | undefined => {
        return this.api.helpers.toNumber(value) ;
    }
    toQuotation = (value: number): Quotation => {
        return this.api.helpers.toQuotation(value) ;
    }

    roundToNearestStep = (candidate, step) => {
        return Math.round(candidate / step) * step;
    };
// https://www.npmjs.com/package/worker-farm
}


