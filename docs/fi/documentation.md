# Kai Music — Tekninen dokumentaatio

**Projekti:** Kai Music  
**Tuotantoympäristön URL:** https://kaimusic.app/  
**API:** https://api.kaimusic.app/  
**Tila:** Tuotantokäytössä / Beta  
**Dokumentaation versio:** 1.0  
**Viimeksi päivitetty:** 10. marraskuuta 2026

---

# 1. Projektin yleiskuvaus

## 1.1. Johdanto

Kai Music on verkkopohjainen musiikin suoratoistoalusta, joka on suunniteltu henkilökohtaisten musiikkikirjastojen hallintaan ja synkronoituun kuunteluun.

Alustan avulla käyttäjät voivat ladata äänitiedostoja, järjestää musiikkia soittolistoihin, hallita toistoa ja kuunnella musiikkia yhdessä jaetuissa kuunteluhuoneissa.

Perinteisistä musiikin suoratoistopalveluista poiketen Kai Music keskittyy käyttäjien itse hallinnoimaan äänisisältöön ja kuunteluhuoneen osallistujien väliseen synkronoituun toistoon.

## 1.2. Keskeiset ominaisuudet

- Äänitiedostojen lataaminen ja hallinta.
- Henkilökohtainen musiikkikirjasto.
- Musiikin toisto.
- Soittolistojen luominen ja hallinta.
- Jaetut kuunteluhuoneet.
- Osallistujien välinen synkronoitu toisto.
- Toiston tilan reaaliaikainen synkronointi.
- Käyttäjien tunnistautuminen ja käyttöoikeuksien hallinta.
- Käyttäjien online-tilan seuranta.
- Telegram-botin integrointi äänitiedostojen lataamista varten.
- Progressive Web App (PWA) -tuki.

## 1.3. Projektin tavoitteet

Projektin tärkeimmät tavoitteet ovat:

1. Tarjota kätevä alusta henkilökohtaisen musiikin hallintaan.
2. Tukea reaaliaikaista synkronoitua kuuntelua.
3. Mahdollistaa äänisisällön toimittaminen pienellä viiveellä.
4. Jakaa sovelluksen vastuualueet itsenäisiin backend-moduuleihin.
5. Tarjota laajennettava arkkitehtuuri tulevia toiminnallisuuksia varten.

---

# 2. Teknologiapino

## 2.1. Backend

| Teknologia | Käyttötarkoitus |
|---|---|
| Java 21 | Pääasiallinen ohjelmointikieli |
| Spring Boot 3.5.x | Sovelluskehys |
| Spring Security | Tunnistautuminen ja käyttöoikeuksien hallinta |
| Spring Data JPA | Tietokantayhteydet |
| Hibernate | ORM |
| Maven | Koonti- ja riippuvuuksienhallinta |
| WebSocket | Reaaliaikainen viestintä |
| STOMP | WebSocket-viestintäprotokolla |
| MariaDB 11.4 | Relaatiotietokanta |
| FFmpeg | Äänen käsittely |
| Lombok | Toistuvan pohjakoodin vähentäminen |

## 2.2. Frontend

| Teknologia | Käyttötarkoitus |
|---|---|
| React 19 | Käyttöliittymäkehys |
| TypeScript | Staattinen tyypitys |
| Vite 8 | Koontijärjestelmä ja kehityspalvelin |
| SCSS | Tyylien määrittely |
| React Router | Asiakaspuolen reititys |
| WebSocket / STOMP | Reaaliaikainen viestintä |
| Media Source Extensions | Äänen toisto pilkotuista mediatiedostoista |

## 2.3. Infrastruktuuri

- Docker ja Docker Compose.
- Nginx-käänteisvälityspalvelin.
- Linux-palvelinympäristö.
- MariaDB-säiliöt.
- Cloudflare ja DNS-hallinta.
- SSL/TLS.
- PWA-julkaisuympäristö.

---

# 3. Järjestelmäarkkitehtuuri

