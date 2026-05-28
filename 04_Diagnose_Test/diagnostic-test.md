# Diagnostic-Test: Aufgabenkatalog (20 Aufgaben)

Dieser Katalog enthält genau 20 diagnostische Testaufgaben. Jede Aufgabe zielt auf eine spezifische Interferenzkategorie ab, die im `fehlerkatalog.md` beschrieben ist. Die Testergebnisse dienen zur Generierung des individuellen Fehlerprofils und zur Zuweisung des Nutzers auf eine Erwerbsstufe.

---

## 1. Diagnose-Testaufgaben

### Aufgabe 1: Syntax - Inversion
* **question_id**: `Q_SYN_INV_01`
* **error_id**: `SYN_INV_01`
* **task_type**: `sentence_order`
* **prompt**: Bringe die Satzglieder in die richtige Reihenfolge: `[ich / gehe / heute / nicht / in die Schule]`. Beginne den Satz mit `Heute`.
* **expected_answer**: *Heute gehe ich nicht in die Schule.*
* **typical_wrong_patterns**:
  * *Heute ich gehe nicht in die Schule.*
* **feedback**: Im Deutschen gilt die Verb-Zweit-Regel (V2). Steht ein anderes Satzglied im Vorfeld (hier das Zeitadverb „Heute“), muss das konjugierte Verb direkt danach auf Position 2 folgen. Das Subjekt rückt auf Position 3.
* **source_basis**: Wilhelm Grießhaber
* **exercise_recommendation**: *Syntax-Training: Inversion meistern*

### Aufgabe 2: Syntax - Nebensatzstellung
* **question_id**: `Q_SYN_NS_01`
* **error_id**: `SYN_NS_02`
* **task_type**: `multiple_choice`
* **prompt**: Wähle die grammatikalisch korrekte Fortführung des Satzes aus: *„Ich bleibe heute zu Hause, ...“*
  * A) ... weil ich bin krank.
  * B) ... weil bin ich krank.
  * C) ... weil ich krank bin.
* **expected_answer**: C
* **typical_wrong_patterns**:
  * A
  * B
* **feedback**: Die Konjunktion „weil“ leitet einen Nebensatz ein. Im deutschen Nebensatz muss das konjugierte Verb (hier „bin“) ganz am Ende stehen.
* **source_basis**: Wilhelm Grießhaber
* **exercise_recommendation**: *Nebensätze und Verb-End-Stellung*

### Aufgabe 3: Syntax - Satzklammer (Perfekt)
* **question_id**: `Q_SYN_VKB_01`
* **error_id**: `SYN_VKB_03`
* **task_type**: `correction`
* **prompt**: Korrigiere den Satz: *„Ich habe gestern gekauft ein neues Auto.“*
* **expected_answer**: *Ich habe gestern ein neues Auto gekauft.*
* **typical_wrong_patterns**:
  * *Ich habe gestern gekauft ein neues Auto.*
* **feedback**: Das Perfekt bildet im Hauptsatz eine „Satzklammer“. Das Hilfsverb („habe“) steht auf Position 2, während das Partizip II („gekauft“) am Satzende stehen muss. Das Objekt steht dazwischen.
* **source_basis**: Wilhelm Grießhaber
* **exercise_recommendation**: *Die deutsche Satzklammer bei zusammengesetzten Zeiten*

### Aufgabe 4: Orthographie - Umlautfehler
* **question_id**: `Q_ORTH_UML_01`
* **error_id**: `ORTH_UML_01`
* **task_type**: `gap_fill`
* **prompt**: Ergänze den Buchstaben (mit oder ohne Umlautpunkte): *„Das Wetter heute ist wirklich sch____n.“* (Gemeint ist: *hübsch / angenehm*)
* **expected_answer**: *ö*
* **typical_wrong_patterns**:
  * *o*
* **feedback**: Umlautpunkte verändern im Deutschen die Bedeutung grundlegend. Während „schon“ ein Adverb ist (z. B. *ich bin schon da*), ist „schön“ ein Adjektiv (*das Wetter ist schön*).
* **source_basis**: Sarah Buchberger, Tahir Balcı
* **exercise_recommendation**: *Umlaute gezielt unterscheiden und schreiben*

### Aufgabe 5: Orthographie - Dehnungs-h
* **question_id**: `Q_ORTH_DEHN_01`
* **error_id**: `ORTH_DEHN_02`
* **task_type**: `gap_fill`
* **prompt**: Ergänze das fehlende Wort orthographisch korrekt: *„Wo ______ du?“* (Verb: *wohnen*)
* **expected_answer**: *wohnst*
* **typical_wrong_patterns**:
  * *wonst*
