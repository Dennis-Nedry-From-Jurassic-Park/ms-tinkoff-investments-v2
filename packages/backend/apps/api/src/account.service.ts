import {api} from "./api";
import {RealAccount} from "tinkoff-invest-api";

export const getAccounts = async (): Promise<any> => {
    const accounts = await api.users.getAccounts({});
    console.log(accounts);
    return accounts
}

export const AccountId = {
    iis: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_IIS + '',
    brokerage: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_BROKERAGE + '',
    atr: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_ATR + '',
    mom_iis: process.env.CEX_TI_V2_MOM_IIS_ID + '',
};

export const Account = {
    iis: new RealAccount(api, AccountId.iis),
    brokerage: new RealAccount(api, AccountId.brokerage),
};

export type AccountId = typeof AccountId[keyof typeof AccountId]
export type Account = typeof Account[keyof typeof Account]

export class AccountService {
    private readonly accountId: AccountId

    constructor({ accountId }: {accountId: AccountId}) {
        this.accountId = accountId
    }

    getToken = (): string => {
        switch(this.accountId){
            case AccountId.atr: {
                return process.env.CEX_TI_V2_ATR_IIS_TOKEN + ''
            }
            case AccountId.mom_iis: {
                return process.env.CEX_TI_V2_MOM_IIS_TOKEN + ''
            }
            default:
                throw Error(`No such AccountId = ${this.accountId} exists` )
        }
    }
}
