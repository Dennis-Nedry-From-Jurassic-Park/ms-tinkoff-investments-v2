function filterOutliers(someArray: number[]) {

    if(someArray.length < 4)
        return someArray;

    let values, q1, q3, iqr, maxValue:number, minValue:number;

    values = someArray.slice().sort( (a, b) => a - b);//copy array fast and sort

    if((values.length / 4) % 1 === 0){//find quartiles
        q1 = 1/2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
        q3 = 1/2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
    } else {
        q1 = values[Math.floor(values.length / 4 + 1)];
        q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
    }

    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;

    return values.filter((x) => (x >= minValue) && (x <= maxValue));
}

function filterOutliers2(someArray: number[]) {

    // Copy the values, rather than operating on references to existing values
    let values = someArray.concat();

    // Then sort
    values.sort( function(a, b) {
        return a - b;
    });

    /* Then find a generous IQR. This is generous because if (values.length / 4)
     * is not an int, then really you should average the two elements on either
     * side to find q1.
     */
    let q1 = values[Math.floor((values.length / 4))];
    // Likewise for q3.
    let q3 = values[Math.ceil((values.length * (3 / 4)))];
    let iqr = q3 - q1;

    // Then find min and max values
    let maxValue = q3 + iqr*1.5;
    let minValue = q1 - iqr*1.5;

    // Then filter anything beyond or beneath these values.
    let filteredValues = values.filter(function(x) {
        return (x <= maxValue) && (x >= minValue);
    });

    // Then return
    return filteredValues;
}

console.log(filterOutliers([1,8,125,150, 100000,800000,900000, 100000000]));
console.log(filterOutliers2([1,8,125,150, 100000,800000,900000, 100000000]));
console.log(filterOutliers([1,8,125,150, 100000,800000]));
console.log(filterOutliers2([1,8,125,150, 100000,800000]));