* **feedback**: Viele deutsche Wörter besitzen ein stummes Dehnungs-h vor dem Konsonanten, das den Vokal lang spricht. Dieses h wird oft weggelassen, da das Türkische Vokallänge orthographisch nicht markiert.
* **source_basis**: Sarah Buchberger
* **exercise_recommendation**: *Dehnung und Schärfung im Deutschen*

### Aufgabe 6: Orthographie - Großschreibung
* **question_id**: `Q_ORTH_KAP_01`
* **error_id**: `ORTH_KAP_03`
* **task_type**: `correction`
* **prompt**: Korrigiere den Satz orthographisch: *„Wir kaufen einen neuen tisch.“*
* **expected_answer**: *Wir kaufen einen neuen Tisch.*
* **typical_wrong_patterns**:
  * *tisch*
* **feedback**: Im Deutschen werden alle Substantive (Nomen) großgeschrieben. Im Türkischen werden sie kleingeschrieben, weshalb du hier besonders aufpassen musst.
* **source_basis**: Sarah Buchberger, Benholz & Lipkowski
* **exercise_recommendation**: *Groß- und Kleinschreibung von Nomen*

### Aufgabe 7: Phonologie - Vokalepenthese
* **question_id**: `Q_PHON_EPEN_01`
* **error_id**: `PHON_EPEN_01`
* **task_type**: `correction`
* **prompt**: Korrigiere das falsch geschriebene Wort im Satz: *„Ich spiele jeden Dienstag Isport.“*
* **expected_answer**: *Sport*
* **typical_wrong_patterns**:
  * *Isport*
* **feedback**: Wörter, die im Deutschen mit „Sp-“ oder „St-“ beginnen, haben keinen Vokal davor. Das Voranstellen eines „I-Lautes“ (wie *Isport* oder *Istation*) ist ein Transfer aus dem Türkischen, da dort anlautende Konsonantencluster vermieden werden.
* **source_basis**: Ayşe Adıyaman
* **exercise_recommendation**: *Konsonantencluster im Anlaut fehlerfrei sprechen und schreiben*

### Aufgabe 8: Phonologie - Auslautverhärtung
* **question_id**: `Q_PHON_AUSL_01`
* **error_id**: `PHON_AUSL_02`
* **task_type**: `multiple_choice`
* **prompt**: Welches Wort ist orthographisch korrekt geschrieben? *„Dieses ______ ist sehr alt.“* (Gemeint ist: *Foto / Illustration*)
  * A) Bilt
  * B) Bild
  * C) Biltz
* **expected_answer**: B
* **typical_wrong_patterns**:
  * A
* **feedback**: Zwar sprechen wir das Wort am Ende mit einem stimmlosen /t/ aus (Auslautverhärtung), geschrieben wird es aber mit „d“, da im Plural das „d“ stimmhaft gesprochen wird (*Bilder*).
* **source_basis**: Ayşe Adıyaman, Sarah Buchberger
* **exercise_recommendation**: *Auslautverhärtung und Verlängerungsprobe*

### Aufgabe 9: Phonologie - H-Ausfall
* **question_id**: `Q_PHON_H_01`
* **error_id**: `PHON_H_03`
* **task_type**: `gap_fill`
* **prompt**: Welches Wort passt? *„Ich ______ heute keine Zeit.“* (Präsens von *haben*)
* **expected_answer**: *habe*
* **typical_wrong_patterns**:
  * *abe*
* **feedback**: Der Buchstabe „H“ am Wortanfang ist im Deutschen ein deutlich artikulierter Hauchlaut. Achte darauf, ihn nicht wegzulassen (nicht *abe* statt *habe* sprechen oder schreiben).
* **source_basis**: Ayşe Adıyaman
* **exercise_recommendation**: *Der Hauchlaut H im Wortanlaut*

### Aufgabe 10: Morphologie - Plural nach Zahlen
* **question_id**: `Q_MOR_PLUR_01`
* **error_id**: `MOR_PLUR_01`
* **task_type**: `gap_fill`
* **prompt**: Bilde die richtige Form des Wortes in Klammern: *„Im Büro arbeiten heute drei ______ (Frau).“*
* **expected_answer**: *Frauen*
* **typical_wrong_patterns**:
  * *Frau*
* **feedback**: Im Deutschen muss nach Zahlen ab zwei immer die Pluralform (Mehrzahl) verwendet werden. Im Türkischen bleibt das Nomen nach Zahlen im Singular (*üç kadın* = drei Frau).
* **source_basis**: Tahir Balcı, Hiclal Aktaş
* **exercise_recommendation**: *Pluralbildung und Kongruenz nach Quantoren*

