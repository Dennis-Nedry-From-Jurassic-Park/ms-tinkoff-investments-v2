import {InstrumentStatus, Share, TradingSchedule} from "tinkoff-invest-api/cjs/generated/instruments";
import {SecurityTradingStatus} from "tinkoff-invest-api/cjs/generated/common";
import {addDays, format, isBefore, parseISO} from 'date-fns'
import {shares_status_all, shares_status_base, shares_status_base_imoex} from "./assets";
import assert from "assert";
import {DAY} from "@lib/base/src/constants/date.time.formats";
import {Exchange} from "@lib/base/dist";
import number from "extra-number";
import {TinkoffInvestApi} from "tinkoff-invest-api";

export interface Pair {
    ticker: string,
    figi: string
}

interface Instruments {
    instruments: Share[]
}

//type IMOEX = Exchange.MOEX | Exchange.MOEX_MORNING

export class InstrumentsService {
    private readonly status: InstrumentStatus;
    private readonly isQualifiedInvestor: boolean;
    private readonly otcFlag: boolean;
    private readonly shortEnabledFlag: boolean;
    private shares: Share[] = [];
    private shares_imoex: Share[] = [];
    private instruments: Instruments = {instruments: []};
    private readonly imoex_exchanges: Exchange[] = [];
    private api: TinkoffInvestApi

    constructor({
                    api,
                    status,
                    isQualifiedInvestor,
                    shortEnabledFlag,
                }: {
                    api: TinkoffInvestApi,
                    status?: InstrumentStatus.INSTRUMENT_STATUS_BASE,
                    isQualifiedInvestor?: false,
                    shortEnabledFlag?: true,
                }
    ) {
        this.api = api;
        this.status = status;
        this.isQualifiedInvestor = isQualifiedInvestor;
        this.otcFlag = this.isQualifiedInvestor;
        this.shortEnabledFlag = shortEnabledFlag;

        this.imoex_exchanges = [
            Exchange.MOEX, Exchange.MOEX_WEEKEND, Exchange.MOEX_MORNING
        ];

        // MOEX_DEALER_WEEKEND = 'MOEX_DEALER_WEEKEND',
        // MOEX_EVENING_WEEKEND = 'MOEX_EVENING_WEEKEND',
        // MOEX_INVESTBOX = 'MOEX_INVESTBOX',
        // MOEX_PLUS = 'MOEX_PLUS',
        // MOEX_PLUS_WEEKEND = 'MOEX_PLUS_WEEKEND',


        const shares_file_name_imoex = shares_status_base_imoex
        const shares_file_name =
            this.status === InstrumentStatus.INSTRUMENT_STATUS_BASE ? shares_status_base : shares_status_all;

        this.shares = require(shares_file_name).instruments.filter((share: Share) => share.otcFlag === this.otcFlag);
        this.shares_imoex = require(shares_file_name_imoex).instruments.filter((share: Share) => share.otcFlag === this.otcFlag);

        this.instruments = require(shares_file_name);
    }

    get_figies_by_tickers = async (tickers: string[]): Promise<string[]> => {
        return this.shares.filter((share: Share) => {
            return share.otcFlag === this.otcFlag && tickers.includes(share.ticker)
        }).map((share: Share) => {
            return share.figi
        });
    }

    get_figies_by_tickers_with_filter = async (
        tickers?: string[],
        exchanges?: Exchange[],
        buyAvailableFlag?: boolean,
        sellAvailableFlag?: boolean,
        apiTradeAvailableFlag?: boolean,
    ): Promise<string[]> => {
        return (await this.get_shares_by_tickers_with_filter(
            tickers, exchanges, buyAvailableFlag, sellAvailableFlag, apiTradeAvailableFlag
        )).map((share: Share) => {
            return share.figi
        });
    }

    // get_russian_shares = async (
    //     tickers: string[],
    //     buyAvailableFlag: boolean = true,
    //     sellAvailableFlag: boolean = true,
    //     apiTradeAvailableFlag: boolean = true,
    //     exchanges: Exchange[] = [Exchange.MOEX, Exchange.MOEX_MORNING]
    // ): Promise<Share[]> => {
    //     return await this.get_shares_by_tickers_with_filter(tickers, exchanges, buyAvailableFlag, sellAvailableFlag);
    // }

