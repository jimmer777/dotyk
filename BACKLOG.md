# Dotyk — backlog ulepszeń

Pętla `/loop ulepszaj`: jedno ulepszenie na iterację → test w przeglądarce → commit → push (GitHub Pages).
Live: https://jimmer777.github.io/dotyk/ · Lokalnie: `python3 -m http.server 8473` w tym katalogu.

## Ograniczenia (ustalone)
- `navigator.vibrate` = tylko czas wł./wył., bez siły. Różnice tylko z rytmu, długości, echa.
- Chrome Android nie wibruje w trybie Wycisz (`RINGER_MODE_SILENT`) — kod Chromium `VibrationManagerAndroid.java`.
- Jeden silniczek: wiele palców → wspólna wibracja.

## Do zrobienia (kolejność = priorytet)
- [x] Dźwięk zsynchronizowany z impulsami (Web Audio): szum filtrowany per materiał, dzwonienie przy stuku, przełącznik 🔊
- [ ] Tryb „Zgadnij materiał” (ślepy test): faktura ukryta, 4 odpowiedzi, wynik → czy materiały są rozróżnialne
- [ ] Kreator materiału: opis (słowa kluczowe) + gęstość → parametry haptyki (sedno pierwotnego pytania)
- [ ] Podział na moduły (materials.js, haptics.js, audio.js) gdy index.html > 300 linii
- [ ] Kalibracja: najkrótszy wyczuwalny impuls na danym telefonie → skalowanie wzorców
- [ ] Szybkość palca wpływa na długość dyskretnych impulsów (szybciej = mocniej)
- [ ] Ładniejsze tekstury wizualne (faliste słoje, cienie bruku, odblask szkła)

## Prezentacja `haptyka/` (https://jimmer777.github.io/dotyk/haptyka/)
- [x] Część 1 (czym jest haptyka) + Część 2 (najlepsi na świecie), 22 slajdy, źródła
- [x] Serce: własne tempo, spokojne 30–45/min na dalszych slajdach, 🎤 głośno → 74, wyciszenie ikoną
- [x] Pudełko z kulkami na żyroskopie (devicemotion), test wibracji na starcie (`vibcheck.js`)
- [x] Zwarty układ dla niskich ekranów (≤760 px i ≤640 px wysokości) — sprawdzone 360×620/680, 375×812
- [ ] Kalibracja progu „głośno” mikrofonu na prawdziwym Samsungu (czeka na liczby od Przema)
- [x] Kulki policzalne: 1 stuk na kulkę na przechył, kolejka co 140 ms, filtr drżenia, potrząsanie wzmocnione (test Monte Carlo: wolne przechyły 100%, skos 95–100%, drżenie 0). Przemo: „zostaw kulki”, niedoskonałość OK.
- [ ] Nawigacja między grą a prezentacją (link w grze)

## Feedback z telefonu (Samsung)
- 2026-10-06: tester z pokolenia Alfa sam z siebie stukał **paznokciami** w ekran (tik-tik-tik) na drewnie/szkle. Pomysł: osobny „stuk paznokciem” — krótki, ostry klik + dźwięk zależny od materiału; szybkie serie stuknięć nie mogą się ucinać (szkło ma teraz długie echo ~140 ms). Sprawdzić, czy paznokieć w ogóle rejestruje się jako dotyk (pojemnościowy ekran) i czy da się go odróżnić po rozmiarze styku (PointerEvent width/height).
- 2026-10-06: haptyka działa po zdjęciu Wycisz. Wersja 1: „każdy materiał taki sam” → v2 rytmy. Czeka na ocenę v2.
