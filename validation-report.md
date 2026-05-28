# YAMA Deutsch - Validierungsbericht

Dieses Dokument enthält die formalen Validierungsergebnisse für das überarbeitete YAMA Deutsch Konzept und Datenmodell im aktuellen Workspace.

---

## 1. Übersicht der Metadaten

* **Anzahl der Fehleritems im Fehlerkatalog**: 24 Items (8 Kategorien, jeweils 3 Items).
* **Anzahl der Diagnoseaufgaben**: 20 Aufgaben.

---

## 2. Fehler-IDs Abgleich

### 2.1 Liste aller error_id aus fehlerkatalog.md
1. `ORTH_UML_01` (Umlaut-Degradierung)
2. `ORTH_DEHN_02` (Auslassung stummer Dehnungselemente)
3. `ORTH_KAP_03` (Kleinschreibung von Substantiven)
4. `PHON_EPEN_01` (Vokalepenthese bei s-Konsonant-Clustern)
5. `PHON_AUSL_02` (Fehlerhafte Auslautverhärtung)
6. `PHON_H_03` (H-Ausfall / Elision des glottalen Frikativs)
7. `MOR_PLUR_01` (Plural-Nullmarkierung nach Zahlen)
8. `MOR_COMP_02` (Auslassung der Nominalkomposition)
9. `MOR_PREF_03` (Präfix-Fehlgebrauch bei trennbaren/untrennbaren Verben)
10. `SYN_INV_01` (Fehlende Inversion nach Vorfeldbesetzung)
11. `SYN_NS_02` (Hauptsatzwortstellung im Nebensatz)
12. `SYN_VKB_03` (Verletzung der Satzklammer bei komplexen Prädikaten)
13. `MORSYN_PREP_01` (Nullpräposition bei präpositionaler Rektion)
14. `MORSYN_CASE_02` (Falscher Kasus durch L1-Kasus-Transfer)
15. `MORSYN_CONG_03` (Subjekt-Verb-Kongruenzfehler)
16. `LEXSEM_DRINK_01` (Lexikalischer Transfer "Suppe trinken")
17. `LEXSEM_GO_02` (Übergeneralisierung von "gehen")
18. `LEXSEM_DO_03` (Übergeneralisierung von "machen")
19. `PRAG_FORM_01` (Fehlsteuerung der Höflichkeitspragmatik)
20. `PRAG_IDIOM_02` (Wörtliche Übersetzung von Formeln)
21. `PRAG_RESP_03` (Elliptische Scheinantworten bei Befindlichkeitsfragen)
22. `TEXT_COH_01` (Monotone Satzverknüpfung / Reihungsstil)
23. `TEXT_PUNC_02` (Fehlendes Komma vor Nebensätzen)
24. `TEXT_PASS_03` (Passiv-Vermeidung durch Aktiv-Umschreibungen)

### 2.2 Liste aller error_id aus diagnostic-test.md
1. `SYN_INV_01` (Aufgabe 1)
2. `SYN_NS_02` (Aufgabe 2)
3. `SYN_VKB_03` (Aufgabe 3)
4. `ORTH_UML_01` (Aufgabe 4)
5. `ORTH_DEHN_02` (Aufgabe 5)
6. `ORTH_KAP_03` (Aufgabe 6)
7. `PHON_EPEN_01` (Aufgabe 7)
8. `PHON_AUSL_02` (Aufgabe 8)
9. `PHON_H_03` (Aufgabe 9)
10. `MOR_PLUR_01` (Aufgabe 10)
11. `MOR_COMP_02` (Aufgabe 11)
12. `MOR_PREF_03` (Aufgabe 12)
13. `MORSYN_PREP_01` (Aufgabe 13)
14. `MORSYN_CASE_02` (Aufgabe 14)
15. `MORSYN_CONG_03` (Aufgabe 15)
16. `LEXSEM_DRINK_01` (Aufgabe 16)
17. `LEXSEM_GO_02` (Aufgabe 17)
18. `LEXSEM_DO_03` (Aufgabe 18)
19. `PRAG_IDIOM_02` (Aufgabe 19)
20. `TEXT_PUNC_02` (Aufgabe 20)

---

## 3. Validierungsfragen & Antworten

* **Ergebnis des Abgleichs: alle IDs konsistent**: **ja** (Jede im Diagnose-Test referenzierte `error_id` existiert als exaktes Äquivalent im Fehlerkatalog).
* **Gibt es doppelte source_basis-Felder**: **nein** (Jedes Item und jede Aufgabe besitzt genau ein einheitliches Feld `source_basis` mit bereinigten, einzigartigen Quellenangaben).
* **Gibt es nicht freigegebene Quellen**: **nein** (Haberzeth, Rehbein, Tekin, Döllinger, Kızıltan, Czepluch, Schroeder und andere wurden vollständig entfernt. Es werden ausschließlich die genehmigten Kernquellen verwendet).
* **TypeScript-Interfaces syntaktisch sauber**: **ja** (Die Datei `datenmodell.md` enthält eine vollständig kompilierbare und geschlossene TypeScript-Syntax).
