export interface ErrorItem {
  error_id: string;
  category: 'ORTH' | 'PHON' | 'MOR' | 'SYN' | 'MORSYN' | 'LEXSEM' | 'PRAG' | 'TEXT';
  title: string;
  typical_wrong_example: string;
  correct_example: string;
  probable_source: string;
  linguistic_explanation: string;
  short_user_feedback: {
    de: string;
    tr: string;
  };
  exercise_types: string[];
  source_basis: string[];
}

export interface DiagnosticTask {
  question_id: string;
  error_id: string;
  task_type: 'correction' | 'multiple_choice' | 'sentence_order' | 'translation_tr_de' | 'gap_fill' | 'short_writing';
  prompt: string;
  expected_answer: string;
  typical_wrong_patterns: string[];
  feedback: {
    de: string;
    tr: string;
  };
  source_basis: string[];
  exercise_recommendation: string;
  options?: { key: string; text: string }[];
  accepted_answers?: string[];
}

export interface ExerciseTemplate {
  template_id: string;
  category: 'ORTH' | 'PHON' | 'MOR' | 'SYN' | 'MORSYN' | 'LEXSEM' | 'PRAG' | 'TEXT';
  linked_error_ids: string[];
  exercise_type: string;
  title: string;
  instruction: string;
  example_prompt: string;
  example_answer: string;
  feedback_pattern: string;
}
