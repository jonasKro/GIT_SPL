class Bankomat:
    def __init__(self):
        self.kontostand = 0

    def einzahlen(self, betrag):
        self.kontostand += betrag
        print(f"{betrag} EUR wurden eingezahlt.")

    def abheben(self, betrag):
        if betrag <= self.kontostand:
            self.kontostand -= betrag
            print(f"{betrag} EUR wurden abgehoben.")
        else:
            print("Nicht genügend Guthaben")

    def kontostand_anzeigen(self):
        print(f"Ihr Kontostand beträgt: {self.kontostand} EUR")


def main():
    bankomat = Bankomat()

    while True:
        print("\nBankomat-Menü:")
        print("1. Einzahlen")
        print("2. Abheben")
        print("3. Kontostand anzeigen")
        print("4. Beenden")

        auswahl = input("wählen Sie:")

        if auswahl == "1":
            betrag = float(
                input("geben Sie den einzuzahlenden Betrag ein: "))
            bankomat.einzahlen(betrag)
        elif auswahl == "2":
            betrag = float(
                input("geben Sie den abzuhebenden Betrag ein: "))
            bankomat.abheben(betrag)
        elif auswahl == "3":
            bankomat.kontostand_anzeigen()
        elif auswahl == "4":
            break
        else:
            print("Ungültige Auswahl")


if __name__ == "__main__":
    main()
