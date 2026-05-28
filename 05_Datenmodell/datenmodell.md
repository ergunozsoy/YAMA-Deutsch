# Datenmodelle für YAMA Deutsch

Dieses Dokument enthält die TypeScript-Definitionen für das Datenmodell von YAMA Deutsch. Die Modelle sind mit JSDoc-Kommentaren versehen und bilden sowohl die **Persönliche Analyse** als auch den **Anonymen Übungsmodus** vollständig ab.

---

## 1. Nutzerverwaltung & Profile

```typescript
/**
 * Haupt-Nutzer-Entität. Bildet sowohl registrierte als auch
 * temporäre (anonyme) Sitzungen ab.
 */
export interface User {
  /** Eindeutige ID (UUID) */
  id: string;
  /** Erstellungszeitpunkt des Nutzers/Sitzung */
  createdAt: Date;
  /** Letzter Aktualisierungszeitpunkt */
  updatedAt: Date;
  /** Flag zur Unterscheidung des Anmeldemodus (Modus A vs. Modus B) */
  isAnonymous: boolean;
  /** E-Mail-Adresse (nur bei registrierten Nutzern vorhanden) */
  email?: string;
  /** Passwort-Hash (nur bei registrierten Nutzern vorhanden) */
  passwordHash?: string;
  /** Verweis auf das detaillierte Profil des Nutzers */
  profile: UserProfile;
}

/**
 * Erweitertes Nutzerprofil mit demografischen Merkmalen
 * zur feineren Interferenz-Diagnostik.
 */
export interface UserProfile {
  /** Zugeordnete User-ID */
  userId: string;
  /** Alter des Nutzers (für zielgruppengerechte Übungen ab 12/14 J.) */
  age?: number;
  /** Aktuelles Deutsch-Niveau nach GER (z. B. 'B1', 'B2', 'C1') */
  germanLevel: 'B1' | 'B2' | 'C1' | 'C2';
  /** Erstsprache (L1) - standardmäßig 'tr' */
  nativeLanguage: string;
  /** Weitere gesprochene Sprachen (z. B. 'en', 'fr') zur Identifikation von L3-Interferenzen */
  otherLanguages?: string[];
  /** Aggregiertes Fehlerprofil des Nutzers */
  errorProfile?: UserErrorProfile;
}
```

---

## 2. Fehlerkatalog & Quellennachweis

```typescript
/**
 * Repräsentiert eine wissenschaftliche Quelle aus der Literaturmatrix.
 */
export interface ErrorSource {
  /** Kurz-ID (z. B. 'Buchberger_2011', 'Balcı_2009') */
  id: string;
  /** Vollständige Zitation */
  citation: string;
  /** Agenturbereich / Linguistischer Bereich (z. B. 'Graphemik', 'Kontrastive Grammatik') */
  domain: string;
  /** URL oder Bibliotheks-Referenz falls verfügbar */
  referenceUrl?: string;
}

/**
 * Definiert einen konkreten Interferenzfehler-Typus aus dem Fehlerkatalog.
 */
export interface ErrorItem {
  /** Eindeutiger Fehlercode (z. B. 'SYN_INV_01', 'MORSYN_CASE_02') */
  error_id: string;
  /** Fehlerkategorie/Hauptbereich */
  category: 'ORTH' | 'PHON' | 'MOR' | 'SYN' | 'MORSYN' | 'LEXSEM' | 'PRAG' | 'TEXT';
  /** Aussagekräftiger Titel */
  title: string;
  /** Typisches fehlerhaftes Beispiel aus der Lernersprache */
  typical_wrong_example: string;
  /** Grammatikalisch korrekte deutsche Entsprechung */
  correct_example: string;
  /** Vermutete Ursache (z. B. 'L1-Kasussuffix-Transfer') */
  probable_source: string;
  /** Linguistische Herleitung der Interferenz */
  linguistic_explanation: string;
  /** Benutzerfreundliche Erklärung zur Anzeige im Feedback-System */
  short_user_feedback: {
    de: string; // Erklärung auf Deutsch
    tr: string; // Erklärung auf Türkisch (L1-Kontrast)
  };
  /** Liste empfohlener Übungstypen für dieses Problem */
  exercise_types: ('correction' | 'multiple_choice' | 'sentence_order' | 'translation_tr_de' | 'gap_fill' | 'short_writing')[];
  /** Wissenschaftliche Belege (Namen aus der Literaturmatrix) */
  source_basis: string[];
}

/**
 * Der globale Pool aller im System erfassten Interferenzfehler.
 */
export interface CommonErrorPool {
  /** Letztes Aktualisierungsdatum des Katalogs */
  lastUpdated: Date;
  /** Map von error_id auf das konkrete Fehler-Item */
  errors: Record<string, ErrorItem>;
  /** Liste aller registrierten Quellen */
  sources: ErrorSource[];
}
```

