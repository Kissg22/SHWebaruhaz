# SHWebaruhaz Shopify Téma

Ez a repository az SHWebaruhaz (Simple Happy) egyedi Shopify témáját tartalmazza.

## Leírás

A projekt egy teljes Shopify téma, amely a bolt teljes megjelenését és működését definiálja. Tartalmazza a szükséges sablonokat, szekciókat, kódrészleteket, stíluslapokat és szkripteket.

## Technológiai háttér

A téma a következő technológiákra épül:

*   **Shopify Liquid:** A Shopify saját sablonnyelve, amelyet a dinamikus tartalom megjelenítésére használnak.
*   **JavaScript:** Az interaktív funkciókhoz és a felhasználói élmény javításához.
*   **CSS:** A weboldal stílusának és elrendezésének meghatározásához.
*   **JSON:** A téma beállításainak és a sablonok adatstruktúráinak tárolására.

## Mappaszerkezet

A Shopify témák szabványos mappaszerkezetet követnek:

*   `assets/`: Itt találhatóak a téma által használt eszközök, mint például CSS fájlok, JavaScript fájlok, képek és betűtípusok.
*   `config/`: A téma beállításait tartalmazó JSON fájlok helye. Itt definiálhatóak a "Theme Customizer"-ben megjelenő opciók.
*   `layout/`: A fő elrendezési fájl (`theme.liquid`), amely minden oldalon közös elemeket (pl. fejléc, lábléc) tartalmaz.
*   `locales/`: A téma többnyelvűsítéséhez szükséges fordítási fájlok (JSON formátumban).
*   `sections/`: Újrahasználható, moduláris részek, amelyeket a bolt tulajdonosa a "Theme Customizer"-en keresztül szerkeszthet és rendezhet az oldalakon.
*   `snippets/`: Kisebb, újrahasználható kódrészletek, amelyeket más sablonfájlokba lehet beilleszteni.
*   `templates/`: Az oldaltípusok (pl. termékoldal, kollekció oldal, kosár) fő sablonfájljai.
    *   `templates/customers/`: A felhasználói fiókkal kapcsolatos oldalak sablonjai.

## Telepítés és használat

A téma telepítése egy Shopify áruházba a következőképpen történhet:

1.  **Tömörítés:** Csomagolja be a teljes téma mappát egy `.zip` fájlba.
2.  **Feltöltés:**
    *   Lépjen be a Shopify admin felületére.
    *   Navigáljon az `Online Store` > `Themes` menüpontra.
    *   A "Theme library" szekcióban kattintson az `Add theme` > `Upload zip file` gombra.
    *   Válassza ki az előzőleg létrehozott `.zip` fájlt és töltse fel.
3.  **Testreszabás és publikálás:** A feltöltés után a téma megjelenik a "Theme library"-ben, ahol testreszabhatja (`Customize`) és publikálhatja (`Publish`).

## Fejlesztés

A helyi fejlesztéshez a Shopify CLI használata javasolt, amely lehetővé teszi a téma fájljainak szinkronizálását egy fejlesztői áruházzal, és valós időben láthatja a változtatásokat.