## 3.1. Korkean tason arkkitehtuuri

Sovellus noudattaa asiakas–palvelin-arkkitehtuuria.

Frontend kommunikoi backendin kanssa kahdella ensisijaisella tavalla:

- HTTP REST API tavanomaisia sovellustoimintoja varten.
- WebSocket ja STOMP reaaliaikaista viestintää varten.

Backend vastaa sovelluslogiikasta, tietojen pysyvästä tallennuksesta, tunnistautumisesta, äänen käsittelystä ja toiston synkronoinnista.

## 3.2. Arkkitehtuurikaavio

```text
                    KÄYTTÄJÄ
                       |
                       v
                 NGINX / HTTPS
                       |
              +--------+--------+
              |                 |
              v                 v
          FRONTEND           BACKEND
           React           Spring Boot
              |                 |
              |            +----+------+
              |            |           |
              |            v           v
              |         REST API   WebSocket
              |            |           |
              +------------+-----------+
                       |
                SOVELLUSKERROS
                       |
          +------------+------------+
          |            |            |
          v            v            v
    TUNNISTAUTUMINEN  TOISTO       ÄÄNI
          |            |            |
          +------------+------------+
                       |
                       v
                    MARIADB
                       |
                       v
                 ÄÄNITIEDOSTOJEN
                    TALLENNUS
```

---

# 4. Backend-arkkitehtuuri

## 4.1. Modulaarinen rakenne

Backend on järjestetty Mavenin monimoduuliprojektiksi.

Moduulit ovat:

| Moduuli | Vastuualue |
|---|---|
| audio | Äänen metatiedot ja äänen hallinta |
| authentication | Käyttäjien tunnistautuminen |
| permission | Käyttöoikeuksien ja pääsyn hallinta |
| playback | Toiston tila ja suoratoiston koordinointi |
| playlist | Soittolistojen hallinta |
| presence | Online-käyttäjät ja läsnäolon seuranta |
| room | Kuunteluhuoneet |
| storage | Tiedostojen tallennuksen abstraktio |
| user | Käyttäjien hallinta |
| common | Sovelluksen yhteiset toiminnallisuudet |
| diagnostics | Sovelluksen diagnostiikka |
| security | Tietoturva-asetukset ja integraatiot |

Jokainen moduuli vastaa omasta toimialueestaan ja sovelluslogiikastaan.

Tavoitteena on minimoida tarpeettomat riippuvuudet moduulien välillä ja ylläpitää selkeitä vastuurajoja.

## 4.2. Arkkitehtuurikerrokset

Uudempi moduulirakenne noudattaa kerrosarkkitehtuuria.

### Domain-kerros

Sisältää liiketoiminnan käsitteet ja toimialuemallit.

Esimerkkejä playback-moduulista:

- `PlaybackState`
- `UserPlayback`
- `RoomPlaybackContext`

Domain-kerroksen ei tule riippua HTTP-kontrollereista tai esityskerroskohtaisista toteutuksista.

### Application-kerros

Sisältää sovelluksen käyttötapaukset ja niiden koordinoinnin.

Esimerkkejä:

- Komennot.
- Komentojen käsittelijät.
- Sovelluspalvelut.

Application-kerros koordinoi toimialueen operaatioita ja infrastruktuuria määriteltyjen riippuvuuksien kautta.

### Presentation-kerros

Sisältää ulkoiset viestintärajapinnat.

Esimerkkejä:

- REST-kontrollerit.
- WebSocket-palvelut.
- Viestien käsittelijät.

Presentation-kerros muuntaa saapuvat pyynnöt sovelluksen operaatioiksi.

## 4.3. Riippuvuuksien suunta

Arkkitehtuurin tavoitteena on ylläpitää seuraavaa riippuvuuksien suuntaa:

```text
Presentation
     |
     v
Application
     |
     v
Domain
```

Infrastruktuuri-integraatiot pidetään toimialuemallin ulkopuolella.

---

