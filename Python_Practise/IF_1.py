import random

random_number = random.randint(0, 100)

print("Die Zufallszahl ist:", random_number)

if random_number < 20:
    print("Mini")
elif 20 <= random_number <= 50:
    print("Medium")
else:
    print("Large")