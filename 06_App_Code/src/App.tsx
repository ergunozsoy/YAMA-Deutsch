import { useState } from 'react';
import { ErrorItem, DiagnosticTask, ExerciseTemplate } from './types';

// JSON-Daten importieren
import errorsData from '../data/errors.json';
import diagnosticData from '../data/diagnostic_tasks.json';
import templatesData from '../data/exercise_templates.json';

const errors = errorsData as ErrorItem[];
const diagnosticTasks = diagnosticData as DiagnosticTask[];
const exerciseTemplates = templatesData as ExerciseTemplate[];

function normalizeAnswer(input: string): string {
  if (!input) return '';
  let normalized = input.trim().toLowerCase();
  normalized = normalized.replace(/[„“]/g, '');
  normalized = normalized.replace(/['"]/g, '');
  normalized = normalized.replace(/[.,;:]+$/, '');
  normalized = normalized.replace(/\s+/g, ' ');
  return normalized.trim();
}

export default function App() {
  const [view, setView] = useState<'home' | 'diagnostic' | 'anonymous'>('home');

  // Diagnostic Test State
  const [currentTaskIdx, setCurrentTaskIdx] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [incorrectErrorIds, setIncorrectErrorIds] = useState<string[]>([]);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  // Anonymous Mode State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sentenceInput, setSentenceInput] = useState<string>('');
  const [sentenceCheckResult, setSentenceCheckResult] = useState<{
    match: boolean;
    error_id?: string;
    wrongExample?: string;
    correctExample?: string;
    feedbackDe?: string;
    feedbackTr?: string;
    title?: string;
  } | null>(null);

  // Reset Diagnostic State
  const startDiagnostic = () => {
    setCurrentTaskIdx(0);
    setCurrentAnswer('');
    setShowFeedback(false);
    setIncorrectErrorIds([]);
    setTestCompleted(false);
    setView('diagnostic');
  };

  // Check if current answer is correct
  const isCurrentAnswerCorrect = () => {
    const currentTask = diagnosticTasks[currentTaskIdx];
    const normUser = normalizeAnswer(currentAnswer);
    const normExpected = normalizeAnswer(currentTask.expected_answer);
    
    if (normUser === normExpected) return true;
    
    if (currentTask.accepted_answers) {
      return currentTask.accepted_answers.some(
        ans => normalizeAnswer(ans) === normUser
      );
    }
    
    return false;
  };

  // Handle Diagnostic Answer Submission
  const submitDiagnosticAnswer = () => {
    const currentTask = diagnosticTasks[currentTaskIdx];
    
    if (!isCurrentAnswerCorrect()) {
      setIncorrectErrorIds(prev => [...prev, currentTask.error_id]);
    }

    setShowFeedback(true);
  };

  // Next Diagnostic Step
  const nextDiagnosticTask = () => {
    setShowFeedback(false);
    setCurrentAnswer('');
    if (currentTaskIdx + 1 < diagnosticTasks.length) {
      setCurrentTaskIdx(prev => prev + 1);
    } else {
      setTestCompleted(true);
    }
  };

  // Sentence Checker Logic (grob nach typischen falschen Beispielen suchen)
  const handleSentenceCheck = () => {
    const text = sentenceInput.trim().toLowerCase();
    if (!text) return;

    const cleanInput = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();

    // Spezifische lokale Korrekturregeln definieren
    let specificErrorId: string | null = null;
    let specificCorrection: string | null = null;

    if (cleanInput === "heute ich gehe zur schule") {
      specificErrorId = "SYN_INV_01";
      specificCorrection = "Heute gehe ich zur Schule.";
    } else if (cleanInput === "ich warte dich") {
      specificErrorId = "MORSYN_PREP_01";
      specificCorrection = "Ich warte auf dich.";
    } else if (cleanInput === "ich trinke suppe") {
      specificErrorId = "LEXSEM_DRINK_01";
      specificCorrection = "Ich esse Suppe.";
    } else if (cleanInput === "ich habe angst von hunden") {
      specificErrorId = "MORSYN_CASE_02";
      specificCorrection = "Ich habe Angst vor Hunden.";
    } else if (cleanInput === "ich habe angst von dem hund") {
      specificErrorId = "MORSYN_CASE_02";
      specificCorrection = "Ich habe Angst vor dem Hund.";
    }

    // Pattern Matching für typische Interferenzfehler
    let foundError: ErrorItem | undefined = undefined;

    if (specificErrorId) {
      foundError = errors.find(err => err.error_id === specificErrorId);
    }

    // Wenn keine spezifische Regel gegriffen hat, allgemeines Matching durchführen
    if (!foundError) {
      for (const err of errors) {
        const wrongText = err.typical_wrong_example.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
        const cleanInputForGeneral = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

        // Versuche exakte Wortgruppen oder Substrings zu matchen
        if (
          cleanInputForGeneral.includes(wrongText) ||
          (err.error_id === 'MORSYN_CASE_02' && cleanInputForGeneral.includes("angst von")) ||
          (err.error_id === 'LEXSEM_DRINK_01' && (cleanInputForGeneral.includes("suppe trinken") || cleanInputForGeneral.includes("trinke suppe") || cleanInputForGeneral.includes("trinke eine suppe"))) ||
          (err.error_id === 'SYN_INV_01' && cleanInputForGeneral.startsWith("heute ich gehe")) ||
          (err.error_id === 'PHON_EPEN_01' && cleanInputForGeneral.includes("isport")) ||
          (err.error_id === 'MOR_PLUR_01' && cleanInputForGeneral.includes("drei bruder")) ||
          (err.error_id === 'MORSYN_PREP_01' && cleanInputForGeneral.includes("warte dich")) ||
          (err.error_id === 'LEXSEM_GO_02' && cleanInputForGeneral.includes("nach türkei") && (cleanInputForGeneral.includes("gehe") || cleanInputForGeneral.includes("gehen"))) ||
          (err.error_id === 'SYN_NS_02' && cleanInputForGeneral.includes("weil ich bin")) ||
          (err.error_id === 'ORTH_UML_01' && cleanInputForGeneral.includes("sehr schon"))
        ) {
          foundError = err;
          break;
        }
      }
    }

    if (foundError) {
      setSentenceCheckResult({
        match: true,
        error_id: foundError.error_id,
        title: foundError.title,
        wrongExample: foundError.typical_wrong_example,
        correctExample: specificCorrection || foundError.correct_example,
        feedbackDe: foundError.short_user_feedback.de,
        feedbackTr: foundError.short_user_feedback.tr
      });
    } else {
      setSentenceCheckResult({
        match: false
      });
    }
  };

  // Berechne aggregierte Testergebnisse
  const getAggregatedResults = () => {
    const totalQuestions = diagnosticTasks.length;
    const incorrectCount = incorrectErrorIds.length;
    const correctCount = totalQuestions - incorrectCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Zähle Vorkommen der Fehler-IDs
    const counts: Record<string, number> = {};
    incorrectErrorIds.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });

    // Finde Top Fehler
    const sortedErrors = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    // Generiere Empfehlungen basierend auf den falschen Antworten
    const uniqueIncorrectErrorIds = Array.from(new Set(incorrectErrorIds));
    const recommendations = uniqueIncorrectErrorIds.map(id => {
      const associatedTask = diagnosticTasks.find(t => t.error_id === id);
      const associatedError = errors.find(e => e.error_id === id);
      return {
        error_id: id,
        title: associatedError?.title || "Interferenzfehler",
        module: associatedTask?.exercise_recommendation || "Übungsmodul",
        explanation: associatedError?.short_user_feedback.de || ""
      };
    }).slice(0, 3); // Maximal 3 Empfehlungen anzeigen

    return {
      percentage,
      correctCount,
      totalQuestions,
      sortedErrors,
      recommendations
    };
  };

  const results = testCompleted ? getAggregatedResults() : null;

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo" onClick={() => setView('home')}>YAMA Deutsch</div>
          {view !== 'home' && (
            <button className="nav-home-btn" onClick={() => setView('home')}>Startseite</button>
          )}
        </div>
      </header>

      <main className="container">
        {view === 'home' && (
          <div className="hero">
            <h1>YAMA Deutsch</h1>
            <p>
              Wissenschaftlich fundierte Interferenzdiagnose und modulare Übungen 
              für türkischsprachige Deutschlernende ab B1.
            </p>
            <div className="mode-grid">
              <div className="card" onClick={startDiagnostic}>
                <div>
                  <h2>Persönliche Analyse</h2>
                  <p>
                    Absolviere den wissenschaftlichen 20-Fragen-Einstiegstest, um typische
                    Fehlübertragungen der türkischen Muttersprache offenzulegen und dein
                    persönliches Fehlerprofil zu erstellen.
                  </p>
                </div>
                <button className="btn btn-primary">Analyse starten</button>
              </div>

              <div className="card" onClick={() => { setView('anonymous'); setActiveCategory('ORTH'); }}>
                <div>
                  <h2>Anonymes Üben</h2>
                  <p>
                    Übe hürdenfrei und datensparsam. Wähle eine der acht Hauptkategorien
                    aus, betrachte kontrastive Übungsmuster oder teste deine eigenen Sätze
                    im lokalen Satzprüfer.
                  </p>
                </div>
                <button className="btn btn-secondary">Freies Üben starten</button>
              </div>
            </div>
          </div>
        )}

        {view === 'diagnostic' && !testCompleted && (
          <div className="section-card">
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${((currentTaskIdx) / diagnosticTasks.length) * 100}%` }}
              ></div>
            </div>

            <div className="task-header">
              <span>Kategorie: {diagnosticTasks[currentTaskIdx].error_id.split('_')[0]}</span>
              <span>Aufgabe {currentTaskIdx + 1} von {diagnosticTasks.length}</span>
            </div>

            <h3 className="task-prompt">{diagnosticTasks[currentTaskIdx].prompt}</h3>

            {/* Render Input Forms based on task_type */}
            {diagnosticTasks[currentTaskIdx].task_type === 'multiple_choice' ? (
              <div className="mc-grid">
                {(diagnosticTasks[currentTaskIdx].options || [
                  { key: 'A', text: 'Option A' },
                  { key: 'B', text: 'Option B' },
                  { key: 'C', text: 'Option C' }
                ]).map((opt) => (
                  <button
                    key={opt.key}
                    disabled={showFeedback}
                    className={`mc-option ${currentAnswer === opt.key ? 'selected' : ''}`}
                    onClick={() => setCurrentAnswer(opt.key)}
                  >
                    <strong>{opt.key})</strong> {opt.text}
                  </button>
                ))}
              </div>
            ) : diagnosticTasks[currentTaskIdx].task_type === 'short_writing' ? (
              <textarea
                disabled={showFeedback}
                className="input-text textarea"
                placeholder="Schreibe deine Antwort hier..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            ) : (
              <input
                disabled={showFeedback}
                type="text"
                className="input-text"
                placeholder="Schreibe deine Antwort hier..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            )}

            {/* Feedback & Actions */}
            {!showFeedback ? (
              <button 
                className="btn btn-primary" 
                disabled={!currentAnswer.trim()} 
                onClick={submitDiagnosticAnswer}
              >
                Antwort prüfen
              </button>
            ) : (
              <div>
                {isCurrentAnswerCorrect() ? (
                  <div className="feedback-box correct">
                    <div className="feedback-title">✓ Richtig!</div>
                    <div className="feedback-body">
                      Deine Antwort ist absolut korrekt.
                    </div>
                  </div>
                ) : (
                  <div className="feedback-box wrong">
                    <div className="feedback-title">✗ Nicht ganz richtig</div>
                    <div className="feedback-body">
                      <div><strong>Erwartete Antwort:</strong> {diagnosticTasks[currentTaskIdx].expected_answer}</div>
                      <div className="feedback-lang">
                        <strong>Deutsch:</strong> {diagnosticTasks[currentTaskIdx].feedback.de}
                      </div>
                      <div className="feedback-lang" style={{ marginTop: '0.4rem' }}>
                        <strong>Türkçe:</strong> {diagnosticTasks[currentTaskIdx].feedback.tr}
                      </div>
                    </div>
                  </div>
                )}
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '1.5rem' }} 
                  onClick={nextDiagnosticTask}
                >
                  {currentTaskIdx + 1 === diagnosticTasks.length ? "Zur Auswertung" : "Nächste Aufgabe"}
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'diagnostic' && testCompleted && results && (
          <div className="section-card">
            <div className="results-header">
              <div className="score-badge">
                <span className="score-num">{results.percentage}%</span>
                <span className="score-label">Richtig</span>
              </div>
              <h2>Dein persönliches Analyseprofil</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Du hast {results.correctCount} von {results.totalQuestions} Aufgaben korrekt gelöst.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                Diese Auswertung ist ein erster Hinweis auf wiederkehrende Fehlermuster. Sie ersetzt keine vollständige sprachdiagnostische Analyse.
              </p>
            </div>

            {results.recommendations.length > 0 ? (
              <div className="dashboard-section">
                <h3>Top 3 Empfohlene Übungsbereiche</h3>
                <div className="recommendations-list">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-card">
                      <h4>{rec.title}</h4>
                      <p style={{ marginBottom: '0.5rem' }}>{rec.explanation}</p>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>
                        Empfohlenes Modul: {rec.module}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="dashboard-section" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ color: 'var(--success)' }}>Hervorragendes Ergebnis!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Es wurden keine systematischen Interferenzfehler im Test erkannt. Du beherrschst die kontrastiven Hürden auf B1-Niveau sehr gut.
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => setView('home')}>Zurück zur Startseite</button>
            </div>
          </div>
        )}

        {view === 'anonymous' && (
          <div className="section-card">
            <h2 style={{ marginBottom: '1.5rem', color: '#ffffff' }}>Anonymer Übungsmodus</h2>
            
            {/* Category selection */}
            <div className="category-grid">
              {['ORTH', 'PHON', 'MOR', 'SYN', 'MORSYN', 'LEXSEM', 'PRAG', 'TEXT'].map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template lists */}
            {activeCategory && (
              <div className="template-list">
                <h3>Übungsmuster für {activeCategory}</h3>
                {exerciseTemplates
                  .filter(t => t.category === activeCategory)
                  .map((temp) => (
                    <div key={temp.template_id} className="template-card">
                      <h4>{temp.title}</h4>
                      <div className="template-detail">
                        <strong>Anweisung:</strong> <span>{temp.instruction}</span>
                      </div>
                      <div className="template-detail">
                        <strong>Übungsart:</strong> <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600' }}>{temp.exercise_type}</span>
                      </div>
                      <div className="template-example-box">
                        <div style={{ fontWeight: '600', marginBottom: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>BEISPIELAUFGABE:</div>
                        <div style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{temp.example_prompt}</div>
                        <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>
                          <strong>Erwartete Antwort:</strong> {temp.example_answer}
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.88rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', color: 'var(--text-secondary)' }}>
                          <strong>Korrekturmuster:</strong> {temp.feedback_pattern}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Satzprüfer Playground */}
            <div className="sentence-checker">
              <h3>Lokaler Satzprüfer (Playground)</h3>
              <p className="sentence-checker-desc">
                Gib einen deutschen Satz ein, um ihn auf typische Interferenzfehler prüfen zu lassen (z. B. <em>„Ich habe Angst von dir“</em> oder <em>„Ich treibe gerne Isport“</em>).
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  className="input-text"
                  style={{ marginBottom: 0 }}
                  placeholder="Geben Sie hier einen deutschen Satz ein..."
                  value={sentenceInput}
                  onChange={(e) => setSentenceInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSentenceCheck(); }}
                />
                <button className="btn btn-primary" onClick={handleSentenceCheck}>Prüfen</button>
              </div>

              {sentenceCheckResult && (
                <div className="feedback-box wrong" style={{ borderLeftColor: sentenceCheckResult.match ? 'var(--danger)' : 'var(--success)', backgroundColor: sentenceCheckResult.match ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.06)' }}>
                  {sentenceCheckResult.match ? (
                    <>
                      <div className="feedback-title" style={{ color: 'var(--danger)' }}>✗ Interferenzfehler erkannt: {sentenceCheckResult.title}</div>
                      <div className="feedback-body">
                        <div style={{ marginBottom: '0.4rem' }}><strong>Deine Eingabe enthält typische Muster für:</strong> <em>{sentenceCheckResult.wrongExample}</em></div>
                        <div style={{ color: 'var(--success)', fontWeight: '600', marginBottom: '0.8rem' }}>✓ Korrekt wäre: {sentenceCheckResult.correctExample}</div>
                        <div className="feedback-lang">
                          <strong>Deutsch:</strong> {sentenceCheckResult.feedbackDe}
                        </div>
                        <div className="feedback-lang" style={{ marginTop: '0.4rem' }}>
                          <strong>Türkçe:</strong> {sentenceCheckResult.feedbackTr}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="feedback-title" style={{ color: 'var(--success)' }}>✓ Keine bekannten Muster gefunden</div>
                      <div className="feedback-body">
                        Für diesen Satz wurde im lokalen Prototyp kein typisches Interferenzmuster erkannt.
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
