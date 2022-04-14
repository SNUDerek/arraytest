import numpy as np
import os

if not os.path.isdir("vectors"):
    os.makedirs("vectors")

for fp in (32, 64):
    
    for i in range(5):
        if fp == 32:
            vec = np.random.random((768,)).astype(np.float32)
        else:
            vec = np.random.random((768,)).astype(np.float64)
        lst = vec.tolist()
        vby = vec.tobytes()
        vhx = vby.hex()
        with open(f"vectors/fp{fp}_arr{i:02d}_hex.txt", "w") as f:
            f.write(vhx)
        with open(f"vectors/fp{fp}_arr{i:02d}_str.txt", "w") as f:
            for x in lst:
                f.write(f"{x}\n")
        np.save(f"vectors/fp{fp}_arr{i:02d}_vec.npy", vec)
