export const Exchange = {
    None: '',

    SPB: 'SPB',
    SPB_DE: 'SPB_DE',
    SPB_DE_MORNING: 'SPB_DE_MORNING',
    SPB_EUROBONDS: 'SPB_EUROBONDS',
    SPB_HK: 'SPB_HK',
    SPB_MORNING: 'SPB_MORNING',
    SPB_MORNING_WEEKEND: 'SPB_MORNING_WEEKEND',
    SPB_RU_MORNING: 'SPB_RU_MORNING',
    SPB_WEEKEND: 'SPB_WEEKEND',

    SPBE: 'SPBE',

    MOEX: 'MOEX',
    MOEX_MORNING: 'MOEX_MORNING',
    MOEX_WEEKEND: 'MOEX_WEEKEND',
    MOEX_DEALER_WEEKEND: 'MOEX_DEALER_WEEKEND',
    MOEX_EVENING_WEEKEND: 'MOEX_EVENING_WEEKEND',
    MOEX_INVESTBOX: 'MOEX_INVESTBOX',
    MOEX_PLUS: 'MOEX_PLUS',
    MOEX_PLUS_WEEKEND: 'MOEX_PLUS_WEEKEND',

    ATONBONDS: 'atonbonds',
    BORSAITALIANA: 'borsaitaliana',
    CBOE_C1_OPTIONS: 'cboe_c1_options',
    CBOE_RUI: 'cboe_rui',
    CBOE_SPX: 'cboe_spx',
    CBOEBZX: 'cboebzx',
    CME_GROUP: 'cme_group',
    DEALER_INT_EXCHANGE: 'dealer_int_exchange',
    DEALER_OTC: 'dealer_otc',
    EURONEXTAMSTERDAM: 'euronextamsterdam',
    EURONEXTBRUSSELS: 'euronextbrussels',
    EURONEXTPARIS: 'euronextparis',
    FORTS: 'FORTS',
    FORTS_EVENING: 'FORTS_EVENING',
    FX: 'FX',
    FX_MTL: 'FX_MTL',
    FX_WEEKEND: 'FX_WEEKEND',
    HELSINKI: 'helsinki',
    HONGKONG: 'hongkong',
    HONGKONG_INDEX: 'hongkong_index',
    INVESTORSEXCHANGE: 'investorsexchange',
    Issuance: 'Issuance',
    Issuance2: 'Issuance2',
    lse: 'lse',
    LSE_INDEX: 'lse_index',
    LSE_MORNING: 'lse_morning',
    madrid: 'madrid',

    NASDAQ: 'nasdaq',
    NOTES: 'notes',
    NYSE: 'nyse',
    OSLO: 'oslo',
    OTCUS: 'otcus',
    REFINITIV: 'refinitiv',
    REFINITIV_CRYPTO: 'refinitiv_crypto',
    SBER_OTC: 'sber_otc',

    SSE: 'sse',
    SWISS: 'swiss',
    THEICE: 'theice',
    VIENNA: 'vienna',
    XETR: 'XETR',
    XETRA: 'xetra'
}

export type Exchange = typeof Exchange[keyof typeof Exchange]
