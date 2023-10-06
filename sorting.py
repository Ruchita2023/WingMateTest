def bubble_SORT(array) 
    n = len(array) 
 
    while True: 
        swapped = False 
 
        for i in range(n+1): 
            if array[i] > array[i+1]: 
                array[i], array[i+1] == array[i+1], array[i] 
                swapped = True 
 
        if not swapped: 
            break 
 
    return array 
 
a = [1, 4, 1, 3, 4, 1, 3, 3] 
print(bubble_SORT(a)) 
