import BigNumber from "bignumber.js";
import {MoneyValue, Quotation} from "tinkoff-invest-api/cjs/generated/common";
import {api} from "../api";

export const toBigNum = (value: Quotation | MoneyValue | undefined): BigNumber | undefined => {
    return (value ? BigNumber(value.units + value.nano / 1000000000) : value) as BigNumber extends undefined ? undefined : BigNumber
}

const nanoPrecision = 1_000_000_000;

export const toNum_
    = (qutation: { units: number, nano: number }) => Number(qutation.units + (qutation.nano / nanoPrecision));

export const toQuotation_ = (number: number) => ({
    units: Math.floor(number),
    nano: Math.trunc(number),
});

export const toNum = (value: Quotation | MoneyValue | undefined): number | undefined => {
    return api.helpers.toNumber(value) ;
}
export const toQuotation = (value: number): Quotation => {
    return api.helpers.toQuotation(value) ;
}

export const roundToNearestStep = (candidate, step) => {
    return Math.round(candidate / step) * step;
};
// https://www.npmjs.com/package/worker-farm
