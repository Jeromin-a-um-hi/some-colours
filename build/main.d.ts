declare type colourTypes = "Hex" | "Hex3" | "RGB" | "CMYK" | "RGBA" | "Intermediate" | "Hex8" | "HSV" | "HSB";
declare class Intermediate {
    isLowerCase?: boolean;
    type: colourTypes;
    value: string[];
    constructor(value: string[], isLowerCase?: boolean);
    /**
     * Intermediate -> RGBA
     * @returns RGBa
     */
    toRGBA(): RGBA;
    /**
     * Intermediate -> RGB
     * @returns RGB
     */
    toRGB(): RGB;
    /**
     * Intermediate -> Hex
     * @returns Hex
     */
    toHex(): Hex;
    private intToHex;
    private miniIntToHex;
    toHex3(): Hex3;
    toHex8(): Hex8;
    toCMYK(): CMYK;
}
/**
 * Class from which all colours inherit their values.
 */
declare abstract class ColourType {
    type: colourTypes;
    value: string | string[];
    constructor(passedValue: any, type: colourTypes);
    toIntermediate(): any;
    toHex(): any;
    toHex3(): any;
    toRGB(): RGB;
    toCMYK(): any;
    toRGBA(): RGBA;
    toHex8(): any;
    toHSV(): any;
}
/**
 * String type class.
 * Hex class, accepts string values. Eg: "#000000" which is pitch black.
 */
declare class Hex extends ColourType {
    isLowerCase: boolean;
    constructor(passedValue: string, isLowerCase?: boolean);
    static checkIfHex(value: any): void;
    toIntermediate(): Intermediate;
    private checkIfLowerCase;
}
/**
 * String type class.
 * Hex3 class, accepts string values, minified version of Hex intended for CSS. Eg: "#FFF" (Which is "#FFFFFF" in Hex)
 */
declare class Hex3 extends ColourType {
    isLowerCase: boolean;
    constructor(passedValue: string, isLowerCase?: boolean);
    static checkIfHex3(value: any): void;
    toIntermediate(): Intermediate;
    private checkIfLowerCase;
}
/**
 * Array type class.
 *  RGB class, accepts string[] values. Eg: ["0", "0", "0"] is black.
 */
declare class RGB extends ColourType {
    constructor(passedValue: string[]);
    static checkIfRGB(value: any): void;
    toIntermediate(): Intermediate;
}
/**
 * Array type class.
 * CMYK class, accepts string[] values. Eg: ["75%", "68%", "76%", "90%"] is black in CMYK. % symbols must be added.
 */
declare class CMYK extends ColourType {
    constructor(passedValue: string[]);
    static checkIfCMYK(value: any): void;
    toIntermediate(): Intermediate;
}
/**
 * Array type class.
 * RGBA class, accepts string[] values, it is the extended version of RGB with an alpha channel. Eg: ["0", "0", "0", "1"], which is pitch black.
 */
declare class RGBA extends ColourType {
    constructor(passedValue: string[]);
    static checkIfRBGA(value: any): void;
    toIntermediate(): Intermediate;
}
/**
 * String type class.
 * Hex8 class, accepts Str and string values, it is the extended version of Hex with an alpha channel.
 */
declare class Hex8 extends ColourType {
    isLowerCase: boolean;
    constructor(passedValue: string, isLowerCase?: boolean);
    static checkIfHex8(value: any): void;
    toIntermediate(): Intermediate;
    private checkIfLowerCase;
}
export { RGB, RGBA, CMYK, Hex3, Hex, Hex8 };
//# sourceMappingURL=main.d.ts.map