export function hexToInt(rawValue: string): number {
    let rawValueArray: any[] = rawValue.split("");
    for(let i in rawValueArray){
        let num = rawValueArray[i];
        if(num === "a" || num === "A"){
            rawValueArray[i] = 10;
        } else if(num === "b" || num === "B"){
            rawValueArray[i] = 11;
        } else if(num === "c" || num === "C"){
            rawValueArray[i] = 12;
        } else if(num === "d" || num === "D"){
            rawValueArray[i] = 13;
        } else if(num === "e" || num === "E"){
            rawValueArray[i] = 14;
        } else if(num === "f" || num === "F"){
            rawValueArray[i] = 15;
        };
    };
    let x: number = 0;
    let sum: number = 0;
    for(let i in rawValueArray){
        x += 1;
        sum += rawValueArray[i] * (16 ** (rawValueArray.length - x));
    };
    return sum;
}