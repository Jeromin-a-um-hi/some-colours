// @ts-ignore
import { hexToInt } from "hex-to-int";
type colourTypes = "Hex" | "Hex3" | "RGB" | "CMYK" | "RGBA" | "Intermediate" | "Hex8" | "HSV" | "HSB";

module StringMethods {
    export function stringCheck (string: any): boolean {
        if (typeof string === 'string' || string instanceof String){
            return true;
        } else {
            return false;
        }
    }

    export function stringArrayCheck (string: any[]): boolean {
        for (let item of string) {
            if (stringCheck(item) === false) {
                return false;
            }
        }

        return true;
    }

    export function removeTrailingZeroes (string: string): string {
        return `${parseFloat(string)}`;
    }
}



class Intermediate {
    type: colourTypes = "Intermediate";
    value: string[];
    constructor(value: string[], public isLowerCase?: boolean){
        this.value = value;
    }

    /**
     * Intermediate -> RGBA
     * @returns RGBa
     */
    toRGBA(): RGBA{
        const a = parseFloat((Number(this.value[3]) / 255).toFixed(2).toString()).toString();
        return new RGBA([this.value[0], this.value[1], this.value[2], StringMethods.removeTrailingZeroes((Number(this.value[3]) / 255).toFixed(3))]);
    }

    /**
     * Intermediate -> RGB
     * @returns RGB
     */
    toRGB(): RGB{
        return new RGB([this.value[0], this.value[1], this.value[2]]);
    }

    /**
     * Intermediate -> Hex
     * @returns Hex
     */
    toHex(): Hex{
        const unused: unknown      = this.value.pop();
        const unconvertedR: number = Number(this.value[0]);
        const unconvertedG: number = Number(this.value[1]);
        const unconvertedB: number = Number(this.value[2]);

        const convertedR: string = this.intToHex(unconvertedR, this.isLowerCase);
        const convertedG: string = this.intToHex(unconvertedG, this.isLowerCase);
        const convertedB: string = this.intToHex(unconvertedB, this.isLowerCase);
    
        return new Hex("#" + convertedR + convertedG + convertedB);
    }

    private intToHex(int: number, isLowerCase?: boolean): string{
        const floatRegex: RegExp      = /^(.*?)[.]/;
        const afterPointRegex: RegExp = /\.(.*)/;
        const dividedNumber: string   = (int / 16).toString();
        let wholeNumber: number;
        if(Number(dividedNumber) % 1 === 0){
            wholeNumber = Number(dividedNumber);
        } else {
            wholeNumber = floatRegex.exec(dividedNumber) === null ? 0 : Number(floatRegex.exec(dividedNumber)[1]);
        }
        const points: number  = afterPointRegex.exec(dividedNumber) === null ? 0 : Number(`0${afterPointRegex.exec(dividedNumber)[0]}`);
        const secondaryNumber = points * 16;
        return `${this.miniIntToHex(wholeNumber, isLowerCase)}${this.miniIntToHex(secondaryNumber, isLowerCase)}`;
    }

    private miniIntToHex(int: number | string, isLowerCase?: boolean): string{
        if(int > 9){
            switch(int){
                case 10:
                    return isLowerCase ? "a" : "A";
                    break;
                
                case 11:
                    return isLowerCase ? "b" : "B";
                    break;
    
                case 12:
                    return isLowerCase ? "c" : "C";
                    break;
    
                case 13:
                    return isLowerCase ? "d" : "D";
                    break;
    
                case 14:
                    return isLowerCase ? "e" : "E";
                    break;
    
                case 15:
                    return isLowerCase ? "f" : "F";
                    break;
            }
        } else {
            return int.toString();
        }
    }

    toHex3(): Hex3{
        //@ts-ignore
        const hex = this.toHex(this.value).value.split("");
        if(hex[1] === hex[2] && hex[3] === hex[4] && hex[5] == hex[6]){
            return this.isLowerCase ? new Hex3(`${hex[0]}${hex[1]}${hex[3]}${hex[5]}`.toLowerCase()) : new Hex3(`${hex[0]}${hex[1]}${hex[3]}${hex[5]}`);
        } else {
            throw new Error("This cannot be converted into a Hex3.");
        }
    }

    toHex8(): Hex8{
        const unconvertedR: number = Number(this.value[0]);
        const unconvertedG: number = Number(this.value[1]);
        const unconvertedB: number = Number(this.value[2]);
        const unconvertedA: number = Math.round(Number(this.value[3]));

        const convertedR: string   = this.intToHex(unconvertedR, this.isLowerCase);
        const convertedG: string   = this.intToHex(unconvertedG, this.isLowerCase);
        const convertedB: string   = this.intToHex(unconvertedB, this.isLowerCase);
        const convertedA: string   = this.intToHex(unconvertedA, this.isLowerCase);

        return new Hex8("#" + convertedR + convertedG + convertedB + convertedA);
    }

