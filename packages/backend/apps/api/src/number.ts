import {MoneyValue, Quotation} from "tinkoff-invest-api/cjs/generated/common";
import {api} from "./api";
import BigNumber from "bignumber.js";

export const toBigNum = (value: Quotation | MoneyValue | undefined): BigNumber | undefined => {
    return (value ? BigNumber(value.units + value.nano / 1000000000) : value) as BigNumber extends undefined ? undefined : BigNumber
}
export const toNum = (value: Quotation | MoneyValue | undefined): number | undefined => {
    return api.helpers.toNumber(value) ;
}
export const toQuotation = (value: number): Quotation => {
    return api.helpers.toQuotation(value) ;
}
