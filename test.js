var fs = require('fs');
var process = require('process');
// var ndarray = require("ndarray");

// convert hex string to bytes
// from stackoverflow: https://bit.ly/37jJ58b
// purportedly adapted from crypto-js
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}


// convert bytes to hex string
// from stackoverflow: https://bit.ly/37jJ58b
// purportedly adapted from crypto-js
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}


// convert hex string to vector
function hexStringtoVector(hexString, dtype="float64") {
    buffer = hexToBytes(hexString);
    bytes = Uint8Array.from(buffer);
    if (dtype === "float32") {
        floats = new Float32Array(bytes.buffer);
    }else if (dtype === "float64") {
        floats = new Float64Array(bytes.buffer);
    }else {
        console.log(`idiot! ${dtype} not accepted`)
    };
    return floats;
};


// convert vector to hex string
function VectortoHexString(vector) {
    rebytes = new Uint8Array(vector.buffer);
    rehexed = bytesToHex(rebytes);
    return rehexed;
};


// parse arguments
let args = [];
process.argv.forEach(function (val, index, array) {
    args.push(val);
    // console.log(index, val, args)
  });

let fp = 32;
if (args.length > 2) {
    fp = args[2];
};

let idx = 0;
if (args.length > 3) {
    idx = args[3];
};

// read in hex string file and convert to float## vector
let fileName = `vectors/fp${fp}_arr0${idx}_hex.txt`;
let floatprec = `float${fp}`;

let hexString = fs.readFileSync(fileName, 'utf8');

let stringValues = fs.readFileSync(fileName.replace("_hex", "_str"), 'utf8').split("\n");

floatvector = hexStringtoVector(hexString, dtype=floatprec);

console.log(`testing ${fileName}\n`);

console.log(`len array: ${floatvector.length}\tlen data: ${stringValues.length-1}\n`);  // minus last empty line

// compare each value to confirm same

let diffs = 0;
for (let i = 0; i < floatvector.length; i++) {
    if (i < 8) {
        console.log(`${i}: ${stringValues[i]}\t\t${floatvector[i]}`)
    };
    if (floatvector[i] != stringValues[i]) {
        console.log(`${floatvector[i]}\t\t${stringValues[i]}`);
        diffs += 1;
    };
  };
console.log(`\ndecoded vector compared with source with ${diffs} different values\n`);

// convert back to hex string
rehexed = VectortoHexString(floatvector);

console.log(`input hexstring same as re-converted hex string: ${rehexed === hexString}`);

if (rehexed != hexString) {
    console.log(hexString+"\n\n\n")
    console.log(rehexed)
};
