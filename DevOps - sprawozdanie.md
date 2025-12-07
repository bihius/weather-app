## Nowatorski projekt indywidualny DevOps
`Konrad Kasperkiewicz`
`52703`
`S1-71-NPI-5`
`N1-71-NPI-5`
`github.com/bihius/weather-app`


### Cel i zakres projektu
Celem projektu jest zbudowanie kompletnego środowiska do tworzenia aplikacji w technologi Reacta; integrującego Github, Github Actions, Docker oraz Docker compose. Środowisko to automatyzuje budowanie, testowanie, publikacje obrazów dockerowych oraz wdrożenie aplikacji na serwerze linuxowym. 
Projekt aspiruje do najwyższej do zdobycia oceny ze względu na implementację: multi-stage build obrazu dockera, workflow do testów bezpieczeństwa i lintu, osobne workflowy CI, publikację obrazu do rejestru ghcr.io, oddzielne pipeline'y dla main i pull requestów, plik docker compose uruchamiający dwa (defacto 3) kontenery, wykorzystuje reusable workflow, builduje i uruchamia kontener na serwerze zewnętrznym. 
Serwerem tym jest weather.bihius.me

### Architektura aplikacji i konteneryzacja
Aplikacja jest budowana w Node.js z użyciem pnpm. Zbudowana aplikację wystawia skonteneryzowany serwer nginx. Dockerfile wykorzystuje multi-stage build (`dependencies, builder, production`) co znacząco odchudza wyjściowy image aplikacji, przyspiesza build i odziela zależności buildu od końcowego kontenera. 

### Opis workflow'ów
- Reusable CI (`reusable_ci.yml`)
  Wykonuje checkout kodu, instalację pnpm, instalację zależności, lin, testy oraz opcjonalne skany bezpieczeństwa i build
- Główny pipeline na `main` (`main.yml`)
  Workflow do brancha main, wykorzystuje reusable CI do testów i lintowania. Następnie buduje i publikuje obraz dockera do GHCR. 
- Release (`relase.yml`)
  Uruchamia się tylko w przypadku pusha do remote z tagiem rozpoczynającym się na v*. Wykonuje pełny build aplikacji, generuje changelog z opisów commitów, tworzy release.
- Pipeline testujący wydajność (`perfomance.yml`)
  Buduje aplikacje i uruchamia testy wydajności za pomocą Lighthouse CI. Wyniki z katalogu .lighthouseci są archiwizowane jako githubowy artfefakt. 
- Deployment na zewnętrzny serwer (`deploy.yml`)
  Uruchamia się go ręcznie lub po opublikowaniu nowej wersji (release). Łączy się do serwera weather.bihius.me poprzez ssh, wykorzystując klucze z Secrets i wykonuje komendy  `docker compose pull`  oraz  `docker compose up -d` które aktualizują aplikację. 