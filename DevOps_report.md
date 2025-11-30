## Nowatorski projekt indywidualny DevOps
Konrad Kasperkiewicz
52703
S1-71-NPI-5
N1-71-NPI-5

### Cel i zakres projektu
Celem projektu było zastosowanie wcześniej nieznaną możliwością githuba jaką jest github actions. Dzięki temu, zostało zbudowane kompletne środowisko DevOps dla aplikacji webowej, obejmujące budowanie, testowanie, skanowanie bezpieczeństwa oraz build/publikację obrazu Dockera w rejestrze githuba.

Projekt integrował: Github, Docker, docker-compose oraz Github Actions 

### Architektura aplikacji i konteneryzacja
Aplikacja jest budowana w Node.js z użyciem pnpm. Zbudowana aplikację wystawia skonteneryzowany serwer nginx. Dockerfile wykorzystuje multi-stage build (dependencies, builder, production) co znacząco odchudza wyjściowy image aplikacji i odziela zależności buildu od końcowego kontenera. 

### 
