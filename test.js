var fs = require('fs');
var process = require('process');
// var ndarray = require("ndarray");

// convert hex string to bytes
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// convert bytes to 
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
// console.log(args, fp, idx);

let fileName = `vectors/fp${fp}_arr0${idx}_hex.txt`;
let floatprec = `float${fp}`;

let hexString = fs.readFileSync(fileName, 'utf8');

let stringValues = fs.readFileSync(fileName.replace("_hex", "_str"), 'utf8').split("\n");

floatvector = hexStringtoVector(hexString, dtype=floatprec);

console.log(`testing ${fileName}\n`);

console.log(`len array: ${floatvector.length}\tlen data: ${stringValues.length-1}\n`);  // minus last empty line

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
console.log(`\ndecoded vector compared with source with ${diffs} different values`);
