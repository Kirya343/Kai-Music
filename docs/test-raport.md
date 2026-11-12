# Kai Music – Testiraportti

## 1. Projektin kuvaus

Kai Music on beta-vaiheessa oleva verkkosovellus, jonka avulla käyttäjät voivat kuunnella musiikkia yhdessä reaaliaikaisissa kuunteluhuoneissa.

Sovellus on julkaistu ja käyttäjien saatavilla, mutta sen kehitystyö jatkuu edelleen. Kehityksen aikana sovellukseen tehdään uusia ominaisuuksia, suorituskyvyn optimointia ja virheenkorjauksia.

## 2. Testauksen tavoitteet

Testauksen tavoitteena oli varmistaa sovelluksen keskeisten toimintojen oikeellisuus, arvioida järjestelmän vakautta ja tunnistaa mahdollisia suorituskykyongelmia.

Testauksessa keskityttiin erityisesti seuraaviin osa-alueisiin:

- Käyttäjien rekisteröityminen ja kirjautuminen
- Äänitiedostojen hallinta
- Musiikin suoratoisto ja toiston hallinta
- Kuunteluhuoneiden toiminta
- Reaaliaikainen toiston synkronointi
- Soittolistat
- WebSocket-yhteydet
- Käyttöliittymän toiminta ja mobiiliresponsiivisuus
- Sovelluksen suorituskyky ja vakaus

## 3. Testausympäristö

Sovellus on sijoitettu Ubuntu-käyttöjärjestelmää käyttävälle virtuaalipalvelimelle (VDS).

Palvelimen resurssit:

- Prosessori: 12 ydintä
- RAM-muisti: 32 GB
- Tallennustila: 300 GB SSD

Sovelluksen palvelut toimivat Docker-konttiympäristössä ja kommunikoivat Docker-verkon kautta. Tietokantajärjestelmänä käytetään MariaDB 11.4 -versiota.

## 4. Toiminnallinen testaus

Sovelluksen toiminnallisuutta testattiin pääasiassa manuaalisesti. Testaus kattoi käyttäjien rekisteröitymisen ja kirjautumisen, äänitiedostojen lataamisen ja poistamisen, musiikin toiston, soittolistat sekä kuunteluhuoneiden toiminnan.

Reaaliaikaista musiikin suoratoistoa ja toiston synkronointia testattiin myös usean käyttäjän kanssa. Testaukseen osallistui kehittäjän lisäksi muita käyttäjiä, joiden kanssa musiikkia kuunneltiin samanaikaisesti yhteisissä kuunteluhuoneissa.

Testatuissa toiminnoissa ei havaittu kriittisiä toiminnallisia virheitä.

Automaattisten testien kattavuus on tällä hetkellä vähäinen. Toiminnallisuuden varmistaminen perustuu pääasiassa manuaaliseen testaukseen.

## 5. Selain- ja laitetestaus

Sovellusta testattiin seuraavilla selaimilla:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Testausympäristöihin kuuluivat Android, Linux ja Windows. Käyttöliittymän mobiiliresponsiivisuutta testattiin myös mobiililaitteilla, mukaan lukien Xiaomi Redmi Note 11 Pro ja iPhone.

Testauksessa havaittiin, että nykyinen Media Source Extensions (MSE) -pohjainen suoratoistoratkaisu ei ole yhteensopiva Applen laitteiden kanssa nykyisessä toteutuksessa. Tämä rajoittaa erityisesti musiikin suoratoiston käyttöä kyseisillä laitteilla.

## 6. Kuormitustestaus

Kuormitustestaus toteutettiin k6-työkalulla 11.11.2026.

Testauksessa virtuaalikäyttäjille rekisteröitiin ensin omat käyttäjätilit. Tämän jälkeen käyttäjät suorittivat kirjautumis- ja tunnisteiden päivityspyyntöjä. Kuormitusta kasvatettiin asteittain enintään 300 virtuaaliseen käyttäjään.

Testauksen tarkoituksena oli arvioida erityisesti autentikointirajapinnan suorituskykyä ja palvelimen vakautta.

### 6.1. Testitulokset

| Mittari | Tulos |
|---|---:|
| Virtuaalikäyttäjien enimmäismäärä | 300 |
| HTTP-pyyntöjen määrä | 10 983 |
| Keskimääräinen pyyntömäärä sekunnissa | 17,09 |
| Suoritetut iteraatiot | 5 341 |
| Keskimääräinen vasteaika | 5,88 s |
| Vasteajan mediaani | 4,46 s |
| P90 | 13,61 s |
| P95 | 16,63 s |
| HTTP-virheiden osuus | 0,02 % |

### 6.2. Rajapintakohtaiset tulokset

| Rajapinta | Keskimääräinen vasteaika | P95 |
|---|---:|---:|
| Register | 539 ms | 1,06 s |
| Login | 5,48 s | 14,29 s |
| Refresh | 6,59 s | 19,38 s |