    get_russian_shares = async (
        tickers?: string[],
        exchanges: Exchange[] = this.imoex_exchanges,
        buyAvailableFlag: boolean = true,
        sellAvailableFlag: boolean = true,
        apiTradeAvailableFlag: boolean = true,
    ): Promise<Share[]> => {
        return await this._get_russian_shares(
            tickers,
            exchanges,
            buyAvailableFlag,
            sellAvailableFlag,
            apiTradeAvailableFlag,
        )
    }

    get_all_russian_shares = async (): Promise<Share[]> => {
        return await this._get_russian_shares(
            undefined,
            this.imoex_exchanges,
            undefined,
            undefined,
            undefined
        )
    }
    get_all_american_shares = async (): Promise<Share[]> => {
        return await this._get_russian_shares(
            undefined,
            [Exchange.SPB],
            undefined,
            undefined,
            undefined
        )
    }

    get_american_shares_ = async (
        tickers: string[],
        exchanges: Exchange[] = [Exchange.SPBE],
        buyAvailableFlag: boolean,
        sellAvailableFlag: boolean,
        apiTradeAvailableFlag?: boolean,
    ): Promise<Share[]> => {
        return await this.get_shares_by_tickers_with_filter(tickers, exchanges, buyAvailableFlag, sellAvailableFlag);
    }

    get_russian_shares_ = async (apiTradeAvailableFlag: boolean = false): Promise<Share[]> => {
        let shares: Share[] = require(shares_status_base).instruments.filter((share: Share) => {
            // return !share.otcFlag && share.exchange === 'MOEX'  460 акций

            return !share.otcFlag
                && (
                    share.exchange === Exchange.MOEX
                    || share.exchange === Exchange.MOEX_MORNING
                    || share.exchange === Exchange.MOEX_WEEKEND
                    || share.exchange === Exchange.MOEX_DEALER_WEEKEND
                    || share.exchange === Exchange.MOEX_EVENING_WEEKEND
                    || share.exchange === Exchange.MOEX_INVESTBOX
                    || share.exchange === Exchange.MOEX_PLUS
                    || share.exchange === Exchange.MOEX_PLUS_WEEKEND
                )
                && share.tradingStatus !== SecurityTradingStatus.SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING
                && share.buyAvailableFlag
                && share.sellAvailableFlag
            //&& share.apiTradeAvailableFlag === apiTradeAvailableFlag
        });
        return shares
    }

    get_shares_by_tickers_with_filter = async (
        tickers?: string[],
        exchanges?: Exchange[],
        buyAvailableFlag?: boolean,
        sellAvailableFlag?: boolean,
        apiTradeAvailableFlag?: boolean,
    ): Promise<Share[]> => {
        let _exchanges = exchanges!.filter((item) => {
            return isNaN(Number(item));
        }).map(it => it.toString());

        return this.shares.filter((share: Share) => {
            const buyAvailableFlag_ = buyAvailableFlag !== undefined ? buyAvailableFlag === share.buyAvailableFlag : true
            const sellAvailableFlag_ = sellAvailableFlag !== undefined ? share.sellAvailableFlag === sellAvailableFlag : true
            const apiTradeAvailableFlag_ = apiTradeAvailableFlag !== undefined ? share.apiTradeAvailableFlag === apiTradeAvailableFlag : true
            const filterByTickers = tickers !== undefined ? tickers.includes(share.ticker) : true
            const filterByExchange = exchanges !== undefined ? (_exchanges!.includes(share.exchange)) : true

            return buyAvailableFlag_
                && sellAvailableFlag_
                && apiTradeAvailableFlag_
                && share.otcFlag === this.otcFlag
                && share.shortEnabledFlag === this.shortEnabledFlag
                && share.tradingStatus !== SecurityTradingStatus.SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING
                && filterByTickers
                && filterByExchange
        })
    }

    _get_pairs_ticker_figi = async (tickers: string[]): Promise<Pair[]> => {
        return this.shares.filter((share: Share) => {
            return tickers.includes(share.ticker)//  && share.otcFlag === this.otcFlag && share.tradingStatus !== SecurityTradingStatus.SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING
        }).map((s: Share) => {
            return {ticker: s.ticker, figi: s.figi}
        });
    }

