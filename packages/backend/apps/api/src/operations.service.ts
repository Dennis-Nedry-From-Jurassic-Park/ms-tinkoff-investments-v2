import {api} from "./api";
import {MoneyValue} from "tinkoff-invest-api/cjs/generated/common";
import {Account} from "./account.service";
import {OperationsResponse, OperationState} from "tinkoff-invest-api/dist/generated/operations";
import {toNum} from "./helpers/num";

export const getPortfolioBalance = async (account: Account, currency: string): Promise<number | undefined> => {
    const positions = await api.operations.getPositions({ accountId: account.accountId});
    const balance = positions.money.filter( (balance: MoneyValue) => { return balance.currency === currency })[0];
    console.log('balance: ' + balance);
    return toNum(balance);
}

export const get_operations = async (
    accountId: Account,
    from: Date,
    to: Date,
    state: OperationState,
    figi: string,
): Promise<OperationsResponse>  => {
    return await api.operations.getOperations({
        accountId: accountId + '',
        from: from,
        to: to,
        state: state,
        figi: figi,
    });
}
