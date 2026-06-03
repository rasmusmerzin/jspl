# JsPL esitlus

## Sissejuhatus

Minu projekt vastab küsimusele: "Mis oleks siis, kui oleks
võimalik kirjutada program/teek kolmes erinevas keeles
samaaegselt?".

Valitud keeled on JavaScript, Python ja Lua, millest tuleb
ka projekti nimi: JsPL.

JsPL on siis kolme keele vaheline transpiler. Ühes keeles
kirjutatud koodist saab tuletada vastava koodi ülejäänud
kahes keeles.

## Tree-sitter

JsPL on kirjutatud kasutades teeki Tree-sitter. Tree-sitter
võimaldab parsida programmeerimiskeeles kirjutatud koodi
abstraktsesse süntakspuu struktuuri, mis on sarnane XML või
HTML dokumendi struktuurile.

Postril on näha, et Tree-sitteriga parsitud süntakspuu on
igas keeles kohati erinev. Minu program tuletab 3 (kolme)
keele süntakspuust ühise süntakspuu, mis on postril
kujutatud YAML formaadis.

Ühisest süntakspuust genereeritakse kood kõiki kolme keelde.

## Kompromissid

Ühine süntakspuu muidugi tähendab seda, et koodi kirjutades
saab kasutada neid keelefeatuure, mis kõigis kolmes keeles
eksisteerivad.

Mingi osa saab tuletada, näiteks leksilised muutuja
deklaratsioonid pole Pythonis olemas, kuid neid saab
tuletada. Tagajärg on aga see, et JavaScriptis või Luas
kirjutades ei ole võimalik muutujaid varjutada (shadowing).

Teine viis, kuidas lünki täita, on ühine standard teek
kolmes erinevas keeles. Näiteks jada indekseerimine Luas
algab 1-st mitte 0-st. On aga võimalik kirjutada jadale
_wrapper_ andmestruktuur/klass, millel on indekseerimiseks
meetod ning mis alustab loendamist 0-st.

## Lõppsõna

Ma pole kindel, kas see on hea mõte, aga see projekt uurib
vastust küsimusele: "Mis oleks, kui ...?"
