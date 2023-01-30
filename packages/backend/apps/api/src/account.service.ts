import {api} from "./api";

export const getAccounts = async () => {
    const accounts = await api.users.getAccounts({});
    console.log(accounts);
    return accounts
}

export const Account = {
    iis: process.env.BROKER_ACCOUNT_ID_IIS,
    brokerage: process.env.BROKER_ACCOUNT_ID_BROKERAGE,
};

export type Account = typeof Account[keyof typeof Account]
