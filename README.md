# some-colours

Library for conversion between Hex, Hex3, Hex8, RGB, RGBA and CMYK. All inputs must be strings.

## Create a colour object:

    let redHex = new Hex("#FF0000");
    let redHex3 = new Hex3("#F00");
    let redHex8 = new Hex8("#FF000000");               //Hex, Hex3 and Hex8 must use #
    let redRGB = new RGB(["255", "0", "0"]);
    let redRGBA = new RGBA(["255", "0", "0"]);
    let redCMYK = new CMYK(["0", "100%", "100%", "0"]) //CMYK must use %

## Obtain value of object:

    console.log(redHex.value)                          //"#FF0000"

## Convert between colour types:

    let newRedRGBA = redHex.toRGBA();
    console.log(newRedRGBA.value);                     // ["255", "0", "0", "1"]
