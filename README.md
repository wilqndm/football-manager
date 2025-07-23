# Football Manager

Prosty panel do zarządzania drużyną piłkarską.

## Jak uruchomić lokalnie

1. Zainstaluj zależności:
   ```
   npm install
   ```
2. Wygeneruj klienta Prisma i zrób migrację:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Uruchom aplikację:
   ```
   npm run dev
   ```
4. Zaloguj się jako admin (login: `admin`, hasło: `admin`).

## Deployment na Vercel

1. Zrób push repozytorium na GitHub.
2. Połącz repozytorium z Vercel i kliknij "Deploy".
3. Gotowe!

---

### Dalszy rozwój

- Dodaj obsługę meczów i składek (API, widoki analogiczne do zawodników)
- Dodaj zabezpieczenie API dla produkcji
- Dodaj autoryzację z backendem (np. JWT, NextAuth)
- Dodaj upload zdjęć zawodników