---

## 3. Diagnostik und Tests

```typescript
/**
 * Eine Testaufgabe innerhalb des Diagnose-Tests.
 */
export interface DiagnosticQuestion {
  /** Eindeutige ID (z. B. 'Q_SYN_INV_01') */
  question_id: string;
  /** Referenz auf den zu testenden Fehler (aus ErrorItem) */
  error_id: string;
  /** Aufgabentyp */
  task_type: 'correction' | 'multiple_choice' | 'sentence_order' | 'translation_tr_de' | 'gap_fill' | 'short_writing';
  /** Aufgabenstellung (HTML oder Markdown erlaubt) */
  prompt: string;
  /** Liste von Auswahloptionen (nur bei 'multiple_choice' vorhanden) */
  options?: string[];
  /** Die korrekte Lösung */
  expected_answer: string;
  /** Typische fehlerhafte Antwortmuster (zum Abgleich bei Freitexten) */
  typical_wrong_patterns: string[];
  /** Direktes kontrastives Feedback bei falscher Beantwortung */
  feedback: {
    de: string;
    tr: string;
  };
  /** Wissenschaftliche Belege für dieses sprachliche Phänomen */
  source_basis: string[];
  /** Empfohlener Übungsklassen-Pfad */
  exercise_recommendation: string;
}

/**
 * Dokumentiert einen Durchlauf des Diagnose-Tests (Modus A).
 */
export interface DiagnosticAttempt {
  /** Eindeutige Test-ID */
  id: string;
  /** Zuordnung zum Nutzer */
  userId: string;
  /** Startzeitpunkt */
  startedAt: Date;
  /** Endzeitpunkt (falls beendet) */
  completedAt?: Date;
  /** Detailergebnisse pro Frage */
  answers: {
    question_id: string;
    /** Vom Nutzer eingegebener/ausgewählter Text */
    givenAnswer: string;
    /** Bewertungsflag */
    isCorrect: boolean;
    /** Falls falsch, die zugeordnete Fehler-ID (zur Profilierung) */
    triggered_error_id?: string;
  }[];
  /** Gesamtergebnis in Prozent (0 - 100) */
  score: number;
}
```

---

## 4. Nutzer-Fehlerprofil & Übungsempfehlungen

