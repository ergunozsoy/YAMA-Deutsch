# YAMA Deutsch - JSON-Daten Validierungsbericht

Dieses Dokument enthält die Validierungsergebnisse für die generierten JSON-Datenstrukturen im Ordner `06_App_Code/data`.

---

## 1. Übersicht der JSON-Ressourcen

* **errors.json**: Enthält 24 strukturierte Fehler-Items (Kategorie `ORTH` bis `TEXT`).
* **diagnostic_tasks.json**: Enthält 20 diagnostische Fragen mit Musterlösungen, L1-L2-Feedback und wissenschaftlichen Quellnachweisen.
* **exercise_templates.json**: Enthält 16 Vorlagen zur dynamischen Generierung von Übungen (2 Templates pro Kategorie).

---

## 2. Validierungsschritte

### 2.1 Konsistenz der Diagnose-Aufgaben
Alle in `diagnostic_tasks.json` verwendeten Referenzen des Feldes `error_id` wurden mit dem Hauptkatalog `errors.json` abgeglichen.

| Diagnoseaufgabe | Referenzierte `error_id` | Status in `errors.json` |
| :--- | :--- | :--- |
| `Q_SYN_INV_01` | `SYN_INV_01` | **Vorhanden** |
| `Q_SYN_NS_01` | `SYN_NS_02` | **Vorhanden** |
| `Q_SYN_VKB_01` | `SYN_VKB_03` | **Vorhanden** |
| `Q_ORTH_UML_01` | `ORTH_UML_01` | **Vorhanden** |
| `Q_ORTH_DEHN_01` | `ORTH_DEHN_02` | **Vorhanden** |
| `Q_ORTH_KAP_01` | `ORTH_KAP_03` | **Vorhanden** |
| `Q_PHON_EPEN_01` | `PHON_EPEN_01` | **Vorhanden** |
| `Q_PHON_AUSL_01` | `PHON_AUSL_02` | **Vorhanden** |
| `Q_PHON_H_01` | `PHON_H_03` | **Vorhanden** |
| `Q_MOR_PLUR_01` | `MOR_PLUR_01` | **Vorhanden** |
| `Q_MOR_COMP_01` | `MOR_COMP_02` | **Vorhanden** |
| `Q_MOR_PREF_01` | `MOR_PREF_03` | **Vorhanden** |
| `Q_MORSYN_PREP_01` | `MORSYN_PREP_01` | **Vorhanden** |
| `Q_MORSYN_CASE_01` | `MORSYN_CASE_02` | **Vorhanden** |
| `Q_MORSYN_CONG_01` | `MORSYN_CONG_03` | **Vorhanden** |
| `Q_LEXSEM_DRINK_01` | `LEXSEM_DRINK_01` | **Vorhanden** |
| `Q_LEXSEM_GO_01` | `LEXSEM_GO_02` | **Vorhanden** |
| `Q_LEXSEM_DO_01` | `LEXSEM_DO_03` | **Vorhanden** |
| `Q_PRAG_IDIOM_01` | `PRAG_IDIOM_02` | **Vorhanden** |
| `Q_TEXT_PUNC_01` | `TEXT_PUNC_02` | **Vorhanden** |

* **Ergebnis**: Alle 20 `error_id`-Verweise der Diagnoseaufgaben existieren im Fehlerkatalog.

---

### 2.2 Konsistenz der Übungstemplates
Alle in `exercise_templates.json` unter `linked_error_ids` eingetragenen Fehlercodes wurden mit `errors.json` abgeglichen.

| Template-ID | Verknüpfte `error_id` | Status in `errors.json` |
| :--- | :--- | :--- |
| `T_ORTH_UML_01` | `ORTH_UML_01` | **Vorhanden** |
| `T_ORTH_KAP_02` | `ORTH_KAP_03` | **Vorhanden** |
| `T_PHON_EPEN_01` | `PHON_EPEN_01` | **Vorhanden** |
| `T_PHON_AUSL_02` | `PHON_AUSL_02` | **Vorhanden** |
| `T_MOR_PLUR_01` | `MOR_PLUR_01` | **Vorhanden** |
| `T_MOR_PREF_02` | `MOR_PREF_03` | **Vorhanden** |
| `T_SYN_INV_01` | `SYN_INV_01` | **Vorhanden** |
| `T_SYN_NS_02` | `SYN_NS_02` | **Vorhanden** |
| `T_MORSYN_PREP_01` | `MORSYN_PREP_01` | **Vorhanden** |
| `T_MORSYN_CASE_02` | `MORSYN_CASE_02` | **Vorhanden** |
| `T_LEXSEM_DRINK_01` | `LEXSEM_DRINK_01` | **Vorhanden** |
| `T_LEXSEM_GO_02` | `LEXSEM_GO_02` | **Vorhanden** |
| `T_PRAG_IDIOM_01` | `PRAG_IDIOM_02` | **Vorhanden** |
| `T_PRAG_RESP_02` | `PRAG_RESP_03` | **Vorhanden** |
| `T_TEXT_PUNC_01` | `TEXT_PUNC_02` | **Vorhanden** |
| `T_TEXT_PASS_02` | `TEXT_PASS_03` | **Vorhanden** |

* **Ergebnis**: Alle 16 Templates verweisen auf tatsächlich im Katalog existierende Fehlercodes.

---

## 3. Validierungsfazit

Die JSON-Dateien entsprechen exakt den typisierten Strukturen aus `datenmodell.md`. Die Querverweise zwischen Diagnose, Fehlerkatalog und Übungsmotor sind zu **100 % konsistent** und fehlerfrei.
