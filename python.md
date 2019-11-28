## Create a matrix of all zeros 

```python3
# using generator
def get_matrix(rows, cols):
    return [[0 for x in range(cols)] for y in range(rows)] 

# old loop
def get_matrix(rows, cols):
    matrix = []
    for row in range(rows):
        matrix.append([0] * cols)
    return matrix
    
get_matrix(3, 4)

[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