# 5. Tunnistautuminen ja käyttöoikeuksien hallinta

## 5.1. Tunnistautuminen

Authentication-moduuli vastaa käyttäjän identiteetin vahvistamisesta.

Sovellus käyttää Spring Securityä tietoturvan integrointiin.

Tunnistautuminen ja käyttöoikeuksien hallinta ovat erillisiä vastuualueita.

Tunnistautuminen vastaa kysymykseen:

"Kuka nykyinen käyttäjä on?"

Käyttöoikeuksien hallinta vastaa kysymykseen:

"Saako tämä käyttäjä suorittaa kyseisen toiminnon?"

## 5.2. Käyttöoikeuksien hallinta

Permission-moduuli hallinnoi käyttöoikeuksia.

Käyttöoikeustarkistukset tulee suorittaa backendissä.

Frontendin reittien suojaamisen tarkoituksena on parantaa navigointia ja käyttökokemusta, ei korvata backendin käyttöoikeustarkistuksia.

## 5.3. Yksityiset reitit

Suojatut frontend-reitit käyttävät tunnistautumisen tilaa.

Tunnistautumattomat käyttäjät ohjataan kirjautumissivulle.

Tunnistautumisen lataustila on otettava huomioon ennen uudelleenohjausta, jotta alustuksen aikana ei tapahdu virheellistä navigointia.

---

# 6. Äänen hallinta

## 6.1. Äänitiedostot

Audio-moduuli hallinnoi ääneen liittyviä sovellustietoja.

Sen vastuualueisiin kuuluvat:

- Äänen metatiedot.
- Äänitiedostojen käyttö.
- Äänitiedostojen käsittely.
- Äänitiedostojen tallennusintegraatio.
- Äänen tunnistaminen ja siihen liittyvät metatiedot.

Äänitiedostot tallennetaan erillään relaatiotietokannan sovellustiedoista.

Tietokanta ylläpitää viittauksia ja metatietoja sen sijaan, että sitä käytettäisiin ensisijaisena binääridatan tallennuspaikkana.

## 6.2. Äänen käsittely

FFmpegiä käytetään äänen käsittelyyn ja muuntamiseen.

Suoratoistoputkessa AAC-ääni koodataan fragmentoituun MP4-muotoon.

Nykyinen koodausmääritys:

- Koodekki: AAC.
- Bittinopeus: 192 kbit/s.
- Säiliömuoto: fragmentoitu MP4.
- MIME-tyyppi: `audio/mp4`.
- Koodekin tunniste: `mp4a.40.2`.

---

# 7. Äänen suoratoistoarkkitehtuuri

## 7.1. Yleiskuvaus

Kai Music käyttää palvelimen ohjaamaa fragmentoitua MP4-suoratoistoa.

Backend luo mediakatkelmat ja toimittaa ne yhdistetyille asiakkaille WebSocketin kautta.

Frontend käyttää Media Source Extensions (MSE) -rajapintaa lisätäkseen vastaanotetut katkelmat `SourceBuffer`-puskuriin.

Tämän arkkitehtuurin ansiosta toisto voidaan aloittaa mielivaltaisesta kohdasta ilman, että selaimen tarvitsee ladata koko äänitiedostoa.

## 7.2. Suoratoistoputki

```text
              ÄÄNITIEDOSTO
                    |
                    v
             ÄÄNITIEDOSTOJEN
                TALLENNUS
                    |
                    v
              FFmpeg / AAC
                    |
                    v
              FRAGMENTOITU MP4
                    |
                    v
               CHUNK-WORKER
                    |
                    v
                WEBSOCKET
                    |
                    v
                 FRONTEND
                    |
                    v
              MEDIA SOURCE API
                    |
                    v
               SOURCE BUFFER
                    |
                    v
                ÄÄNENTOISTO
```

## 7.3. Katkelmien toimitus

Backend luo ja toimittaa äänikatkelmia säännöllisin väliajoin.

Tunnetut toteutusparametrit:

| Parametri | Arvo |
|---|---|
| Katkelmien väli | 3 sekuntia |
| Tauon aikainen puskuritavoite | 15 sekuntia |
| Äänikoodekki | AAC |
| Bittinopeus | 192 kbit/s |
| Säiliömuoto | Fragmentoitu MP4 |

Nämä ovat toteutuksen parametreja, eivät takuita todellisesta verkkoviiveestä.

## 7.4. Käyttäjäkohtainen suoratoistotila

Jokaisella kuuntelijalla voi olla oma suoratoistokontekstinsa.

Backend seuraa seuraavia tietoja:

- Käyttäjäkohtaiset katkelmien muodostajat.
- Alustustila.
- Puskuroitu sijainti.
- Katkelmien järjestysnumero.
- Kuuntelijan yhteyden tila.

Tämä on tärkeää, koska käyttäjät voivat liittyä huoneeseen eri toistokohdissa.

## 7.5. Alustussegmentti

Fragmentoitu MP4 edellyttää alustussegmenttiä ennen mediakatkelmien lisäämistä.

Frontendin on erotettava alustuksen sisältävät katkelmat tavallisista mediakatkelmista oikein.

Katkelmien järjestys on säilytettävä järjestysnumeron avulla.

## 7.6. Frontendin toisto

Frontendin suoratoistototeutus on jaettu erillisiin vastuualueisiin:

- `useMediaSource` — MediaSourcen elinkaaren hallinta.
- `useAudioBuffer` — SourceBufferin ja katkelmajonon hallinta.
- `usePlayback` — toiston tila ja ohjaimet.
- `useAudioPlayer` — toiston ja median suoratoiston yhdistäminen.

Frontend vastaanottaa katkelmat käyttäjäkohtaisen WebSocket-kohteen kautta:

`/user/queue/audio`

Toteutuksessa on otettava huomioon:

- SourceBufferin päivitysten elinkaari.
- Lisäämisjonon synkronointi.
- Alustussegmentit.
- Siirtyminen toistokohtaan (seek).
- Toiston keskeytyminen.
- SourceBufferin siivous.
- Asynkroniset puskurivirheet.

---

# 8. Playback-moduuli

## 8.1. Vastuualue

Playback-moduuli koordinoi toiston tilaa ja äänisisällön toimittamista.

Sen vastuisiin kuuluvat:

- Toiston tilan hallinta.
- Toistokomennot.
- Nykyinen toistokohde.
- Huoneen toiston koordinointi.
- Suoratoistotyöntekijöiden elinkaaren hallinta.
- Toiston synkronointi.

## 8.2. Toimialuemallit

### PlaybackState

Edustaa kohteeseen liittyvää toiston tilaa.

Kohde yksilöidään seuraavilla tiedoilla:

- `targetId`
- `targetType`

### UserPlayback

Edustaa käyttäjän nykyistä toistokohdetta.

Malli käyttää seuraavia tietoja:

- `userSub`
- `targetId`
- `targetType`

Käyttäjällä on oma toistokontekstinsa.

Tietokanta varmistaa käyttäjän ja toiston välisen suhteen yksilöllisyyden.

### RoomPlaybackContext

Edustaa kuunteluhuoneeseen liittyviä ajonaikaisia toistotietoja.

Se tarjoaa kontekstin, jota tarvitaan huoneen toiston ja siihen yhdistettyjen kuuntelijoiden koordinointiin.

## 8.3. Toistotilat

Tuetut toistotilat ovat:

1. `NORMAL`
2. `REPEAT_ALL`
3. `SHUFFLE`
4. `REPEAT_ONE`

Nämä tilat määrittävät, miten seuraava jonon kohde valitaan.

## 8.4. Toistokomennot

Sovellus käyttää komentopohjaisia operaatioita.

Tunnettuja operaatioita ovat:

- Seuraava kappale.
- Edellinen kappale.
- Toiston tilan päivittäminen.
- Toiston käynnistäminen tai jatkaminen.
- Toiston keskeyttäminen.
- Siirtyminen tiettyyn kohtaan.

