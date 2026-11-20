// A1 German Exam Readiness Check - question bank.
// Each option is { text, correct?, mistake? }.
// `mistake` is a tag identifying the common mistake that option represents.

export const questions = [
  // ---------- Vocabulary (5) ----------
  {
    id: "v1",
    skill: "vocabulary",
    topic: "Days of the week",
    prompt: "Which word means \"Wednesday\"?",
    options: [
      { text: "Mittwoch", correct: true },
      { text: "Dienstag", mistake: "vocabulary_confuse_weekdays" },
      { text: "Donnerstag", mistake: "vocabulary_confuse_weekdays" },
      { text: "Montag", mistake: "vocabulary_confuse_weekdays" },
    ],
  },
  {
    id: "v2",
    skill: "vocabulary",
    topic: "Family",
    prompt: "What does \"die Schwester\" mean?",
    options: [
      { text: "The sister", correct: true },
      { text: "The brother", mistake: "vocabulary_confuse_family" },
      { text: "The daughter", mistake: "vocabulary_confuse_family" },
      { text: "The mother", mistake: "vocabulary_confuse_family" },
    ],
  },
  {
    id: "v3",
    skill: "vocabulary",
    topic: "Food",
    prompt: "Which word means \"apple\"?",
    options: [
      { text: "der Apfel", correct: true },
      { text: "die Milch", mistake: "vocabulary_confuse_food" },
      { text: "das Brot", mistake: "vocabulary_confuse_food" },
      { text: "der Käse", mistake: "vocabulary_confuse_food" },
    ],
  },
  {
    id: "v4",
    skill: "vocabulary",
    topic: "Numbers",
    prompt: "Which number is \"zwölf\"?",
    options: [
      { text: "12", correct: true },
      { text: "2", mistake: "vocabulary_confuse_numbers" },
      { text: "20", mistake: "vocabulary_confuse_numbers" },
      { text: "11", mistake: "vocabulary_confuse_numbers" },
    ],
  },
  {
    id: "v5",
    skill: "vocabulary",
    topic: "Time",
    prompt: "What does \"viertel nach drei\" mean?",
    options: [
      { text: "Quarter past three", correct: true },
      { text: "Quarter to three", mistake: "vocabulary_confuse_time" },
      { text: "Half past three", mistake: "vocabulary_confuse_time" },
      { text: "Three o'clock", mistake: "vocabulary_confuse_time" },
    ],
  },

  // ---------- Grammar (5) ----------
  {
    id: "g1",
    skill: "grammar",
    topic: "Articles",
    prompt: "Choose the correct article: ___ Frau trinkt Kaffee.",
    options: [
      { text: "die", correct: true },
      { text: "der", mistake: "article_masculine_default" },
      { text: "das", mistake: "article_neuter_default" },
      { text: "den", mistake: "article_accusative_wrong" },
    ],
  },
  {
    id: "g2",
    skill: "grammar",
    topic: "Present tense",
    prompt: "Complete: Ich ___ Pizza. (essen)",
    options: [
      { text: "esse", correct: true },
      { text: "esst", mistake: "verb_conjugation_ich" },
      { text: "isst", mistake: "verb_conjugation_ich" },
      { text: "essen", mistake: "verb_conjugation_ich" },
    ],
  },
  {
    id: "g3",
    skill: "grammar",
    topic: "Word order",
    prompt: "Which sentence has correct word order?",
    options: [
      { text: "Morgen gehe ich ins Kino.", correct: true },
      { text: "Morgen ich gehe ins Kino.", mistake: "word_order_after_time" },
      { text: "Ich morgen gehe ins Kino.", mistake: "word_order_after_time" },
      { text: "Gehe ich morgen ins Kino.", mistake: "word_order_after_time" },
    ],
  },
  {
    id: "g4",
    skill: "grammar",
    topic: "Accusative",
    prompt: "Complete: Ich sehe ___ Mann. (the man)",
    options: [
      { text: "den", correct: true },
      { text: "der", mistake: "accusative_nominative_confusion" },
      { text: "dem", mistake: "accusative_dative_confusion" },
      { text: "des", mistake: "accusative_genitive_confusion" },
    ],
  },
  {
    id: "g5",
    skill: "grammar",
    topic: "Plural",
    prompt: "What is the plural of \"das Kind\"?",
    options: [
      { text: "die Kinder", correct: true },
      { text: "die Kinds", mistake: "plural_wrong_suffix" },
      { text: "die Kinde", mistake: "plural_wrong_suffix" },
      { text: "die Kinden", mistake: "plural_wrong_suffix" },
    ],
  },

  // ---------- Reading (5) ----------
  {
    id: "r1",
    skill: "reading",
    topic: "Notice",
    text:
      "Achtung!\nDie Bibliothek ist am\nMontag geschlossen.",
    prompt: "When is the library closed?",
    options: [
      { text: "On Monday", correct: true },
      { text: "On Tuesday", mistake: "reading_detail_wrong_day" },
      { text: "Every day", mistake: "reading_overgeneralise" },
      { text: "On weekends", mistake: "reading_infer_wrong_scope" },
    ],
  },
  {
    id: "r2",
    skill: "reading",
    topic: "Email",
    text:
      "Hallo Anna,\nich habe am Samstag eine Party.\nKommst du? Liebe Grüße, Max",
    prompt: "Who is inviting Anna?",
    options: [
      { text: "Max", correct: true },
      { text: "Anna", mistake: "reading_sender_recipient_confused" },
      { text: "A friend of Max", mistake: "reading_infer_wrong_person" },
      { text: "Nobody, it is an email to Max", mistake: "reading_sender_recipient_confused" },
    ],
  },
  {
    id: "r3",
    skill: "reading",
    topic: "Schedule",
    text:
      "Zug nach Berlin\nAbfahrt: 14:30 Uhr\nAnkunft: 16:15 Uhr",
    prompt: "How long is the train journey?",
    options: [
      { text: "1 hour 45 minutes", correct: true },
      { text: "2 hours 15 minutes", mistake: "reading_time_math_wrong" },
      { text: "45 minutes", mistake: "reading_time_math_wrong" },
      { text: "1 hour 30 minutes", mistake: "reading_time_math_wrong" },
    ],
  },
  {
    id: "r4",
    skill: "reading",
    topic: "Menu",
    text:
      "Tagesmenu\nSuppe: 3,50 €\nHauptgericht: 7,90 €\nDessert: 2,50 €",
    prompt: "How much does the main course cost?",
    options: [
      { text: "7,90 €", correct: true },
      { text: "3,50 €", mistake: "reading_pick_wrong_item" },
      { text: "2,50 €", mistake: "reading_pick_wrong_item" },
      { text: "13,90 €", mistake: "reading_sum_instead_of_item" },
    ],
  },
  {
    id: "r5",
    skill: "reading",
    topic: "Sign",
    text:
      "Bitte nicht\nhereinrufen!\nDanke.",
    prompt: "What does the sign ask you to do?",
    options: [
      { text: "Do not call inside", correct: true },
      { text: "Please come in", mistake: "reading_misread_negation" },
      { text: "Call for help", mistake: "reading_misread_negation" },
      { text: "Thank the staff", mistake: "reading_focus_on_wrong_part" },
    ],
  },
];