    toCMYK(): CMYK{
        const R: number  = Number(this.value[0]);
        const G: number  = Number(this.value[1]);
        const B: number  = Number(this.value[2]);

        const R2: number = R / 255;
        const G2: number = G / 255;
        const B2: number = B / 255;

        const K: number  = (1 - Math.max(R2, G2, B2));
        const C: number  = ((1 - R2 - K) / (1 - K));
        const M: number  = ((1 - G2 - K) / (1 - K));
        const Y: number  = (1 - B2 - K) / (1 - K);

        return new CMYK([Math.round(C * 100).toString() + "%", Math.round(M * 100).toString() + "%", Math.round(Y * 100).toString() + "%", Math.round(K * 100).toString() + "%"]);
    }
}

/**
 * Class from which all colours inherit their values.
 */
abstract class ColourType {
    value: string | string[]
    constructor(passedValue: any, public type: colourTypes){
        if (StringMethods.stringCheck(passedValue)) {
            this.value = passedValue;
        } else if (StringMethods.stringArrayCheck(passedValue)){
            this.value = passedValue;
        } else {
            throw new Error("The value of the variable/variables entered must be a string.");
        }
    }

    toIntermediate(): any{};

    toHex(){
        return this.toIntermediate().toHex();
    };

    toHex3(){
        return this.toIntermediate().toHex3();
    };

    toRGB(): RGB{
        return this.toIntermediate().toRGB();
    }

    toCMYK(){
        return this.toIntermediate().toCMYK();
    }

    toRGBA(): RGBA{
        return this.toIntermediate().toRGBA();
    }

    toHex8(){
        return this.toIntermediate().toHex8();
    }

    toHSV(){
        return this.toIntermediate().toHSV();
    }
}

// Line break for ease of reading

/**
 * String type class.
 * Hex class, accepts string values. Eg: "#000000" which is pitch black.
 */
class Hex extends ColourType {
    constructor(passedValue: string, public isLowerCase = false){
        super(passedValue, "Hex");
        Hex.checkIfHex(this.value);
        this.checkIfLowerCase(this.value);
    }

    static checkIfHex(value){
        const CHECKHEX = /^[#][0-9a-fA-F]{6}/;
        if (CHECKHEX.test(value)){
        } else {
            throw new Error("Invalid Hex: " + value);
        }
    }

    toIntermediate(): Intermediate{
        // @ts-ignore
        const valueSliced: string  = this.value.slice(1);
        const valueSplit: string[] = valueSliced.split("");
        const unconvertedR: string = `${valueSplit[0] + valueSplit[1]}`;
        const unconvertedG: string = `${valueSplit[2] + valueSplit[3]}`;
        const unconvertedB: string = `${valueSplit[4] + valueSplit[5]}`;

        const convertedR: string   = hexToInt(unconvertedR).toString();
        const convertedG: string   = hexToInt(unconvertedG).toString();
        const convertedB: string   = hexToInt(unconvertedB).toString();
        const A: string = "255";

        return new Intermediate([convertedR, convertedG, convertedB, A], this.isLowerCase);
    };

    private checkIfLowerCase(value){
        const CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)){
            this.isLowerCase = true;
        }
    }
}

/**
 * String type class.
 * Hex3 class, accepts string values, minified version of Hex intended for CSS. Eg: "#FFF" (Which is "#FFFFFF" in Hex)
 */
class Hex3 extends ColourType {
    constructor(passedValue: string, public isLowerCase = false){
        super(passedValue, "Hex3");
        Hex3.checkIfHex3(this.value);
        this.checkIfLowerCase(this.value);
    }

    static checkIfHex3(value){
        const CHECK_HEX3 = /^[#][0-9a-fA-F]{3}/;
        if (CHECK_HEX3.test(value)){
            return;
        } else {
            throw new Error("Invalid Hex3. " + value);
        }
    }
    
    toIntermediate(): Intermediate{
        // @ts-ignore
        const valueSliced: string  = this.value.slice(1);
        const valueSplit: string[] = valueSliced.split("");
        const unconvertedR: string = `${valueSplit[0] + valueSplit[0]}`;
        const unconvertedG: string = `${valueSplit[1] + valueSplit[1]}`;
        const unconvertedB: string = `${valueSplit[2] + valueSplit[2]}`;

        const convertedR = hexToInt(unconvertedR).toString();
        const convertedG = hexToInt(unconvertedG).toString();
        const convertedB = hexToInt(unconvertedB).toString();
        const A = "255";

        return new Intermediate([convertedR, convertedG, convertedB, A], this.isLowerCase);
    }

    private checkIfLowerCase(value){
        const CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)){
            this.isLowerCase = true;
        }
    }
}

