import {api} from "./api";
import {Share} from "tinkoff-invest-api/cjs/generated/instruments";
import {HistoricCandle, LastPrice} from "tinkoff-invest-api/dist/generated/marketdata";
import {CandleInterval} from "tinkoff-invest-api/cjs/generated/marketdata";
import {GetCandlesResponse} from "tinkoff-invest-api/cjs/generated/marketdata";
import {instrumentsService} from "./instruments.service";
import {prettyJSON} from "@lib/base/src/utility-methods/stringify";
import {Exchange} from "@lib/base/src/constants/exchange";
import {PreparedCandle} from "./dto/candle";
import {PreparedLastPrice} from "./dto/last.price";

import sub from 'date-fns/sub'
import add from 'date-fns/add'
import startOfMinute from 'date-fns/startOfMinute'
import {toNum} from "./helpers/num";


class MarketDataService {
    constructor() {

    }

    get_candles = async (
        ticker: string,
        from: Date,
        to: Date,
        timeframe: CandleInterval,
        volume: number = 10000
    ) => {
        const share = await instrumentsService.get_share_by_ticker(ticker);

        const candles_ = await this.get_historical_candles(
            ticker,
            from,
            to,
            timeframe,
            volume
        );

        let candles = candles_.candles
            .map((historicCandle: HistoricCandle) => {
                return {
                    ticker: ticker,
                    figi: share.figi,
                    open: toNum(historicCandle.open),
                    high: toNum(historicCandle.high),
                    low: toNum(historicCandle.low),
                    close: toNum(historicCandle.close),
                    volume: historicCandle.volume,
                    time: historicCandle.time,
                    isComplete: historicCandle.isComplete,
                    tf: timeframe
                }
            });
        console.log(prettyJSON(candles));

        return candles

    }

    get_$_price = async (date: string): Promise<number | undefined > => {
        const from = sub(new Date(date), { seconds: 59 })
        const to = add(new Date(date), { seconds: 59 })

        const candles =
            await api.marketdata.getCandles({
                figi: 'BBG0013HGFT4',
                from: startOfMinute(from),
                to: startOfMinute(to),
                interval: CandleInterval.CANDLE_INTERVAL_1_MIN
            })

        if(candles.candles.length === 0) {

            // учесть date-time закрытия торгового дня
            // тут добавить кликхауз таблицу и архив свечей (минутки)
            // каждый вечер скрипт апдейтит
        }

        console.log(prettyJSON(candles))

        const currencyBuy = toNum(candles.candles[0].high);

        console.log(currencyBuy)

        return currencyBuy


        // const dollar = toNum(candles.candles[0].close);
    }

    get_historical_candles = async (
        ticker: string,
        from: Date,
        to: Date,
        timeframe: CandleInterval,
        volume: number
    ): Promise<GetCandlesResponse> => {
        const share: Share = await instrumentsService.get_share_by_ticker(ticker);

        let candles = await api.marketdata.getCandles({
            figi: share.figi,
            from: from,
            to: to,
            interval: timeframe
        })

        candles.candles.sort(function (a: any, b: any) {
            return a.time - b.time;
        }) //return b.time - a.time;

        candles.candles.filter((o: any) => {
            return o.volume > volume
        })

        // const date = candles.map((nc: any) => {
        //     return moment(nc.time).format("YYYY-MM-DD hh:mm")
        // });
        // const high = candles.map((nc: any) => {
        //     return toNum(nc.high)
        // });
        // const close = candles.map((nc: any) => {
        //     return toNum(nc.close)
        // });
        // const low = candles.map((nc: any) => {
        //     return toNum(nc.low)
        // });
        // const open = candles.map((nc: any) => {
        //     return toNum(nc.open)
        // });
        // const volume = candles.map((nc: any) => {
        //     return nc.volume
        // });

        // const json = {
        //     date: date,
        //    // high: undefined,
        //     close: close,
        //     low: low,
        //     open: open,
        //     volume: volume
        // }

        return candles
    }

    getLastPrices = async (figies: string[]): Promise<LastPrice[]> => {
        const last_price = await api.marketdata.getLastPrices({ figi: figies });
        return last_price.lastPrices
    }

    // get_candles = async (ticker:string): Promise<PreparedCandle[]> => {
    //     const share = await instrumentsService.get_share_by_ticker(ticker);
    //     // https://github.com/Tinkoff/investAPI/blob/main/src/docs/load_history.md
    //     let { candles } = await api.marketdata.getCandles({
    //         figi: share.figi,
    //         //from: moment('24.07.2022', "DD/MM/YYYY").add(3, 'hour').toDate(),
    //         from: moment('01.05.2022', "DD/MM/YYYY").add(3, 'hour').toDate(),
    //         to: moment('03.08.2022', "DD/MM/YYYY").toDate(),
    //         //to: moment('31.07.2022', "DD/MM/YYYY").toDate(),
    //         interval: CandleInterval.CANDLE_INTERVAL_DAY
    //     })
    //
    //     candles.sort(function(a:any,b:any){ return a.time - b.time; })
    //
    //     candles = candles.filter( (o:any) => {return o.volume > 10000})
    //
    //     let preparedCandles: PreparedCandle[]  = candles.map((object:any) => {
    //         return {
    //             //...object,
    //             // console.log(moment(2022-07-05T04:00:00.000Z, "DD MM YYYY hh:mm", true))
    //             // time: moment(object.time, "DD.MM.YYYY hh:mm"), SEC issue
    //             date: moment(object.time).format("YYYY-MM-DD").trim(), // %Y-%m-%d
    //             //date: moment(object.time).format("DD-MM-YYYY-hh:mm").trim(),
    //             open: toNum(object.open),
    //             high: toNum(object.high),
    //             low: toNum(object.low),
    //             close: toNum(object.close),
    //             volume: object.volume,
    //             //isComplete: object.isComplete
    //         };
    //     });
    //
    //
    //
    //     return preparedCandles
    // }


}

export const getPreparedLastPrices = async (tickers: string[]): Promise<PreparedLastPrice[]> => {
    const figies: string[] = await instrumentsService.get_figies_by_tickers(tickers)
    const _lastPrices = await getLastPrices(figies)

    const pairs = await instrumentsService
        .get_pairs_ticker_figi(
            [
                Exchange.MOEX, Exchange.MOEX_MORNING, Exchange.MOEX_WEEKEND
            ]
        );

    const lastPrices: PreparedLastPrice[] = _lastPrices.map( (obj:any) => {
        return {
            ticker: pairs.filter( i => { return i.figi === obj.figi } )[0].ticker,
            price: toNum(obj.price),
            time: obj.time
        }
    });

    return lastPrices
}
export const getLastPrices = async (figies: string[]): Promise<LastPrice[]> => {
    const last_price = await api.marketdata.getLastPrices({ figi: figies });
    return last_price.lastPrices
    //const quotation = last_price.lastPrices.filter((lastPrice: LastPrice) => { return lastPrice.figi === share.figi})[0].price
}
