export const Currency = {
    rub: 'rub',
    usd: 'usd',
};

export type Currency = typeof Currency[keyof typeof Currency]
