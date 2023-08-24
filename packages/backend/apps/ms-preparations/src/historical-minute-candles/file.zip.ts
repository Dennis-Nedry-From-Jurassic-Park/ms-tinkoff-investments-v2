import zip from 'yauzl';

export const isValidZipFile = (filePath:any) => {
    return zip.open(filePath, { lazyEntries: true }, (err:any, stream:any ) => {
        if (err) {
            console.log('fail to read ', filePath);
            return false;
        }
        console.log('success read ', filePath);
        return true;
    });
}
