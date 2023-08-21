import {TinkoffInvestApi} from "tinkoff-invest-api/cjs/api";

const SANDBOX_TOKEN = process.env.SANDBOX_TOKEN

const api = new TinkoffInvestApi({ token: SANDBOX_TOKEN + '' });

const sandbox = async () => {
    const accs = await api.sandbox.getSandboxAccounts({})
    console.log(accs);
} // 02230026-eac7-4eeb-9ec2-3c93ccc40b53
sandbox();
