# Loppuraportti ja kokemukset

## Projektin lopputulos

Kai Music -projekti saavutti alkuperäiset tavoitteensa. Sovellus on tällä hetkellä toimiva kokonaisuus, jota käytän myös itse säännöllisesti. Projektin keskeiset ominaisuudet, kuten musiikkikirjasto, musiikin suoratoisto, soittolistat, musiikkihuoneet ja käyttäjien välinen toiston synkronointi, on toteutettu.

Sovelluksen kehitys jatkuu edelleen, mutta työ painottuu nykyisin olemassa olevien toimintojen optimointiin ja uusien ominaisuuksien kehittämiseen. Kokonaisuutena lopputulos ylitti alkuperäiset odotukseni. Erityisesti reaaliaikaisen musiikin suoratoiston toteuttaminen ja synkronoinnin onnistuminen olivat merkittäviä saavutuksia.

## Teknisten haasteiden ratkaiseminen

Projektin haastavin osa oli sopivan arkkitehtuurin suunnittelu ja kokonaisuuden hahmottaminen ennen toteutusta. Erityisesti toistomoduulin kehittäminen vaati paljon suunnittelua ja kokeilua. Kolmen kuukauden aktiivisen kehitystyön aikana moduulin arkkitehtuuri suunniteltiin ja toteutettiin uudelleen lähes viisi kertaa. Muutokset koskivat nimenomaan toistomoduulia, sillä sovelluksen muut osat toimivat jo ennen näitä uudistuksia.

Suurimpia haasteita olivat erilaisten suoratoisto- ja tiedonsiirtoratkaisujen vertailu. Osa ratkaisuista aiheutti liian suuria viiveitä käyttäjän tekemän komennon ja palvelimen vastauksen välille. Toiset ratkaisut puolestaan rajoittivat erilaisten soittimien toteuttamista, kuten henkilökohtaisen soittimen ja yhteisen musiikkihuonesoittimen erottamista toisistaan. Joissakin kokeilluissa toteutuksissa viive saattoi kasvaa jopa kymmeneen sekuntiin, minkä seurauksena seuraava kappale saattoi alkaa ennen edellisen kappaleen päättymistä.

Lopulta onnistuin toteuttamaan järjestelmän, jossa musiikin toisto pysyy eri käyttäjien välillä synkronoituna noin sekunnin kymmenesosan tarkkuudella. Myös toiston keskeyttäminen, jatkaminen, kappaleiden vaihtaminen ja eteen- sekä taaksepäin siirtyminen toimivat synkronoidusti.

## Osaamisen kehittyminen

Projekti kehitti osaamistani erityisesti backend-kehityksessä ja järjestelmäarkkitehtuurin suunnittelussa.

Aiemmin kehittämäni sovellukset olivat pääasiassa perinteisiä tietojärjestelmiä, kuten ilmoituspalveluita, sisällönhallintajärjestelmiä ja chat-sovelluksia. Niissä keskeinen tekninen haaste liittyi yleensä tiedon käsittelyyn ja kulkuun käyttöliittymän, palvelinlogiikan ja tietokannan välillä.

Kai Music -projektissa pääsin perehtymään huomattavasti syvemmin palvelinpuolen toimintaan. Erityisesti reaaliaikainen tiedonsiirto, asynkroninen suoritus, tilanhallinta ja eri komponenttien välinen yhteistyö vaativat itsenäisesti suunniteltua ja toteutettua logiikkaa. Tämä muutti merkittävästi käsitystäni backend-kehityksen monimutkaisuudesta ja kehitti ymmärrystäni palvelinjärjestelmien sisäisestä toiminnasta.

Projektin aikana opin myös, kuinka tärkeää arkkitehtuurin suunnittelu on ennen varsinaisen toteutuksen aloittamista. Vaikka nykyisillä tiedoillani toteuttaisin projektin edelleen samalla tavalla, pystyisin todennäköisesti välttämään useita kokonaisvaltaisia uudelleentoteutuksia.

## Jatkokehitys ja tulevaisuuden näkymät

Kai Musicin kehitys jatkuu myös tämän projektin jälkeen. Suunniteltuja kehityskohteita ovat muun muassa ilmoitusjärjestelmä, iOS-laitteiden suoratoistoyhteensopivuuden parantaminen, käyttäjätasot ja niihin liittyvät käyttörajoitukset sekä erillinen hallintapaneeli.

Lisäksi tavoitteena on kehittää kirjastoja ja rajapintoja, joiden avulla Kai Musicin suoratoistoteknologiaa voidaan integroida muihin palveluihin, verkkosivustoihin ja mahdollisesti myös peleihin. Järjestelmän suorituskyvyn optimointi ja skaalautuvuuden parantaminen ovat myös keskeisiä jatkokehityksen tavoitteita.

Näen erityisen paljon potentiaalia teknologian hyödyntämisessä erilaisissa yritys- ja oppimisympäristöissä. Esimerkiksi opetuksessa järjestelmää voitaisiin käyttää tilanteissa, joissa opettaja käynnistää äänimateriaalin koko ryhmälle. Jokainen oppilas voisi kuunnella samaa materiaalia samanaikaisesti omalla laitteellaan ja säätää äänenvoimakkuutta itsenäisesti ilman yhteisiä kaiuttimia. Näin kuuntelu olisi mahdollista toteuttaa laadukkaasti ja ilman, että äänenvoimakkuus tai ympäristön melu häiritsee muita.

Tulevaisuudessa tavoitteeni on kehittää Kai Musicista pelkkää musiikin suoratoistopalvelua laajempi reaaliaikaisen äänentoiston alusta, jota voidaan hyödyntää myös muiden palveluiden osana.