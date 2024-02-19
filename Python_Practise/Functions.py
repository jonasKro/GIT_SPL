import random

# Erstelle eine Funktion die 2 Zahlen addiert


def addierer(a, b):
    print(a+b)


addierer(1, 4)
# Erstelle eine Funktion, die eine zufällige Zahl zwischen 100 und 200 zurückliefert


def random_number():
    return random.randint(100, 200)


print(random_number())
# Erstelle eine Funktion, die ein Wort aus einem String Array zurückliefert.
#     z.B. ["hans", "peter", "susi"]
#     Die Funktion liefert zufällig eines der Worte zurück

names = ["hans", "peter", "susi", "sans", "heter", "lusi"]


def getRandName(names):
    a = random.randint(0, len(names))
    return names[a-1]


print(getRandName(names))
