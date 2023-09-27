import {api} from "./api";
import {RealAccount, TinkoffInvestApi} from "tinkoff-invest-api";

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
    atr: new RealAccount(api, AccountId.atr),
    mom_iis: new RealAccount(api, AccountId.mom_iis),
    brokerage: new RealAccount(api, AccountId.brokerage),
};

export type AccountId = typeof AccountId[keyof typeof AccountId]
export type Account = typeof Account[keyof typeof Account]

export class TokenService {
    private readonly accountId: AccountId

    constructor({
                    accountId
                }: {
        accountId: AccountId
    }) {
        this.accountId = accountId
    }
    getToken = (): string => {
        switch(this.accountId) {
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

export class AccountService {
    private api: TinkoffInvestApi
    private readonly accountId: AccountId

    constructor({
                    api,
                    accountId
    }: {
        api: TinkoffInvestApi,
        accountId: AccountId
    }) {
        this.api = api
        this.accountId = accountId
    }

    getAccount = (): Account => {
        return new RealAccount(this.api, this.accountId)
    }

    getAccountId = (): string => {
        return this.accountId
    }


}
