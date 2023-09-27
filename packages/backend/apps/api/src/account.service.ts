import {RealAccount, TinkoffInvestApi} from "tinkoff-invest-api";
import {ApiService} from "./api.service";

export const AccountId = {
    iis: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_IIS + '',
    brokerage: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_BROKERAGE + '',
    atr: process.env.CEX_TI_V2_BROKER_ACCOUNT_ID_ATR + '',
    mom_iis: process.env.CEX_TI_V2_MOM_IIS_ID + '',
};

// export const Account = {
//     iis: new RealAccount(api, AccountId.iis),
//     atr: new RealAccount(api, AccountId.atr),
//     mom_iis: new RealAccount(api, AccountId.mom_iis),
//     brokerage: new RealAccount(api, AccountId.brokerage),
// };

export type Account = RealAccount
export type AccountId = typeof AccountId[keyof typeof AccountId]
//export type Account = typeof Account[keyof typeof Account]

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
// https://github.com/vitalets/tinkoff-invest-api/issues/1
// https://github.com/alpacahq/alpaca-ts/issues/106
export class AccountService extends ApiService {
    private readonly accountId: AccountId

    constructor({
                    api,
                    accountId
    } : {
        api: TinkoffInvestApi,
        accountId: AccountId
    }) {
        super({api});
        this.accountId = accountId
    }

    getAccount = (): RealAccount => {
        return new RealAccount(this.get_api(), this.accountId)
    }

    getAccountId = (): string => {
        return this.accountId
    }

    getAccounts = async (): Promise<any> => {
        const accounts = await this.get_api().users.getAccounts({});
        console.log(accounts);
        return accounts
    }


}
