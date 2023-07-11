import {api} from "./api";
import {RealAccount} from "tinkoff-invest-api";

export const getAccounts = async (): Promise<any> => {
    const accounts = await api.users.getAccounts({});
    console.log(accounts);
    return accounts
}

export const AccountId = {
    iis: process.env.BROKER_ACCOUNT_ID_IIS + '',
    brokerage: process.env.BROKER_ACCOUNT_ID_BROKERAGE + '',
};

export const Account = {
    iis: new RealAccount(api, AccountId.iis),
    brokerage: new RealAccount(api, AccountId.brokerage),
};

export type AccountId = typeof AccountId[keyof typeof AccountId]
export type Account = typeof Account[keyof typeof Account]
