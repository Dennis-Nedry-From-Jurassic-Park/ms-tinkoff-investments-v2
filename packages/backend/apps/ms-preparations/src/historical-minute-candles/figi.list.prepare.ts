import {instrumentsService} from "../../../api/src/instruments.service";
import {createWriteStream, promises as fsPromises} from 'fs';
import {join} from "path";

export async function asyncWriteFile(filename: string, data: any) {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    try {
        await fsPromises.writeFile(join(__dirname, filename), data, {
            flag: 'w',
        });

        const contents = await fsPromises.readFile(
            join(__dirname, filename),
            'utf-8',
        );
        //console.log(contents);

        return contents;
    } catch (err) {
        console.log(err);
        return 'Something went wrong';
    }
}

const exec132 = async () => {
    const res = instrumentsService.get_share_by_field_with_value(
        "figi",
        "BBG004731032"
    )
    console.log(res);
    const r2 = await instrumentsService.get_russian_shares()
    console.log(r2.map(it => it.ticker));
    //console.log(r2.map(it => it.figi));
    console.log(r2.map(it => it.ticker).length);

    let figi: any[] = []
    let figi_str = ""
    const tickers = [
        'MDMG',  'MOEX',  'YNDX',  'VTBR',  'FEES',
        'ALRS',  'ENRU',  'MGNT',  'LKOH',  'PLZL',
        'SBER',  'PHOR',  'DSKY',  'GEMC',  'FIVE',
        'BANE',  'BANEP', 'RUAL',  'GMKN',  'OZON',
        'UPRO',  'MTLRP', 'HYDR',  'RTKMP', 'AFKS',
        'ROSN',  'GAZP',  'RASP',  'CHMF',  'ETLN',
        'SFTL',  'SBERP', 'TATNP', 'SNGS',  'TGKA',
        'VKCO',  'AGRO',  'CIAN',  'OGKB',  'RSTI',
        'TATN',  'RTKM',  'MVID',  'PIKK',  'NLMK',
        'MTSS',  'LSRG',  'SNGSP', 'MAGN',
        'SIBN',  'NVTK',  'MTLR',  'POLY',  'CBOM',
        'IRAO',  'AFLT'
    ]

    for(const share of r2) {
        if (tickers.includes(share.ticker)){
            figi.push(share.figi)
            figi_str += share.figi + '\n'
        }
    }
    console.log(figi);
    const fileName =
        './txt/moex.txt'
    await asyncWriteFile(fileName, figi_str)
}
exec132();
