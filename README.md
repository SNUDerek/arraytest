# test encoding vectors as hex strings

## what is

just testing recovering encoded vectors from python to javascript, seeing is believing etc.

i don't wanna store dense vector embedding data as `ARRAY` in postgres because of support concerns.

so, i can encode the data as strings. in python, i can use: `myNumpyArray.tobytes().hex()` to yield hex-encoded data as string. you need to know dtype and shape (if not flat) to recover the data.

this test confirms i can also reconstruct data in javascript (not bound to python+numpy to get data stored this way)

simple python example:

```
vec = np.random.random((768,)).astype(np.float32)
print(f"source: {vec.shape} type {vec.dtype}")

vhx = vec.tobytes().hex()
print("hex data type:", type(vhx).__name__)

new = np.frombuffer(bytes.fromhex(vhx), dtype=np.float32)
print(f"from hex: {new.shape} type {new.dtype}")
print("np.allclose?:", np.allclose(vec, new))

>>> source: (768,) type float32
>>> hex data type: str
>>> >>> from hex: (768,) type float32
np.allclose?: True
```

## to use

1. generate data with `generate.py`
2. do `npm` stuff
3. `node test.js <float precision=32 or 64> <file index =0 to 4>

output is like, 

```
$ node test.js 32 0
testing vectors/fp32_arr00_hex.txt

len array: 768  len data: 768

0: 0.3353233337402344   0.3353233337402344
1: 0.7392846345901489   0.7392846345901489
2: 0.766887366771698    0.766887366771698
3: 0.23875844478607178     0.23875844478607178
4: 0.1707001030445099   0.1707001030445099
5: 0.25364530086517334     0.25364530086517334
6: 0.6206768751144409   0.6206768751144409
7: 0.8257111310958862   0.8257111310958862

decoded vector compared with source with 0 different values

input hexstring same as re-converted hex string: true


$ node test.js 64 2
testing vectors/fp64_arr02_hex.txt

len array: 768  len data: 768

0: 0.12180643229876786     0.12180643229876786
1: 0.577577641340863    0.577577641340863
2: 0.18178888284704398     0.18178888284704398
3: 0.5941708531762541   0.5941708531762541
4: 0.7356200568580668   0.7356200568580668
5: 0.15607398746965984     0.15607398746965984
6: 0.2522853977872086   0.2522853977872086
7: 0.10572180353964022     0.10572180353964022

decoded vector compared with source with 0 different values

input hexstring same as re-converted hex string: true
```

## references

- https://stackoverflow.com/questions/41903504/converting-a-string-of-packed-bytes-into-an-array-of-floats-in-javascript
- https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
- https://www.npmjs.com/package/ndarray