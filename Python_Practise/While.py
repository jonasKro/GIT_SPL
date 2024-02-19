import random

rand = 0
res = 0
while rand != 15 and rand != 30:
    rand = random.randint(10, 25)
    res+=rand

    
print(res)


