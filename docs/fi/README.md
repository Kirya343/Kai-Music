<div align="center">

# Kai Music

### Projekti

![Version](https://img.shields.io/github/v/release/kirya343/Kai-Music?label=version&color=orange)
![License](https://img.shields.io/github/license/kirya343/Kai-Music)
![Stars](https://img.shields.io/github/stars/kirya343/Kai-Music)
![Forks](https://img.shields.io/github/forks/kirya343/Kai-Music)
![Issues](https://img.shields.io/github/issues/kirya343/Kai-Music)

![Status](https://img.shields.io/badge/status-beta-orange)
![Development](https://img.shields.io/badge/development-active-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?logo=github)

### Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

### Backend

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.6-6DB33F?logo=springboot)

### Infrastruktuuri

![MariaDB](https://img.shields.io/badge/MariaDB-11.4-003545?logo=mariadb)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

[English](../../README.md) · [Suomi](README.md)

Reaaliaikainen synkronoitu musiikin suoratoistopalvelu, jossa käyttäjät voivat liittyä yhteisiin kuunteluhuoneisiin, selata musiikkikirjastoa ja kuunnella musiikkia yhdessä pienellä viiveellä toteutetun äänensiirron avulla.

</div>

## Yleiskatsaus

Kai Music on musiikkialusta, joka yhdistää henkilökohtaisen musiikkitallennustilan, musiikin suoratoiston ja synkronoidun ryhmäkuuntelun.

Käyttäjät voivat ladata ja hallita omia musiikkikokoelmiaan, julkaista äänitiedostoja yhteiseen moderoituun musiikkiluetteloon sekä löytää muiden käyttäjien lisäämää musiikkia.

Alustan keskeinen ominaisuus ovat synkronoidut kuunteluhuoneet, joissa käyttäjät voivat liittyä yhteen ja kuunnella samoja kappaleita samanaikaisesti synkronoidulla toistolla.

## Kuvakaappaukset

### Musiikkikirjasto

<div align="center">
    <img src="docs/screenshots/desktop/library.png" width="77%" alt="Työpöydän musiikkikirjasto">
    <img src="docs/screenshots/mobile/library.png" width="22%" alt="Mobiilin musiikkikirjasto">
</div>

### Kuunteluhuone

<div align="center">
    <img src="docs/screenshots/desktop/listening-room.png" width="77%" alt="Työpöydän kuunteluhuone">
    <img src="docs/screenshots/mobile/listening-room.png" width="22%" alt="Mobiilin kuunteluhuone">
</div>

### Soittolistat

<div align="center">
    <img src="docs/screenshots/desktop/playlists.png" width="77%" alt="Työpöydän soittolistat">
    <img src="docs/screenshots/mobile/playlists.png" width="22%" alt="Mobiilin soittolistat">
</div>

## Ominaisuudet

### Musiikin hallinta

- Äänitiedostojen lataaminen ja tallentaminen.
- Oman musiikkikirjaston selaaminen ja kuunteleminen.
- Äänitiedostojen metatietojen ja kappaletietojen muokkaaminen.
- Kappaleiden julkaiseminen yhteiseen musiikkiluetteloon.
- Musiikin tunnistaminen ACRCloud-palvelun avulla.

### Musiikin löytäminen

- Yhteisen musiikkiluettelon selaaminen ja hakeminen.
- Muiden käyttäjien lataaman musiikin löytäminen.

### Soittolistat ja toisto

- Omien soittolistojen luominen ja hallinta.
- Tykkättyjen kappaleiden automaattinen kokoaminen omaksi soittolistakseen.
- Yksittäisten kappaleiden tai kokonaisten soittolistojen lisääminen toistojonoon.
- Toistojonon hallinta.
- Kappaleiden toistaminen uudelleen ja satunnaistoisto.

### Kuunteluhuoneet

- Kuunteluhuoneiden luominen ja muiden käyttäjien kutsuminen niihin.
- Musiikin kuunteleminen yhdessä reaaliajassa.
- Toiston synkronointi kaikkien huoneen osallistujien välillä.

## Arkkitehtuurin yleiskatsaus

Kai Music käyttää modulaarista backend-arkkitehtuuria ja komponenttipohjaista React-frontendia. Sovellus on jaettu itsenäisiin toiminnallisiin moduuleihin, joilla on selkeästi määritellyt vastuualueet.

### Backend-arkkitehtuuri

Backend on toteutettu Javalla ja Spring Bootilla käyttäen Mavenin monimoduulirakennetta.

**Toiminnalliset moduulit**

| Moduuli | Vastuualue |
|---|---|
| `user` | Käyttäjien hallinta ja käyttäjiin liittyvät toiminnot. |
| `storage` | Integraatio Cloudflare R2 -tallennuspalveluun sen S3-yhteensopivan rajapinnan kautta. |
| `room` | Kuunteluhuoneiden hallinta. |
| `presence` | Käyttäjien reaaliaikaisen läsnäolotilan seuranta (online/offline). |
| `playlist` | Soittolistojen hallinta ja niihin liittyvät toiminnot. |
| `playback` | Toiston ohjaus, äänen suoratoisto, synkronointi ja toistosessioiden hallinta. |
| `permission` | Roolien ja käyttöoikeuksien hallinta. |
| `authorization` | Käyttäjien tunnistautuminen, rekisteröityminen, kirjautuminen ja JWT-tokenien myöntäminen evästeiden kautta. |
| `audio` | Äänitiedostojen hallinta, metatietojen käsittely ja musiikin tunnistaminen ACRCloud-palvelun avulla. |

**Infrastruktuurimoduulit**

| Moduuli | Vastuualue |
|---|---|
| `security` | Tietoturva-asetukset, HTTP- ja WebSocket-tunnistautuminen, JWT-tokenien käsittely, salaus ja käyttöoikeuspalvelut. |
| `security-core` | Yhteiset tietoturva-abstraktiot, annotaatiot, rajapinnat, toimialueoliot ja poikkeukset, joita käytetään backendin eri moduuleissa. |
| `diagnostics` | Koko sovelluksen diagnostiikka ja terminaalikomennot sovelluksen tilan ja palveluiden seurantaan. |
| `common` | Yhteiset sovellusasetukset ja moduulien väliset tapahtumamäärittelyt. |

**Toistomoottori**

`playback`-moduuli sisältää sovelluksen monimutkaisimman liiketoimintalogiikan. Sen vastuulla ovat:

- Toistotilojen ja toistosessioiden tilannekuvien hallinta.
- Reaaliaikaisten toistokontekstien ylläpito.
- Toistokomentojen ja tilasiirtymien käsittely.
- Äänidatan lähettäminen yhdistetyille käyttäjille paloina.
- Kuunteluhuoneiden osallistujien välisen toiston synkronointi.
- WebSocket-yhteyksien hallinta sekä äänidatan ja toistotilan päivitysten välittäminen.

### Frontend-arkkitehtuuri

Frontend on toteutettu Reactilla ja TypeScriptillä.

- Komponenttipohjainen arkkitehtuuri, jossa käytetään uudelleenkäytettäviä käyttöliittymäkomponentteja.
- SCSS Modules komponenttikohtaiseen tyylittelyyn ja tyylien eristämiseen.
- Erilliset API-integraatiot backendin moduuleille, jotka tarjoavat ulkoisen rajapinnan.
- WebSocket-yhteydet reaaliaikaisiin toistopäivityksiin ja äänen suoratoistoon.
- Playwright automaattiseen selaintestaukseen.

### Moduulien ja asiakkaan välinen viestintä

Sovellus käyttää kolmea ensisijaista viestintämekanismia:

- **Suorat palvelukutsut** — backend-moduulit kutsuvat muiden moduulien palveluita moduulien riippuvuusrakenteen sallimissa rajoissa.
- **Spring Application Events** — käytetään tapahtumiin, jotka käynnistävät toimintoja useissa moduuleissa, tai signaalien lähettämiseen riippuvaisesta moduulista sen käyttämälle moduulille.
- **WebSocketit** — mahdollistavat kaksisuuntaisen reaaliaikaisen viestinnän backendin ja frontendin välillä. Niitä käytetään toiston synkronointiin, äänidatan välittämiseen ja reaaliaikaisten tilapäivitysten lähettämiseen.

Näiden mekanismien yhdistelmä pitää moduulien väliset riippuvuudet hallinnassa ja mahdollistaa samalla tapahtumapohjaiset työnkulut sekä reaaliaikaisen viestinnän asiakkaan kanssa.

## Projektin rakenne

```text
Kai/
├── Backend/
│   ├── application/
│   ├── common/
│   ├── infrastructure/
│   │   ├── diagnostics/
│   │   ├── security/
│   │   └── security-core/
│   └── modules/
│       ├── audio/
│       ├── authorization/
│       ├── permission/
│       ├── playback/
│       ├── playlist/
│       ├── presence/
│       ├── room/
│       ├── storage/
│       └── user/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── css/
│   │   ├── lib/
│   │   └── pages/
│   └── tests/
├── TelegramBot/
│   └── app/
├── Database/
├── Nginx/
│   └── conf.d/
├── docs/
│   ├── screenshots/
│   └── fi/
├── compose.yaml
├── deploy.sh
└── README.md
```

### Päähakemistot

| Hakemisto | Kuvaus |
|---|---|
| `Backend/` | Java Spring Boot -backend, joka on toteutettu Mavenin monimoduuliprojektina. |
| `Frontend/` | React-sovellus, joka on rakennettu TypeScriptillä ja Vitellä. |
| `TelegramBot/` | Telegram-botti äänitiedostojen lataamiseen Kai Musiciin. |
| `Database/` | Tietokannan alustusskriptit. |
| `Nginx/` | Nginx-asetukset ja käänteisen välityspalvelimen määritykset. |
| `docs/` | Projektidokumentaatio, raportit ja kuvakaappaukset. |
| `compose.yaml` | Docker Compose -määritykset sovelluksen palveluille. |
| `deploy.sh` | Käyttöönoton suorittava skripti. |

## Käyttöönotto

### Vaatimukset

- Git
- Docker ja Docker Compose

### Asennus

1. Kloonaa repositorio:

    ```bash
    git clone <repository-url>
    cd Kai
    ```

2. Luo ympäristömuuttujatiedosto:

    ```bash
    cp .env.example .env
    ```

3. Määritä tarvittavat ympäristömuuttujat `.env`-tiedostoon.

4. Suorita käyttöönoton skripti:

    ```bash
    ./deploy.sh
    ```

Käyttöönoton skripti rakentaa automaattisesti kaikki sovelluksen komponentit ja ottaa palvelut käyttöön Docker Composen avulla.

## Asetukset

Ennen käyttöönottoa kopioi `.env.example`-tiedosto `.env`-tiedostoksi ja määritä tarvittavat ympäristömuuttujat.

Asetukset sisältävät seuraavat kokonaisuudet:

| Kategoria | Muuttujat | Kuvaus |
|---|---|---|
| Backend-tietokanta | `BACKEND_DB_*` | Backend-tietokannan tunnistetiedot ja asetukset. |
| Botin tietokanta | `BOT_DB_*` | Telegram-botin tietokannan tunnistetiedot ja asetukset. |
| Telegram-botti | `BOT_TOKEN`, `BOT_USERNAME` | Telegram-botin tunnistetiedot ja käyttäjänimi. |
| Sovelluksen URL-osoitteet | `FRONTEND_URL`, `BACKEND_URL`, `APP_DOMAIN` | Frontendin, backendin ja sovelluksen verkkotunnuksen asetukset. |
| Objektitallennus | `S3_*` | S3-yhteensopivan tallennuspalvelun päätepiste, bucket ja käyttöoikeustiedot. |
| Musiikintunnistus | `ACRCLOUD_*` | ACRCloud-palvelun API-tunnistetiedot ja palvelimen osoite. |

Korvaa kaikki esimerkkitiedot omilla asetuksillasi. Pidä `.env`-tiedosto yksityisenä äläkä koskaan lisää sitä versionhallintaan.

Täydellinen luettelo tarvittavista ympäristömuuttujista löytyy `.env.example`-tiedostosta.

## Kehityssuunnitelma

- **Hallintapaneeli** — keskitetty hallintapaneeli, jonka avulla sovellusta ja sen toimintoja voidaan hallita kokonaisvaltaisesti.
- **Älykkäät soittolistat** — soittolistojen automaattinen luominen mielialan, musiikkigenren, kiinnostuksen kohteiden ja muiden mieltymysten perusteella.
- **Kuunteluhuoneiden kehittäminen**
    - Käyttöoikeuksien hallinnan lisääminen, jotta ulkopuoliset käyttäjät eivät voi muuttaa huoneen toistoa tai asetuksia ilman lupaa.
    - Huoneen omistajalle mahdollisuus hallita osallistujien käyttöoikeuksia.
    - Pysyvien ja väliaikaisten kuunteluhuoneiden tukeminen.
- **Äänikirjaluettelo** — alustan laajentaminen erillisellä äänikirjaluettelolla.

## Osallistuminen kehitykseen

Osallistuminen projektiin, virheraportit ja kehitysehdotukset ovat tervetulleita.

Voit avata Issuen ilmoittaaksesi ongelmasta tai keskustellaksesi ehdottamastasi parannuksesta. Myös Pull Requestit ovat tervetulleita.

## Lisenssi

Tämä projekti on lisensoitu [MIT-lisenssillä](../../LICENSE). Lisätietoja löytyy [LICENSE](../../LICENSE)-tiedostosta.