Tarkat komentojen tietosisällöt ja validointisäännöt on dokumentoitava nykyisten komentoluokkien perusteella.

---

# 9. Kuunteluhuoneet

## 9.1. Yleiskuvaus

Kuunteluhuoneiden avulla useat käyttäjät voivat kuunnella samaa musiikkisessiota.

Huone tarjoaa yhteisen toistokontekstin.

Osallistujat vastaanottavat synkronoituja toistopäivityksiä ja äänidataa.

## 9.2. Huoneen vastuualueet

Room-moduuli hallinnoi huoneisiin liittyviä sovellustoimintoja.

Playback-moduuli hallinnoi huoneisiin liittyvää toistokäyttäytymistä.

Presence-moduuli seuraa yhdistettyjä käyttäjiä.

Nämä vastuualueet tulee pitää erillään toisistaan.

## 9.3. Huoneen toistojono

Huoneen toistojono esitetään huoneen omistamana soittolistana.

Tämä eroaa käyttäjän henkilökohtaisista soittolistoista.

Huoneen toistojono määrittää, mitkä äänikohteet ovat käytettävissä huoneessa toistamista varten.

## 9.4. Kuuntelijoiden hallinta

Ajonaikainen kuuntelukonteksti seuraa yhdistettyjä kuuntelijoita.

Kun käyttäjä muodostaa yhteyden:

- Hänen toistotilansa voidaan synkronoida.
- Hänen suoratoistokontekstinsa voidaan alustaa.
- Hän voi vastaanottaa huoneen päivityksiä.

Kun käyttäjä katkaisee yhteyden:

- Hänen kuuntelijatietonsa poistetaan.
- Käyttäjäkohtaiset suoratoistoresurssit voidaan vapauttaa.

---

# 10. Playlist-moduuli

Playlist-moduuli hallinnoi soittolistoja ja niiden sisältöä.

Keskeisiä käyttötapauksia on kaksi:

**Henkilökohtaiset soittolistat**

Yksittäisten käyttäjien omistamat ja hallinnoimat soittolistat.

**Huoneiden soittolistat**

Kuunteluhuoneisiin liitetyt soittolistat, joita käytetään jaettuina toistojonoina.

Soittolistan omistajuuden ja toistokontekstin välinen ero on tärkeä.

Huoneen toistojonoa ei tule käsitellä käyttäjän henkilökohtaisena soittolistana.

Yksityiskohtaiset CRUD-sopimukset, järjestyssäännöt ja validointivaatimukset on dokumentoitava nykyisen toteutuksen perusteella.

---

# 11. Presence-moduuli

Presence-moduuli seuraa online-käyttäjiä ja heidän yhteystilaansa.

Läsnäolo on ajonaikainen vastuualue, eikä sitä tule käyttää pysyvien käyttäjä- tai toistotietojen korvikkeena.

Sen vastuisiin kuuluvat:

- Online-käyttäjien seuranta.
- Yhteyksien elinkaaren seuranta.
- Kuuntelijatietojen tukeminen.
- Ajonaikaisten läsnäolotietojen tarjoaminen muille sovellusmoduuleille.

---

# 12. WebSocket-viestintä

## 12.1. Yleiskuvaus

Sovellus käyttää STOMP-protokollaa WebSocketin päällä reaaliaikaiseen viestintään.

WebSocketia käytetään seuraaviin tarkoituksiin:

- Toiston tilan synkronointi.
- Äänikatkelmien toimittaminen.
- Huoneiden päivitykset.
- Osallistujien reaaliaikaiset tiedot.

## 12.2. Tunnetut kohteet

Seuraavia kohteita on esiintynyt sovelluksen toteutuksessa:

| Kohde | Käyttötarkoitus |
|---|---|
| `/user/queue/audio` | Yksityinen äänikatkelmien toimitus |
| `/topic/room/{id}/audio` | Huoneen ääniaihe |
| `/topic/room/playback/{id}` | Huoneen toistopäivitykset |
| `/app/room/load` | Huoneen latauskomento |
| `/app/room/next` | Seuraavan kappaleen komento |
| `/app/room/prev` | Edellisen kappaleen komento |
| `/app/room/update-playback-state` | Toiston tilan päivitys |

Nämä kohteet tulee tarkistaa nykyistä WebSocket-konfiguraatiota ja viestien käsittelijöitä vasten, ennen kuin niitä pidetään täydellisenä julkisena rajapintasopimuksena.

## 12.3. Viestien toimitus

Yksityisiä käyttäjäkohtaisia kohteita käytetään käyttäjäkohtaisen äänisisällön toimittamiseen.

Huoneiden aiheita käytetään yhteisiin huonetapahtumiin.

Tämä erottelu mahdollistaa henkilökohtaisen suoratoistodatan toimittamisen palvelimelta samalla, kun yhteinen toiston tila säilyy synkronoituna.

---

# 13. Frontend-arkkitehtuuri

## 13.1. Yleiskuvaus

Frontend on TypeScriptillä toteutettu React-sovellus.

Viteä käytetään kehitykseen ja tuotantokoontiversioihin.

React Router hallinnoi asiakaspuolen navigointia.

## 13.2. Keskeiset vastuualueet

Frontend vastaa seuraavista:

- Käyttöliittymän renderöinti.
- Tunnistautumisen tila.
- Musiikkikirjaston esittäminen.
- Soittolistojen hallinta.
- Huoneiden käyttöliittymät.
- Toiston ohjaimet.
- Äänen puskurointi.
- Reaaliaikainen viestintä.
- Responsiiviset asettelut.
- PWA-toiminnallisuus.

## 13.3. Äänisoitin

Soitin on jaettu useisiin hookeihin, jotta median elinkaaren hallinta ei sekoitu toiston liiketoimintalogiikkaan.

Keskeinen yhdistämispiste on:

`useAudioPlayer(roomId)`

Se yhdistää mediasourcen hallinnan ja toiston toiminnallisuuden.

## 13.4. Virtualisointi

Suuret musiikkikirjastot edellyttävät tehokasta renderöintiä.

Virtualisoituja listoja käytetään välttämään kaikkien kappaleiden renderöintiä samanaikaisesti.

Tämä on erityisen tärkeää kirjastoissa, joissa on satoja äänikohteita.

## 13.5. Tyylit

Sovellus käyttää SCSS:ää.

Visuaalinen järjestelmä sisältää yhteisiä lasimaisia tyylimixinejä ja responsiivisia breakpoint-arvoja.

Tunnetut breakpoint-arvot:

- 1350px
- 1150px
- 900px
- 600px

---

# 14. Tietokanta-arkkitehtuuri

## 14.1. Tietokantamoottori

Pysyvien sovellustietojen tallentamiseen käytetään MariaDB 11.4 -tietokantaa.

## 14.2. Tietojen pysyvä tallennus

Tietokantaan tallennetaan rakenteisia sovellustietoja, kuten:

- Käyttäjät.
- Äänen metatiedot.
- Soittolistat.
- Soittolistojen kohteet.
- Huoneet.
- Toiston tila.
- Käyttäjien ja toiston väliset suhteet.
- Käyttöoikeuksiin liittyvät tiedot.

Tarkat taulujen nimet, vierasavaimet, indeksit ja sarakemääritykset tulee muodostaa nykyisten migraatioiden tai entiteettikuvausten perusteella.

## 14.3. Tietojen pysyvän tallennuksen periaatteet

Tärkeitä arkkitehtuuriperiaatteita:

1. Toimialueen pysyvä tila tulee erottaa ajonaikaisesta tilasta.
2. Käyttäjän toistokontekstia ei tule sekoittaa huoneen toistotilaan.
3. Huoneiden toistojonot tulee esittää henkilökohtaisista soittolistoista erillään.
4. Binäärinen äänidata tulee erottaa relaatiotietokannan metatiedoista.

