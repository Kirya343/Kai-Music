# Kai Music – Projektisuunnitelma

## 1. Projektin nimi
Kai Music

## 2. Projektin tavoite
Projektin tavoitteena on kehittää verkkopohjainen musiikin suoratoistopalvelu, jossa käyttäjät voivat kuunnella musiikkia ja jakaa kuuntelukokemuksen muiden käyttäjien kanssa reaaliajassa.

## 3. Projektin kuvaus
Kai Music on musiikin suoratoistopalvelu, joka mahdollistaa musiikin kuuntelun sekä yhteisen kuunteluhuoneen luomisen. Käyttäjät voivat liittyä huoneisiin ja kuunnella samaa musiikkia samanaikaisesti.

Palvelussa on käyttöliittymä, taustapalvelin ja tietokanta. Järjestelmän eri osat kommunikoivat keskenään API-rajapintojen ja reaaliaikaisen viestinnän avulla.

## 4. Käytetyt teknologiat

- **React** – käyttöliittymän toteuttaminen.
- **TypeScript** – käyttöliittymän ohjelmointikieli.
- **Spring Boot** – taustapalvelimen ja liiketoimintalogiikan toteuttaminen.
- **Java** – taustapalvelimen ohjelmointikieli.
- **MariaDB** – tietojen tallentaminen tietokantaan.
- **WebSocket ja STOMP** – reaaliaikainen viestintä palvelimen ja asiakkaiden välillä.
- **Docker** – sovelluksen ja sen palveluiden käyttöönotto.
- **Nginx** – HTTP-pyyntöjen välittäminen oikeille palveluille.

## 5. Projektin keskeiset ominaisuudet

- Musiikkikirjaston selaaminen.
- Musiikin toistaminen verkkoselaimessa.
- Kuunteluhuoneiden luominen ja niihin liittyminen.
- Musiikin toiston synkronointi huoneen käyttäjien välillä.
- Soittolistan hallinta.
- Toiston ohjaaminen, kuten kappaleen vaihtaminen ja toiston keskeyttäminen.
- Reaaliaikainen viestintä palvelimen ja käyttäjien välillä.

## 6. Projektin toteutus

Projekti koostuu kolmesta pääosasta:

1. **Frontend:** React-pohjainen käyttöliittymä, jonka kautta käyttäjät käyttävät palvelua.
2. **Backend:** Spring Boot -pohjainen palvelin, joka käsittelee sovelluksen logiikan, musiikin toiston ja käyttäjien välisen synkronoinnin.
3. **Tietokanta:** MariaDB, johon tallennetaan sovelluksen tarvitsemia tietoja.

Frontend ja backend kommunikoivat HTTP-rajapinnan ja WebSocket-yhteyksien kautta. Backend vastaa musiikin toiston tilasta, jotta saman kuunteluhuoneen käyttäjät voivat kuunnella musiikkia synkronoidusti.

## 7. Projektin aikataulu

Projekti toteutetaan vaiheittain:

1. Vaatimusten määrittely ja suunnittelu.
2. Tietokannan ja backendin kehittäminen.
3. Frontendin kehittäminen.
4. Musiikin suoratoiston ja reaaliaikaisen synkronoinnin toteuttaminen.
5. Järjestelmän testaus ja virheiden korjaaminen.
6. Sovelluksen käyttöönotto palvelimella.

## 8. Testaus

Sovellusta testataan kehityksen aikana. Testauksessa tarkistetaan käyttöliittymän toiminta, backendin rajapinnat, tietokantayhteydet sekä musiikin toiston synkronointi eri käyttäjien välillä.

Lisäksi testataan virhetilanteita, kuten verkkoyhteyden katkeamista ja kuunteluhuoneeseen liittymistä kesken toiston.

## 9. Projektin lopputulos

Projektin lopputuloksena syntyy toimiva verkkopohjainen musiikin suoratoistopalvelu, jossa käyttäjät voivat kuunnella musiikkia ja jakaa kuuntelukokemuksen muiden käyttäjien kanssa reaaliajassa.

Projektin tavoitteena on kehittää skaalautuva ja ylläpidettävä sovellus, jonka toiminnallisuuksia voidaan laajentaa myöhemmin.