/**
 * Array type class.
 *  RGB class, accepts string[] values. Eg: ["0", "0", "0"] is black.
 */
class RGB extends ColourType {
    constructor(passedValue: string[]){
        super(passedValue, "RGB");
        RGB.checkIfRGB(this.value);
    }

    static checkIfRGB(value){
        const CHECK_RGB = /^[0-9]{1,3}/;
        if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2])){
            return;
        } else {
            throw new Error("Invalid RGB. " + value);
        }
    }

    toIntermediate(): Intermediate{
        return new Intermediate([this.value[0], this.value[1], this.value[2], "255"]);
    }
}

/**
 * Array type class.
 * CMYK class, accepts string[] values. Eg: ["75%", "68%", "76%", "90%"] is black in CMYK. % symbols must be added.
 */
class CMYK extends ColourType {
    constructor(passedValue: string[]){
        super(passedValue, "CMYK");
        CMYK.checkIfCMYK(this.value);
    }

    static checkIfCMYK(value){
        const CHECK_CMYK = /^[0-9]{1,3}[%]/;
        if (CHECK_CMYK.test(value[0]) && CHECK_CMYK.test(value[1]) && CHECK_CMYK.test(value[2]) && CHECK_CMYK.test(value[3])){
            return;
        } else {
            throw new Error("Invalid CMYK. " + value);
        }
    }

    toIntermediate(){
        const C: number = Number(this.value[0].slice(0, -1)) / 100;
        const M: number = Number(this.value[1].slice(0, -1)) / 100;
        const Y: number = Number(this.value[2].slice(0, -1)) / 100;
        const K: number = Number(this.value[3].slice(0, -1)) / 100;
        const R: number = 255 * (1 - C) * (1 - K);
        const G: number = 255 * (1 - M) * (1 - K);
        const B: number = 255 * (1 - Y) * (1 - K);

        return new Intermediate([Math.round(R).toString(), Math.round(G).toString(), Math.round(B).toString(), "255"]);
    }
}

/**
 * Array type class.
 * RGBA class, accepts string[] values, it is the extended version of RGB with an alpha channel. Eg: ["0", "0", "0", "1"], which is pitch black.
 */
class RGBA extends ColourType {
    constructor(passedValue: string[]){
        super(passedValue, "RGBA");
        RGBA.checkIfRBGA(this.value);
    }

    static checkIfRBGA(value){
        const CHECK_RGB = /^[0-9]{1,3}/;
        const CHECK_RGBA = /^([0](\.[0-9]{1,3})?)?([1][^0-9\.])?/;
        if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2]) && CHECK_RGBA.test(value[3])){
            return;
        } else if (CHECK_RGB.test(value[0]) && CHECK_RGB.test(value[1]) && CHECK_RGB.test(value[2]) && value[3] === "1"){
            return;
        } else {
            throw new Error("Invalid RGBA. " + value);
        }
    }

    toIntermediate(){
        return new Intermediate([this.value[0], this.value[1], this.value[2], `${Math.round(Number(this.value[3]) * 255)}`]);
    }
}

/**
 * String type class.
 * Hex8 class, accepts Str and string values, it is the extended version of Hex with an alpha channel.
 */
class Hex8 extends ColourType {
    constructor(passedValue: string, public isLowerCase = false){
        super(passedValue, "Hex8");
        Hex8.checkIfHex8(this.value);
        this.checkIfLowerCase(this.value);
    }

    static checkIfHex8(value){
        const CHECK_HEX3 = /^[#][0-9a-fA-F]{8}/;
        if (CHECK_HEX3.test(value)){
            return;
        } else {
            throw new Error("Invalid Hex8.");
        }
    }

    toIntermediate(): Intermediate{
        // @ts-ignore
        const valueSliced: string  = this.value.slice(1);
        const valueSplit: string[] = valueSliced.split("");
        const unconvertedR: string = `${valueSplit[0] + valueSplit[1]}`;
        const unconvertedG: string = `${valueSplit[2] + valueSplit[3]}`;
        const unconvertedB: string = `${valueSplit[4] + valueSplit[5]}`;
        const unconvertedA: string = `${valueSplit[6] + valueSplit[7]}`;
        
        const convertedR: string   = hexToInt(unconvertedR).toString();
        const convertedG: string   = hexToInt(unconvertedG).toString();
        const convertedB: string   = hexToInt(unconvertedB).toString();
        const convertedA: string   = hexToInt(unconvertedA).toString();
        return new Intermediate([convertedR, convertedG, convertedB, convertedA], this.isLowerCase);
    }

    private checkIfLowerCase(value){
        const CHECK_LOWER = /[a-f]/;
        if (CHECK_LOWER.test(value)){
            this.isLowerCase = true;
        }
    }
}

export { RGB, RGBA, CMYK, Hex3, Hex, Hex8 };