---

# 15. Tallennusarkkitehtuuri

Storage-moduuli tarjoaa abstraktion tiedostojen tallennusta varten.

Sen tarkoituksena on estää sovellusmoduuleja olemasta suoraan riippuvaisia tietystä tallennustoteutuksesta.

Audio-moduuli käyttää tallennustoimintoja äänitiedostojen hakemiseen ja hallintaan.

Tarkka tallennuspalveluntarjoaja, polkurakenne, tiedostojen nimeämisstrategia ja käyttörajoitukset tulee dokumentoida toteutuksen perusteella.

---

# 16. Telegram-integraatio

Kai Music sisältää Telegram-botin integroinnin äänitiedostojen lataamista varten.

Botti tarjoaa vaihtoehtoisen tavan aloittaa tiedostojen lataaminen.

Botti ja pääasiallinen verkkosovellus ovat erillisiä integraatiokomponentteja.

Botti käyttää backendin audio-toiminnallisuutta, joten käyttäjien ei tarvitse ladata tiedostoja yksinomaan selaimen kautta.

Botin tarkat komennot, tunnistautumisprosessi ja tuetut tiedostotyypit on tarkistettava botin lähdekoodista.

---

# 17. Käyttöönottoarkkitehtuuri

## 17.1. Infrastruktuuri

Tuotantoympäristö käyttää Docker Composea.

Tunnetut palvelut:

| Palvelu | Vastuualue |
|---|---|
| kai-backend | Spring Boot -backend |
| kai-backend-db | Sovelluksen päätietokanta |
| kai-bot-db | Botin tietokanta |
| kai-frontend | Frontend-palvelu |
| kai-nginx | Käänteisvälityspalvelin |

## 17.2. Verkkoarkkitehtuuri

Nginx toimii julkisena käänteisvälityspalvelimena.

Backendin sisäistä sovellusporttia ei ole tarkoitettu suoraan julkiseen internetiin avattavaksi.

Tunnettu Nginxin sisäinen porttisidonta:

`127.0.0.1:18081:80`

Julkinen käyttö tapahtuu määritetyn verkkotunnuksen ja välityspalvelininfrastruktuurin kautta.

## 17.3. Käyttöönottoprosessi

Yleinen käyttöönottoprosessi:

1. Kokoa frontend.
2. Kokoa backend Mavenilla.
3. Rakenna Docker-imaget.
4. Käynnistä säiliöt tai päivitä ne.
5. Tarkista tietokantayhteys.
6. Tarkista backendin toimintakunto.
7. Tarkista frontendin saatavuus.
8. Tarkista WebSocket-yhteys.
9. Tarkista äänen lataaminen ja toisto.

Tarkat komennot tulee ylläpitää tuotannon Compose-konfiguraation yhteydessä.

## 17.4. Tietokannan hallinta

Tietokannan varmuuskopiot ja migraatiot tulee käsitellä säiliöiden elinkaaresta riippumatta.

Migraatioissa on aiemmin käytetty tietokantavedosta.

Tuotantotietokantojen nimet ja tunnistetiedot tulee ottaa todellisesta käyttöönottokonfiguraatiosta oletusten tekemisen sijaan.

---

# 18. Kehitysympäristö

## 18.1. Backendin vaatimukset

- Java 21.
- Maven.
- MariaDB.
- FFmpeg.
- Java-tukea tarjoava IDE.

## 18.2. Frontendin vaatimukset

- Node.js.
- Yarn 4.
- Vite.
- TypeScript-yhteensopiva IDE.

Projekti käyttää Yarn-versiota 4.16.0.

## 18.3. Paikallinen kehitys

Backendiä ja frontendia voidaan kehittää itsenäisesti.

Frontend kommunikoi backendin kanssa määritettyjen HTTP- ja WebSocket-osoitteiden kautta.

