export const Model = {
    deals: 'deals',
    logs: 'logs',
    errors: 'errors',
}

export type Model = typeof Model[keyof typeof Model]