### Aufgabe 11: Morphologie - Nominalkomposition
* **question_id**: `Q_MOR_COMP_01`
* **error_id**: `MOR_COMP_02`
* **task_type**: `multiple_choice`
* **prompt**: Was ist der natürlichste deutsche Begriff für: *„Die Tür eines Hauses“*?
  * A) Die Tür von dem Haus
  * B) Die Haustür
  * C) Die Haus Tür
* **expected_answer**: B
* **typical_wrong_patterns**:
  * A
  * C
* **feedback**: Das Deutsche bildet sehr gerne zusammengesetzte Nomen (Komposita) wie „Haustür“ als ein einziges Wort. Getrennte Schreibweisen oder Umschreibungen mit „von“ klingen oft unnatürlich.
* **source_basis**: Tahir Balcı
* **exercise_recommendation**: *Wortbildung: Nominalkomposita richtig zusammensetzen*

### Aufgabe 12: Morphologie - Trennbare Verben (Präfixe)
* **question_id**: `Q_MOR_PREF_01`
* **error_id**: `MOR_PREF_03`
* **task_type**: `gap_fill`
* **prompt**: Ergänze den Satz mit dem passenden Verbteil: *„Er ______ die Tür leise ______.“* (Verb: *zumachen*)
* **expected_answer**: *macht / zu*
* **typical_wrong_patterns**:
  * *zumacht / [leer]*
  * *macht / [leer]*
* **feedback**: Bei trennbaren Verben (wie *zumachen*) steht das konjugierte Verb im Hauptsatz auf Position 2, das abtrennbare Präfix (*zu*) wandert ganz ans Ende des Satzes.
* **source_basis**: Tahir Balcı, Hiclal Aktaş
* **exercise_recommendation**: *Präfixe und trennbare Verben im Satz*

### Aufgabe 13: Morphosyntax - Nullpräposition
* **question_id**: `Q_MORSYN_PREP_01`
* **error_id**: `MORSYN_PREP_01`
* **task_type**: `gap_fill`
* **prompt**: Ergänze das fehlende Wort: *„Bitte warte ______ mich am Ausgang.“*
* **expected_answer**: *auf*
* **typical_wrong_patterns**:
  * *[leer]*
  * *für*
* **feedback**: Das deutsche Verb „warten“ verlangt zwingend die Präposition „auf“ mit dem Akkusativ. Im Türkischen wird dies rein über das Suffix ausgedrückt (*beni bekle* = mich warte), weshalb Lerner oft die Präposition weglassen.
* **source_basis**: Hiclal Aktaş
* **exercise_recommendation**: *Präpositionalobjekte und feste Rektionen*

### Aufgabe 14: Morphosyntax - Kasus-Transfer
* **question_id**: `Q_MORSYN_CASE_01`
* **error_id**: `MORSYN_CASE_02`
* **task_type**: `multiple_choice`
* **prompt**: Welcher Satz ist korrekt?
  * A) Ich habe Angst von Hunden.
  * B) Ich habe Angst vor Hunden.
  * C) Ich habe Angst an Hunden.
* **expected_answer**: B
* **typical_wrong_patterns**:
  * A
* **feedback**: Das türkische Verb *korkmak* fordert das Suffix *-den* (Ablativ, dt. *von*). Im Deutschen verlangt der Ausdruck „Angst haben“ jedoch die Präposition „vor“ + Dativ.
* **source_basis**: Hiclal Aktaş
* **exercise_recommendation**: *Fehlerfalle Ablativ-Transfer: von vs. vor/aus*

### Aufgabe 15: Morphosyntax - Subjekt-Verb-Kongruenz
* **question_id**: `Q_MORSYN_CONG_01`
* **error_id**: `MORSYN_CONG_03`
* **task_type**: `gap_fill`
* **prompt**: Ergänze das Verb im Präsens: *„Viele Leute ______ (kommen) heute zu Besuch.“*
* **expected_answer**: *kommen*
* **typical_wrong_patterns**:
  * *kommt*
* **feedback**: Im Deutschen ist „Leute“ ein reines Pluralwort. Das Verb muss daher ebenfalls im Plural stehen („kommen“). Im Türkischen kann bei Pluralnomen das Verb im Singular stehen (*insanlar geliyor*).
* **source_basis**: Hiclal Aktaş
* **exercise_recommendation**: *Subjekt-Verb-Kongruenz bei Kollektiva*

