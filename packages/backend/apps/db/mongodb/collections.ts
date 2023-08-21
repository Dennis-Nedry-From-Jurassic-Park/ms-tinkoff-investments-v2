const temp = '' // _zstd

export const Collection = {
    imoex_stream_errors: 'imoex.stream.errors' + temp,
    imoex_marketdata_candles: 'imoex.marketdata.candles' + temp,
    imoex_orderbook: 'imoex.orderbook' + temp,
    imoex_trades: 'imoex.trades' + temp,
    imoex_last_price: 'imoex.last_price' + temp,
    imoex_errors: 'imoex.errors' + temp,
    imoex_operations_portfolio: 'imoex.operations.portfolio' + temp,
    imoex_operations_positions: 'imoex.operations.positions' + temp,
    imoex_operations_getWithdrawLimits: 'imoex.operations.getWithdrawLimits' + temp,

    imoex_instruments_tradingSchedules: 'imoex.instruments.tradingSchedules' + temp,
    imoex_instruments_getAssets: 'imoex.instruments.getAssets' + temp,
    imoex_instruments_base_currencies: 'imoex.instruments.base.currencies' + temp,
    imoex_instruments_base_etfs: 'imoex.instruments.base.etfs' + temp,
    imoex_instruments_base_shares: 'imoex.instruments.base.shares' + temp,
    imoex_instruments_base_futures: 'imoex.instruments.base.futures' + temp,
    imoex_instruments_all_currencies: 'imoex.instruments.all.currencies' + temp,
    imoex_instruments_all_etfs: 'imoex.instruments.all.etfs' + temp,
    imoex_instruments_all_shares: 'imoex.instruments.all.shares' + temp,
    imoex_instruments_all_futures: 'imoex.instruments.all.futures' + temp,
    /* users */
    imoex_users_getAccounts: 'imoex.users.getAccounts' + temp,
    imoex_users_getMarginAttributes: 'imoex.users.getMarginAttributes' + temp,
    imoex_users_getUserTariff: 'imoex.users.getUserTariff' + temp,
    imoex_users_getInfo: 'imoex.users.getInfo' + temp,

    /* orders */
    imoex_orders_postOrder: 'imoex.orders.postOrder' + temp,



};

export type Collection = typeof Collection[keyof typeof Collection]
