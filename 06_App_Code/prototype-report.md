# YAMA Deutsch - Prototyp-Bericht

Dieses Verzeichnis enthält einen funktionsfähigen lokalen Web-Prototyp für **YAMA Deutsch** auf Basis von Vite, React und TypeScript.

---

## 1. Übersicht der Funktionen

Der Prototyp implementiert alle Kernkonzepte der DaZ/DaF-Interferenzdiagnose:

1. **Startseite**:
   * Auswahl zwischen der **Persönlichen Analyse** (Modus A) und dem **Anonymen Übungsmodus** (Modus B).
2. **Persönliche Analyse**:
   * Einbindung des 20-Fragen-Tests aus `diagnostic_tasks.json`.
   * Dynamische Eingabemasken (Multiple Choice, Lückentexte, Freitext).
   * Direktes kontrastives Feedback bei Falschantworten.
   * **Dashboard nach Testende**:
     * Visualisierung der Prozentquote richtiger Antworten.
     * Identifikation der häufigsten Fehler-IDs.
     * Ausgabe der Top 3 empfohlenen Übungsbereiche und Verlinkung zum passenden Fördermodul.
3. **Anonymer Übungsmodus**:
   * Schneller Zugriff auf die 8 Hauptkategorien (`ORTH` bis `TEXT`) ohne Registrierung.
   * Anzeige der passenden Übungstemplates aus `exercise_templates.json` zur Vermittlung von Sprachbewusstsein.
4. **Lokaler Satzprüfer (Playground)**:
   * Freitext-Eingabefeld.
   * Analysiert den eingegebenen Satz und sucht nach den 24 typischen Transferfehlern aus `errors.json` (z. B. *„Ich habe Angst von dir“*, *„Ich trinke Suppe“*, *„Heute ich gehe“*).
   * Zeigt bei Treffern kontrastive grammatikalische Erklärungen auf Deutsch und Türkisch sowie die korrekte Variante.

---

## 2. Technische Startanleitung

Um den Prototyp lokal auszuführen, befolge diese Schritte:

### Voraussetzungen
Stelle sicher, dass **Node.js** (inklusive `npm`) auf deinem System installiert ist.

### Installation
Öffne das Terminal im Verzeichnis `06_App_Code` und installiere die benötigten Pakete:

```bash
npm install
```

### Server starten
Starte den lokalen Vite-Entwicklungsserver mit:

```bash
npm run dev
```

Der Server ist anschließend standardmäßig unter `http://localhost:5173` erreichbar.