### Aufgabe 16: Lexik/Semantik - Suppe essen
* **question_id**: `Q_LEXSEM_DRINK_01`
* **error_id**: `LEXSEM_DRINK_01`
* **task_type**: `multiple_choice`
* **prompt**: Was sagt man im Restaurant?
  * A) Ich möchte eine Gemüsesuppe trinken.
  * B) Ich möchte eine Gemüsesuppe essen.
  * C) Ich möchte eine Gemüsesuppe machen.
* **expected_answer**: B
* **typical_wrong_patterns**:
  * A
* **feedback**: Im Deutschen nutzt man für Suppen das Verb „essen“, da sie eine Mahlzeit sind, die mit dem Löffel verzehrt wird. „Trinken“ bezieht sich nur auf Getränke aus Gläsern oder Tassen.
* **source_basis**: Tahir Balcı
* **exercise_recommendation**: *Lexikalische Kollokationen: Essen vs. Trinken*

### Aufgabe 17: Lexik/Semantik - Gehen vs. Fliegen
* **question_id**: `Q_LEXSEM_GO_01`
* **error_id**: `LEXSEM_GO_02`
* **task_type**: `gap_fill`
* **prompt**: Welches Bewegungsverb passt am besten? *„Wir ______ nächsten Sommer in die USA.“* (Reise mit dem Flugzeug)
* **expected_answer**: *fliegen*
* **typical_wrong_patterns**:
  * *gehen*
* **feedback**: Das türkische *gitmek* drückt jede Fortbewegung aus. Im Deutschen müssen wir präzise sein: Benutzt man das Flugzeug, sagt man „fliegen“, bei Schiff/Auto/Zug „fahren“, und „gehen“ nutzt man nur für Wege zu Fuß.
* **source_basis**: Tahir Balcı
* **exercise_recommendation**: *Spezifische Bewegungsverben im Deutschen*

### Aufgabe 18: Lexik/Semantik - Machen-Ersatz
* **question_id**: `Q_LEXSEM_DO_01`
* **error_id**: `LEXSEM_DO_03`
* **task_type**: `correction`
* **prompt**: Ersetze das Verb „machen“ durch ein passenderes, spezifischeres Verb: *„Ich möchte heute in der Kirche ein Gebet machen.“*
* **expected_answer**: *beten*
* **typical_wrong_patterns**:
  * *machen*
* **feedback**: Türkisch nutzt *yapmak* sehr häufig, um Nomen zu verbalisieren. Im Deutschen wirkt das oft plump. Verwende statt „ein Gebet machen“ lieber direkt das Verb „beten“ oder „ein Gebet sprechen“.
* **source_basis**: Tahir Balcı
* **exercise_recommendation**: *Machen-Ersatz: Treffende Verben wählen*

### Aufgabe 19: Pragmatik - Idiomatische Formeln
* **question_id**: `Q_PRAG_IDIOM_01`
* **error_id**: `PRAG_IDIOM_02`
* **task_type**: `translation_tr_de`
* **prompt**: Wie bedankt man sich im Deutschen höflich bei jemandem, der für einen gekocht hat? (Türkisches Äquivalent: *„Elinize sağlık“*)
* **expected_answer**: *Vielen Dank für das leckere Essen!*
* **typical_wrong_patterns**:
  * *Gesundheit für deine Hände.*
* **feedback**: Kulturelle Höflichkeitsformeln lassen sich fast nie wörtlich übersetzen. Der Ausdruck „Eline sağlık“ hat kein direktes deutsches Äquivalent. Drücke stattdessen einfach deinen Dank für das Essen aus.
* **source_basis**: Benholz & Lipkowski
* **exercise_recommendation**: *Pragmatik und Kulturtransfer im Alltag*

### Aufgabe 20: Textstruktur - Komma vor Nebensätzen
* **question_id**: `Q_TEXT_PUNC_01`
* **error_id**: `TEXT_PUNC_02`
* **task_type**: `correction`
* **prompt**: Setze das Komma an die richtige Stelle: *„Ich weiß nicht ob er mich verstanden hat.“*
* **expected_answer**: *Ich weiß nicht, ob er mich verstanden hat.*
* **typical_wrong_patterns**:
  * *Ich weiß nicht ob er mich verstanden hat.*
* **feedback**: Im Deutschen ist das Komma vor Nebensätzen (hier eingeleitet mit der Konjunktion „ob“) Pflicht. Im Türkischen werden solche Sätze oft ohne Komma konstruiert.
* **source_basis**: Sarah Buchberger, Benholz & Lipkowski
* **exercise_recommendation**: *Kommasetzung bei Nebensätzen*