### 6.3. Tulosten arviointi

Testin aikana palvelin pysyi toiminnassa eikä järjestelmä kaatunut. HTTP-virheiden osuus jäi hyvin pieneksi.

Vasteajat kuitenkin kasvoivat merkittävästi kuormituksen kasvaessa. Erityisesti kirjautumis- ja tunnisteiden päivityspyynnöt olivat hitaita.

Tulosten perusteella palvelimen vakaus säilyi testatussa kuormituksessa, mutta autentikointirajapinnan suorituskyvyssä on vielä optimointitarpeita.

On tärkeää huomioida, että testaus kohdistui ainoastaan autentikointiin liittyviin rajapintoihin. Muita REST API -rajapintoja ja WebSocket-yhteyksiä ei sisällytetty tähän testiin. Tulosten perusteella ei siten voida arvioida koko sovelluksen suorituskykyä vastaavalla käyttäjämäärällä.

## 7. Havaitut ongelmat ja rajoitukset

Kehityksen ja testauksen aikana havaittiin joitakin ongelmia, jotka liittyivät musiikin toiston jatkuvuuteen ja käyttöliittymän uudelleenohjauksiin. Havaitut ongelmat korjattiin.

Tunnistautumisen toteutus on siirretty aiemmasta sovelluksesta, ja sitä on hyödynnetty noin 11 kuukauden ajan.

Nykyisessä versiossa on edelleen joitakin vähäisiä teknisiä virheitä, jotka eivät vaikuta merkittävästi käyttäjäkokemukseen. Niiden korjaaminen on suunniteltu myöhempiin kehitysvaiheisiin.

Lisäksi tietokantatoiminnoissa on havaittu optimointitarpeita. Esimerkiksi käyttäjän rekisteröitymisen yhteydessä suoritetaan useita SQL-kyselyitä. Näiden kyselyiden määrää ja tehokkuutta on tarkoitus tarkastella ja mahdollisuuksien mukaan vähentää.

## 8. Jatkokehitys ja jatkotestaus

Sovelluksen kehitystä ja testausta jatketaan seuraavilla osa-alueilla:

### 8.1. SQL-kyselyiden optimointi

Tietokantakyselyiden optimointi on jo aloitettu. Tavoitteena on vähentää tarpeettomia tietokantakyselyitä ja parantaa niiden tehokkuutta erityisesti rekisteröitymisen ja muiden useita kyselyitä suorittavien toimintojen yhteydessä.

### 8.2. REST API -kuormitustestaus

REST API -rajapintojen kuormitustestaus on jo aloitettu. Ensimmäinen testi on suoritettu, ja sen aikana havaittiin suorituskykyongelmia. Testausta jatketaan muiden rajapintojen osalta, ja havaittuja ongelmia analysoidaan ja korjataan.

### 8.3. WebSocket- ja suoratoiston stressitestaus

Tulevaisuudessa toteutetaan laaja stressitestikokonaisuus, jossa keskitytään WebSocket-yhteyksien ja reaaliaikaisen musiikin suoratoiston kuormitukseen.

Testauksessa arvioidaan muun muassa samanaikaisten käyttäjäyhteyksien määrää, viestien välitystä, äänifragmenttien siirtoa sekä palvelimen toimintaa suuren käyttäjämäärän aikana.

### 8.4. Automaattisten testien lisääminen

Automaattisten testien kehittäminen on suunniteltu myöhempään vaiheeseen. Tavoitteena on lisätä testikattavuutta ja vähentää riippuvuutta manuaalisesta testauksesta.

### 8.5. iOS-yhteensopivuuden parantaminen

Applen laitteiden yhteensopivuutta pyritään parantamaan lisäämällä frontend-toteutukseen Managed Media Source (MMS) -tekniikan tuki. Tavoitteena on mahdollistaa nykyisen suoratoistoratkaisun käyttö myös iOS-laitteilla.

## 9. Yhteenveto

Testauksen perusteella Kai Musicin keskeiset toiminnallisuudet toimivat odotetulla tavalla manuaalisesti testatuissa tilanteissa. Sovellusta on testattu useilla selaimilla ja käyttöjärjestelmillä sekä usean käyttäjän yhteisissä kuunteluhuoneissa.

Kuormitustestauksessa palvelin pysyi toiminnassa enintään 300 virtuaalisen käyttäjän kuormituksessa. Testaus paljasti kuitenkin autentikointirajapinnan suorituskykyyn liittyviä kehityskohteita.

Sovellus on edelleen beta-vaiheessa, ja sen jatkokehityksessä keskitytään erityisesti suorituskyvyn optimointiin, laajempaan kuormitustestaukseen, automaattisten testien lisäämiseen sekä iOS-yhteensopivuuden parantamiseen.