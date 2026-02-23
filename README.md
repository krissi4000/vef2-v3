```
npm install
npm run dev
```

```
open http://localhost:3000
```


---
# Vefforritun 2 2026, verkefni 3

## Markmið

- Setja upp RESTful „CRUD“ vefþjónustur með Hono.
- Nota Prisma til að vinna með gagnagrunn.
- Áframhald á notkun á TypeScript og Zod.

## Verkefnið

Verkefnið snýst um að setja upp vefþjónsutur fyrir fréttavef þar sem hver sem er getur búið til fréttir sem birtast svo í fréttalista. Einnig skal útfæra þjónsutur sem breyta og eyða fréttum ásamt CRUD aðgerðum fyrir höfundi frétta.

Setja skal upp vefþjónusturnar með [Hono](https://hono.dev/) og [Prisma](https://www.prisma.io/) fyrir gagnagrunnsvinnsluna. Nota skal áfram TypeScript og Zod til að staðfesta gögn.

**Ekki þarf að setja upp neitt viðmót eða útlit**. Haldið verður áfram með verkefni í verkefni 4 þar sem vefur í Next.js verður settur upp sem býr til viðmót ofan á þessar vefþjónustur.

### Vefþjónustur

Setja skal upp Hono með „template“ fyrir Node.js og TypeScript. Vefþjónustur sem útfæra skal eru:

Fyrir höfund:

- `GET /authors` skilar lista af höfundum:
  - `200 OK` skilað með gögnum á JSON formi.
  - `500 Internal Error` skilað ef villa.
- `GET /authors/:id` skilar stökum höfund eftir auðkenni:
  - `200 OK` skilað með gögnum ef höfundur er til.
  - `404 Not Found` skilað ef höfundur er ekki til.
  - `500 Internal Error` skilað ef villa.
- `POST /authors` býr til nýjan höfund:
  - `201 Created` skilað ásamt upplýsingum um flokk.
  - `400 Bad Request` skilað ef gögn sem send inn eru ekki rétt (vantar gögn, gögn á röngu formi eða innihald þeirra ólöglegt).
  - `500 Internal Error` skilað ef villa.
- `PUT /authors/:id` uppfærir höfund:
  - `200 OK` skilað með uppfærðum höfund ef gekk.
  - `400 Bad Request` skilað ef gögn sem send inn eru ekki rétt.
  - `404 Not Found` skilað ef höfundur er ekki til.
  - `500 Internal Error` skilað ef villa.
- `DELETE /authors/:id` eyðir höfund:
  - `204 No Content` skilað ef gekk.
  - `404 Not Found` skilað ef höfundur er ekki til.
  - `500 Internal Error` skilað ef villa.

Skilgreina þarf vefþjónustur fyrir fréttir á sama hátt þar sem hægt er að skoða allar fréttir, skoða staka frétt, búa til fétt, uppfæra frétt og eyða frétt.

Þegar öllum færslum er skilað skal skila síðu af gögnum, sjálfgefið skal skila `10` nýjustu færslum byrjað frá `0`. Skila skal gögnum innan `data` og síðu upplýsingum undir `paging`:

```json
{
  "data": [
    /* allar færslur */
  ],
  "paging": {
    "limit": 10, // fjöldi færsla sem skilað
    "offset": 0, // hvaðan er byrjað, 0 = byrjum frá nýjustu, 10 = byrjum frá 10undu færslu
    "total": 99 // heildarfjöldi færsla
  }
}
```

Fyrir frétt skal sækja eftir [`slug`](https://en.wikipedia.org/wiki/Clean_URL#Slug), ekki eftir auðkenni (`id`).

Í rót (`GET /`) skal skila yfirliti yfir allar vefþjónustur, sjá gefinn grunn.

### Gögn

Nota skal Prisma til að vinna með gögnin. Setja skal upp [_seed_ fyrir grunngögn](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding), búa þarf til nokkra höfunda (3-4) og að minnsta kosti 11 fréttir með bull gögnum þar sem höfundar eru tengdir.

Þegar fyrirspurnir eru gerðar í gagnagrunn skal eingöngu nota Prisma client.

### Staðfesting á gögnum

Fyrir staðfestingu gögnum væri skal nota Zod með [tengingu við Hono](https://hono.dev/docs/guides/validation#with-zod).

Fyrir höfund verður að skilgreina:

- Nafn, ekki tómur strengur, eitthvað hámark.
- Netfang, eitthvað hámark.

Fyrir frétt:

- Ttil, ekki tómur strengur, eitthvað hámark.
- Inngang/útdrátt, , ekki tómur strengur, eitthvað hámark.
- Efni, ekki tómur strengur.
- Höfund, vísun í höfund.
- Útgefin eða ekki, `boolean` gildi.

Huga þarf að öryggi:

- Skrá þarf gögn í gagngrunn með réttum hætti, athugið að ef Prisma client er notaður þarf ekki að hafa áhyggjur af þessu.
- XSS árásir skulu ekki vera mögulegar, nota skal `xss` pakka við skráningu á gögnum

Ekki þarf að útfæra notendaumsjón eða aðgangsstýringar.

### TypeScript

Nota skal TypeScript í verkefninu í gegnum uppsetningu í Hono.

Nota skal týpur með `type` og skilgreina á öll föll. Ekki skal nota `any` týpur. Forðast ætti að nota `as` lykilorðið til að varpa gögnum yfir í týpu.

### Tæki, tól og test

Nota skal Node.js 24 og NPM.

Aðeins skal nota ECMAScript modules (ESM, `import` og `export`) og ekki CommonJS (`require`).

Setja skal upp `eslint` með TypeScript og strict type checking (`"strict": true` í `tsconfig.json`). Engar villur eða viðvaranir skulu vera til staðar. Setja skal upp GitHub Action til að keyra lint og test við hvert push er gefið.

Í verkefni skal skrifa próf með [Node.js test runner](https://nodejs.org/docs/latest-v24.x/api/test.html). Skrifa skal a.m.k. tvö próf fyrir einhvern kóða.

### GitHub og hýsing

Verkefnið skal keyra á [Render](https://render.com/) eða álíka þjónustu sem styður PostgreSQL og Node.js. Einnig er hægt að setja upp postgres á [Neon](https://neon.com/) eða álíka sértækum postgres hýsingum.

Lesa skal `DATABASE_URL` úr environment variable fyrir tengingu við gagnagrunn.

## Mat

- 45% — Vefþjónustur útfærðar með Hono.
- 20% — Gögn, unnið með Prisma.
- 15% — Staðfesting á gögnum.
- 10% — TypeScript; tæki, tól og test.
- 10% — GitHub og hýsing.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðivkudaginn 11. febrúar 2026.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 26. febrúar 2026.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify.
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `KristinFrida`
  - `MarzukIngi`
  - `osk`

## Aðstoð

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ekki er heimilt að nota stór mállíkön til að vinna verkefni í námskeiðinu, [sjá nánar um notkun](https://github.com/vefforritun/vef2-2026/blob/main/mallikon.md).

## Einkunn

Sett verða fyrir ([sjá nánar í kynningu á áfanga](https://github.com/vefforritun/vef2-2026/blob/main/namsefni/01.kynning/1.kynning.md)):

- fimm minni sem gilda 10% hvert, samtals 50% af lokaeinkunn.
- tvö hópverkefni þar sem hvort um sig gildir 20%, samtals 40% af lokaeinkunn.
- einstaklingsverkefni sem gildir 15–25% af lokaeinkunn.

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
