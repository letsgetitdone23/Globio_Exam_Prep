// Maps mistake tags (from wrong options in questions.js) to a
// human-friendly explanation: { title, why, practice }.

export const advice = {
  // Vocabulary
  vocabulary_confuse_weekdays: {
    title: "Learn the days of the week by sound",
    why: "German weekdays sound similar (Dienstag / Donnerstag) and are easy to swap under pressure.",
    practice: "Write the seven days on sticky notes, say each aloud, and order them daily for a week.",
  },
  vocabulary_confuse_family: {
    title: "Drill family words in pairs",
    why: "Words like Schwester / Bruder are learnt together but tested apart, so the wrong one surfaces.",
    practice: "Make flashcards pairing each family word with its opposite or parent, and review daily.",
  },
  vocabulary_confuse_food: {
    title: "Group food words with their article",
    why: "Food items are common exam vocabulary and forgetting which is which loses easy marks.",
    practice: "List ten foods with their article and learn them as one unit, e.g. \"der Apfel\".",
  },
  vocabulary_confuse_numbers: {
    title: "Practise numbers out loud",
    why: "Numbers like zwölf, zwei and zwanzig are frequently confused in listening and reading tasks.",
    practice: "Read phone numbers and prices aloud in German for five minutes a day.",
  },
  vocabulary_confuse_time: {
    title: "Master the clock expressions",
    why: "viertel nach, viertel vor and halb look alike but point to different times.",
    practice: "Draw clock faces and label each one in German, then quiz yourself in both directions.",
  },

  // Grammar
  article_masculine_default: {
    title: "Stop defaulting to \"der\"",
    why: "Many learners reach for \"der\" for every noun, but feminine and neuter nouns need their own article.",
    practice: "Always learn a noun with its article. Make a list of feminine nouns you keep mislabeling.",
  },
  article_neuter_default: {
    title: "Learn the neuter nouns",
    why: "Defaulting to \"das\" for unknown nouns is common but wrong for masculine and feminine words.",
    practice: "Highlight every neuter noun in your vocabulary list and review them as a group.",
  },
  article_accusative_wrong: {
    title: "Match the article to the case",
    why: "Using the wrong case article (e.g. den for a subject) is a frequent and easily avoided error.",
    practice: "Write ten short sentences and underline each article, naming its case out loud.",
  },
  verb_conjugation_ich: {
    title: "Drill the \"ich\" verb endings",
    why: "Mixing up esse / isst / esst / essen in the present tense is a core A1 grammar mistake.",
    practice: "Conjugate five common verbs (essen, kommen, wohnen, heißen, machen) aloud each day.",
  },
  word_order_after_time: {
    title: "Verb stays in position two",
    why: "When a sentence starts with a time expression, the verb must still come second, before the subject.",
    practice: "Write ten sentences that begin with a time word and check the verb is the second element.",
  },
  accusative_nominative_confusion: {
    title: "Spot the direct object",
    why: "After verbs like sehen, the object is accusative, so der becomes den, not stays der.",
    practice: "List verbs that take a direct object (sehen, haben, kaufen) and practise the accusative article.",
  },
  accusative_dative_confusion: {
    title: "Don't reach for the dative",
    why: "Using dem instead of den for a direct object mixes dative and accusative cases.",
    practice: "Mark each noun in your practice sentences as subject or object, then pick the article.",
  },
  accusative_genitive_confusion: {
    title: "Keep the genitive out of A1",
    why: "des belongs to the genitive, which is not used for basic direct objects at A1.",
    practice: "Stick to nominative and accusative drills; leave genitive forms for later levels.",
  },
  plural_wrong_suffix: {
    title: "Learn the plural with the noun",
    why: "German plurals are irregular, so guessing a suffix (-(e)n, -er, -s) usually fails.",
    practice: "Write each new noun with its plural form, e.g. \"das Kind / die Kinder\", and review together.",
  },

  // Reading
  reading_detail_wrong_day: {
    title: "Read for the exact detail",
    why: "Reading tasks reward picking the precise day or time stated, not a nearby one.",
    practice: "Underline the key detail in short texts and restate it in your own words before answering.",
  },
  reading_overgeneralise: {
    title: "Don't overgeneralise a statement",
    why: "A notice about one day is not a notice about every day; avoid broadening the meaning.",
    practice: "After each text, write one sentence that is true and one that is too broad to be supported.",
  },
  reading_infer_wrong_scope: {
    title: "Stay within the text's scope",
    why: "The text only says what it says; reading in extra facts (like \"weekends\") leads to wrong answers.",
    practice: "For each answer, point to the exact words in the text that support it before choosing.",
  },
  reading_sender_recipient_confused: {
    title: "Tell sender from recipient apart",
    why: "Emails and letters name both people; confusing who is writing and who is reading loses the point.",
    practice: "In every practice email, label \"Sender:\" and \"Recipient:\" before you read the questions.",
  },
  reading_infer_wrong_person: {
    title: "Identify the person the text names",
    why: "Questions about who does what test whether you can locate the named actor in the text.",
    practice: "Highlight each name in a text and note what that person does in one short phrase.",
  },
  reading_time_math_wrong: {
    title: "Practise computing times from a schedule",
    why: "Schedule questions need simple subtraction of times, which is easy to fumble under time pressure.",
    practice: "Take three sample timetables and compute each journey time, then check with a clock face.",
  },
  reading_pick_wrong_item: {
    title: "Match the question to the right line",
    why: "Menu and list questions test whether you pick the line the question asks about, not another one.",
    practice: "Re-read the question, then point to the matching line before you look at the options.",
  },
  reading_sum_instead_of_item: {
    title: "Answer what is asked, not a related number",
    why: "Choosing a total when the question asks for one item is a common reading slip.",
    practice: "State the question aloud, find the single item, then choose the matching price or value.",
  },
  reading_misread_negation: {
    title: "Watch for negation words",
    why: "Words like \"nicht\" flip the meaning of a notice; missing them reverses your answer.",
    practice: "Scan every text for nicht, kein and kein(e) before answering, and note what they negate.",
  },
  reading_focus_on_wrong_part: {
    title: "Answer from the main instruction",
    why: "Signs often add a polite word (Danke) that is not the instruction; answer from the command.",
    practice: "Identify the verb in each sign text first, then choose the option that matches it.",
  },
};
