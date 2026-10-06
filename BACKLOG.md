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

## Feedback z telefonu (Samsung)
- 2026-10-06: haptyka działa po zdjęciu Wycisz. Wersja 1: „każdy materiał taki sam” → v2 rytmy. Czeka na ocenę v2.