```typescript
/**
 * Das aus Diagnostik und Satzprüfung aggregierte Fehlerprofil des Nutzers.
 */
export interface UserErrorProfile {
  /** Zuordnung zum Nutzer */
  userId: string;
  /** Letztes Berechnungsdatum */
  lastUpdated: Date;
  /**
   * Gewichtete Fehler-Scores pro ID (0 = kein Fehler, 100 = maximale Interferenz).
   * Key ist die `error_id` (z. B. 'SYN_INV_01').
   */
  errorScores: Record<string, number>;
  /**
   * Berechnete Erwerbsstufe der Satzstruktur nach Grießhaber (Stufen 0 bis 4/5).
   * Ermittelt aus freien Texten und Inversions-/Nebensatzaufgaben.
   */
  griesshaberSyntaxLevel: number;
  /** Dynamisch generierte Empfehlungen für Übungen */
  recommendations: ExerciseRecommendation[];
}

/**
 * Verknüpft das Fehlerprofil mit konkreten Trainingsmodulen.
 */
export interface ExerciseRecommendation {
  /** Eindeutige ID der Empfehlung */
  id: string;
  /** Ziel-Fehler-ID */
  error_id: string;
  /** Priorität (1 = sehr hoch, 5 = niedrig) basierend auf der Fehlerhäufigkeit */
  priority: number;
  /** Name des empfohlenen Moduls */
  moduleName: string;
  /** Begründungstext für den Nutzer (z. B. "Du hast häufig Probleme mit Nebensätzen...") */
  reason: string;
}

/**
 * Ein konkretes Übungs-Item im Übungsmotor.
 */
export interface ExerciseItem {
  /** Eindeutige Übungs-ID */
  id: string;
  /** Zugeordnete Fehler-ID */
  error_id: string;
  /** Aufgabentyp */
  task_type: 'correction' | 'multiple_choice' | 'sentence_order' | 'translation_tr_de' | 'gap_fill' | 'short_writing';
  /** Aufgabenstellung */
  prompt: string;
  /** Optionen (für Multiple Choice) */
  options?: string[];
  /** Musterlösung */
  expected_answer: string;
  /** Hilfestellung / Grammatiktipp */
  hint?: string;
}
```

---

## 5. Anonymer Modus & Satzprüfer

```typescript
/**
 * Sitzungsdaten für den datensparsamen anonymen Übungsmodus (Modus B).
 * Wird temporär im LocalStorage des Browsers gehalten.
 */
export interface AnonymousPracticeSession {
  /** Temporäre Session-ID */
  sessionId: string;
  /** Startzeitpunkt der Session */
  startedAt: Date;
  /** Anzahl der in dieser Sitzung absolvierten Übungen */
  exercisesCompletedCount: number;
  /** Fehler-IDs, die in dieser Session besonders häufig auftraten */
  frequentErrorIds: string[];
}

/**
 * Übergabe-Modell für den Satzprüfer (Playground).
 */
export interface SentenceCheckInput {
  /** Der vom Nutzer eingegebene Text (einzelner Satz oder kurzer Absatz) */
  inputText: string;
  /** Optionale Sprach-ID des Feedbacks ('de' oder 'tr') */
  preferredLanguage?: 'de' | 'tr';
}

/**
 * Rückgabewert der Satzprüfung. Wird von der LLM-API / dem Parser erzeugt.
 */
export interface SentenceCheckResult {
  /** Originaler Eingabetext */
  originalText: string;
  /** Komplett korrigierte Version des Textes */
  correctedText: string;
  /** Liste der gefundenen Interferenzfehler */
  errorsDetected: {
    /** Fehler-ID aus dem Katalog (falls eindeutig zuordenbar, z. B. 'MORSYN_PREP_01') */
    error_id?: string;
    /** Der fehlerhafte Textabschnitt */
    errorSegment: string;
    /** Die korrigierte Version dieses Abschnitts */
    correctedSegment: string;
    /** Erklärung für den Nutzer (kontrastiv) */
    explanation: string;
  }[];
}
```

---

## 6. Lernfortschritt & Berichte

```typescript
/**
 * Dokumentation der Leistungsentwicklung eines registrierten Nutzers über Zeit.
 * Ermöglicht den akademischen Export (PDF/CSV).
 */
export interface ProgressReport {
  /** Eindeutige Report-ID */
  id: string;
  /** Zuordnung zum Nutzer */
  userId: string;
  /** Zeitraum von */
  startDate: Date;
  /** Zeitraum bis */
  endDate: Date;
  /** Veränderung der Fehler-Scores im Vergleich zum Zeitraumstart */
  scoreDevelopment: {
    error_id: string;
    startScore: number;
    currentScore: number;
    difference: number; // Negativer Wert = Verbesserung
  }[];
  /** Aufstieg in den Grießhaber-Syntaxstufen (z. B. von Stufe 2 auf Stufe 3) */
  syntaxLevelDevelopment: {
    initialLevel: number;
    currentLevel: number;
  };
  /** Anzahl der gelösten Aufgaben im Zeitraum */
  completedExercisesCount: number;
}
```