    get_pairs_ticker_figi = async (exchanges?: Exchange[]): Promise<Pair[]> => {
        let values = exchanges!.filter((item) => {
            return isNaN(Number(item));
        }).map(it => it.toString());


        return this.shares.filter((share: Share) => {
            const bool1 = exchanges !== undefined ? (values!.includes(share.exchange)) : true
            return bool1 && share.otcFlag === this.otcFlag && share.tradingStatus !== SecurityTradingStatus.SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING
        }).map((s: Share) => {
            return {ticker: s.ticker, figi: s.figi}
        });
    }

    get_tickers = async (): Promise<string[]> => {
        return this.shares.map((s: Share) => {
            return s.ticker
        });
    }

    get_figies = async (tickers: string[]): Promise<string[]> => {
        return this.shares.filter(it => tickers.includes(it.ticker)).map((s: Share) => {
            return s.figi
        });
    }

    get_instrument_by_ticker = async (ticker: string): Promise<Share> => {
        return this.instruments.instruments.filter((s: Share) => {
            return s.ticker === ticker
        })[0];
    } // возможно обобщённый метод и для валюты подойдёт

    get_share_by_isin = async (isin: string): Promise<Share> => {
        return this.shares.filter((s: Share) => {
            return s.isin === isin
        })[0];
    }

    get_share_by_ticker = async (ticker: string): Promise<Share> => {
        return this.shares.filter((s: Share) => {
            return s.ticker === ticker
        })[0];
    }

    get_share_by_figi_sync = (figi: string): Share => {
        return this.shares.filter((s: Share) => {
            return s.figi === figi
        })[0];
    }

    genericFilter<T>(
        objects: T[],
        properties: Array<keyof T>,
        queries: Array<string>[] | Array<number>[]
    ): T[] {
        return objects.filter((object) => {
            let count = 0;
            properties.some((props) => {
                const objectValue = object[props]
                if (typeof objectValue === "string" || typeof objectValue === "number") {
                    queries.forEach((query) => {
                        query.forEach((queryValue) => {
                            if (queryValue === objectValue) {
                                count += 1;
                            }
                        })
                    })
                }
            })
            return count === properties.length;
        })
    }

    get_share_by_field_with_value = (
        field: any,
        value: string
    ): Share[] => {
        const arr: Array<string>[] = [[value]]
        return this.genericFilter(this.shares, [field], arr)

    }
    get_share_by_uid_sync = (uid: string): Share => {

        return this.shares.filter((s: Share) => {
            return s.uid === uid
        })[0];
    }

    get_share_by_figi = async (figi: string): Promise<Share> => {
        return this.shares.filter((s: Share) => {
            return s.figi === figi
        })[0];
    }

    get_share_by_figi_ = (figi: string): Share => {
        return this.shares.filter((s: Share) => {
            return s.figi === figi
        })[0];
    }

    is_trading_day = async (exchange: string): Promise<boolean> => {
        const now = new Date();

        const tradingDay = await this.api.instruments.tradingSchedules({
            exchange: exchange,
            from: now,
            to: now,
        });

        const exchanges = tradingDay.exchanges;

        assert(exchanges.length > 0, 'list of exchanges should be not empty');
        // TODO: в цикле обойти ?
        const days = exchanges.filter((tradingSchedule: TradingSchedule) => {
            return tradingSchedule.exchange === exchange
        })[0].days[0];

        //console.log(prettyJSON(tradingDay))

        return days.isTradingDay
    }

    get_gap_dates = async (dates: string[]): Promise<string[]> => {
        let gap_dates: any[] = [];

        for (let i = 0; i < dates.length - 1; i++) {
            let startDate = await addDays(new Date(dates[i]), 1);
            let endDate = await addDays(new Date(dates[i + 1]), 0);

            for (let m: Date = parseISO(startDate.toDateString()); await isBefore(m, endDate); m.setDate(m.getDate() + 1)) {
                gap_dates.push(await format(m, DAY));
            }
        }

        // console.log(gap_dates)

        return gap_dates;
    }

    private _get_russian_shares = async (
        tickers?: string[],
        exchanges?: Exchange[],
        buyAvailableFlag?: boolean,
        sellAvailableFlag?: boolean,
        apiTradeAvailableFlag?: boolean,
    ): Promise<Share[]> => {
        return await this.get_shares_by_tickers_with_filter(tickers, exchanges, buyAvailableFlag, sellAvailableFlag, apiTradeAvailableFlag);
    }
}