CORS- ja WebSocket origin -asetusten tulee vastata todellista frontendin kehitysosoitetta.

---

# 19. Tietoturvanäkökohdat

Seuraavia tietoturvavaatimuksia sovelletaan:

- Backendin on validoitava tunnistautuminen.
- Käyttöoikeuksien hallinta ei saa perustua frontendin reittien suojaamiseen.
- Yksityisten äänikohteiden tulee olla käyttäjäkohtaisia.
- Huoneoperaatioissa tulee validoida jäsenyys ja käyttöoikeudet.
- Tiedostojen latauksessa tulee validoida tiedostotyyppi ja koko.
- Tallennuspolut eivät saa mahdollistaa mielivaltaista tiedostojärjestelmän käyttöä.
- Salaisuuksia ei saa tallentaa versionhallintaan.
- Tietokantapalveluita ei tule avata julkiseen verkkoon ilman erityistä tarvetta.
- Tuotantoyhteyksissä tulee käyttää HTTPS- ja suojattuja WebSocket-yhteyksiä.

---

# 20. Virheenkäsittely ja diagnostiikka

Sovellus sisältää diagnostics-moduulin.

Kehittäjä on myös luonut erillisen Java Control Terminal -kirjaston.

Terminaali on suunniteltu toimimaan Spring Bootista riippumatta, ja se voidaan integroida Springiin adapterin avulla.

Tunnettuja diagnostiikkatoimintoja ovat:

- Sovelluksen lokit.
- Huoneiden tiedot.
- Huonetyöntekijöiden tiedot.
- Huoneiden toiston diagnostiikka.

Terminaali on operatiivinen työkalu, eikä siitä tule muodostaa riippuvuutta sovelluksen keskeiseen liiketoimintatoimialueeseen.

---

# 21. Tunnetut rajoitukset ja tuleva kehitys

Projektia kehitetään jatkuvasti.

Tunnettuja kehitysprioriteetteja ovat:

- Hallintapaneeli.
- Suoratoiston elinkaaren hallinnan lisätestaus.
- Kattavampi operatiivinen diagnostiikka.
- Frontendin ja backendin integraatiotestauksen jatkaminen.
- Käyttäjien ja huoneiden hallinnan parantaminen.
- Julkisten API-rajapintasopimusten dokumentoinnin täydentäminen.

Näitä kohtia tulee päivittää sitä mukaa, kun toiminnallisuudet valmistuvat.

---

# 22. Arkkitehtuuriperiaatteet

Seuraavat periaatteet ohjaavat Kai Musicin kehitystä:

1. Liiketoiminnan vastuualueiden erottaminen.
2. Modulaarinen backend-arkkitehtuuri.
3. Toimialuelogiikan erottaminen esityskerroksesta.
4. Eksplisiittiset sovelluskomennot ja niiden käsittelijät.
5. Pysyvän tilan ja ajonaikaisen tilan erottaminen.
6. Käyttäjän ja huoneen erilliset toistokontekstit.
7. Reaaliaikainen viestintä WebSocketin kautta.
8. Käyttäjäkohtaiset suoratoistokontekstit.
9. Tallennuksen abstraktio.
10. Backendin valvoma tietoturva.

---

# 23. Dokumentaation ylläpito

Tämä dokumentti kuvaa Kai Musicin arkkitehtuurin ja teknisen kokonaiskuvan.

Sitä tulee täydentää seuraavilla toteutustason dokumenteilla:

- Täydellinen REST API -viite.
- WebSocket-viestisopimukset.
- Tietokantaskeema.
- Entiteettien väliset suhteet.
- Ympäristömuuttujat.
- Docker-käyttöönotto-ohjeet.
- Tunnistautumisprosessi.
- Käyttöoikeusmalli.
- Äänen suoratoistoprotokolla.
- Telegram-botin komennot.
- Vianmääritysopas.

Toteutuskohtaisen dokumentaation tulee aina vastata nykyistä lähdekoodia historiallisten suunnitteluratkaisujen sijaan.
