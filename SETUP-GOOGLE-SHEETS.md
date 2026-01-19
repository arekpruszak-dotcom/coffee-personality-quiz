# Konfiguracja Google Sheets dla Quiz

## Krok 1: Utwórz Google Sheet

1. Otwórz [Google Sheets](https://sheets.google.com)
2. Utwórz nowy arkusz: "Quiz Kawowej Osobowości - Wyniki"
3. W pierwszym wierszu dodaj nagłówki:
   | A | B | C | D |
   |---|---|---|---|
   | email | personality | timestamp | source |

4. Udostępnij arkusz jako "Każdy z linkiem może edytować"

## Krok 2: Połącz z SheetDB (darmowe)

1. Otwórz [SheetDB.io](https://sheetdb.io)
2. Kliknij "Create free API"
3. Wklej link do swojego Google Sheet
4. Skopiuj wygenerowany API URL (np. `https://sheetdb.io/api/v1/xxxxxx`)

## Krok 3: Dodaj zmienną środowiskową

### Lokalnie (development):
Utwórz plik `.env.local` w folderze `quiz-project/`:
```
SHEETDB_API_URL=https://sheetdb.io/api/v1/twoj-id
```

### Na Vercel (produkcja):
1. Otwórz: https://vercel.com/areks-projects-c68937a7/quiz-project/settings/environment-variables
2. Dodaj zmienną:
   - Name: `SHEETDB_API_URL`
   - Value: `https://sheetdb.io/api/v1/twoj-id`
3. Kliknij "Save"
4. Redeploy projekt

## Krok 4: Testuj

1. Zrób quiz na stronie
2. Kliknij "Zapisz w profilu"
3. Podaj email
4. Sprawdź Google Sheet - powinien pojawić się nowy wiersz!

## Struktura danych

Każdy zapis zawiera:
| Pole | Przykład | Opis |
|------|----------|------|
| email | jan@example.com | Email użytkownika |
| personality | bold-adventurer | ID osobowości |
| timestamp | 2026-01-19T10:30:00Z | Data i czas |
| source | quiz-web | Źródło (web/app) |

## Bez SheetDB (tryb demo)

Jeśli nie skonfigurujesz SheetDB, API będzie działać w trybie demo:
- Wyniki będą logowane do konsoli serwera
- Użytkownik zobaczy "Zapisano!" ale dane nie będą persystowane

---

*Instrukcja konfiguracji - Basecamp Coffee Quiz*
