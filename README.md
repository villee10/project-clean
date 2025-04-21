Testing – Testmiljö för WTP i project-clean

Detta repo innehåller en testmiljö för CRM-systemet **WTP**, med enhetstester, API-tester och end-to-end-tester. Projektet är uppdelat i separata mappar för testtyperna, samt själva systemet i `WTP-main`.

## 📂 Struktur i repot

```
project-clean/
├── WTP-main/            # Själva CRM-systemet (frontend + backend)
│   ├── client/          # React frontend
│   └── server/          # .NET-backend (Minimal API)
├── N2NTest/             # End-to-end-tester (SpecFlow + Playwright)
├── postman/             # API-testning (Postman-samlingar)
├── README.md            # Dokumentation (denna fil)
```



## 🧪 Innehåll i testsviten

| Testtyp          | Plats         | Teknologi               | Innehåll                          |
|------------------|---------------|--------------------------|-----------------------------------|
| Enhetstestning   | WTP-main/     | xUnit                    | Inbyggda tester (t.ex. användare) |
| API-testning     | postman/      | Postman + Newman         | Login, tickets, chatt             |
| End-to-end (E2E) | N2NTest/      | SpecFlow + Playwright    | Fulla användarflöden via GUI      |

## ⚙️ Komma igång lokalt

1. Klona repot
```bash
git clone https://github.com/villee10/project-clean.git
cd project-clean
```

2. **Initiera testdatabas**

En molnbaserad PostgreSQL-databas används i projektet.  
Anslutningssträngen är redan definierad i `appsettings.json` i WTP-projektet:




3. Starta backend
```
cd WTP-main/server
dotnet restore
dotnet run
```


4. Starta frontend
```
cd WTP-main/client
npm install
npm run dev
```

**Köra testerna**
```
cd N2NTest
dotnet test
```

**CI/CD**
Testerna körs automatiskt via GitHub Actions vid varje push. Resultat och rapporter finns i fliken "Actions".


🧠 Teknologier
Frontend: React + Vite

Backend: ASP.NET Core (.NET 8, Minimal API)

Databas: PostgreSQL

Testning: Postman, Playwright, SpecFlow

CI/CD: GitHub Actions (kan utökas)
