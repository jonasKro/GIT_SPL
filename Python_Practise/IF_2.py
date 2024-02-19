import random

ran1 = random.randint(0, 100)
ran2 = random.randint(0, 100)

print("Zufallszahl 1 ist:", ran1)
print("Zufallszahl 2 ist:", ran2)

if ran1 < ran2 and ran1 < 50:
    print("Zahl 1 ist kleiner als Zahl 2 und Mini")
    
if ran1 < 30 or ran2 < 30:
    print("Eine der beiden ist kleiner als 30")
    
if ran1 < 50 and ran2 != 50:
    print("Erste Zahl klein, zweite kein 50iger")