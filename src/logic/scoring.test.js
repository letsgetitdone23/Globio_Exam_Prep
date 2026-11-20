// Simple test runner for the readiness scorer. Run with: node src/logic/scoring.test.js

import { questions } from "./questions.js";
import { score } from "./scoring.js";

let pass = 0;
let fail = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    pass += 1;
    console.log(`  ok - ${label}`);
  } else {
    fail += 1;
    console.error(`  FAIL - ${label}`);
    console.error(`    expected: ${e}`);
    console.error(`    actual:   ${a}`);
  }
}

function answerAll(skill, correct) {
  const a = {};
  for (const q of questions) {
    if (q.skill !== skill) {
      const c = q.options.find((o) => o.correct);
      a[q.id] = c.text;
      continue;
    }
    if (correct) {
      const c = q.options.find((o) => o.correct);
      a[q.id] = c.text;
    } else {
      const wrongs = q.options.filter((o) => !o.correct);
      a[q.id] = wrongs[0].text;
    }
  }
  return a;
}

console.log("Scoring tests\n");

// 1. Perfect score: no red flags, 15/15, no recommendations.
const allCorrect = {};
for (const q of questions) {
  allCorrect[q.id] = q.options.find((o) => o.correct).text;
}
const perfect = score(allCorrect);
assertEqual(perfect.total, 15, "perfect total is 15");
assertEqual(perfect.outOf, 15, "outOf is 15");
assertEqual(perfect.verdict.key, "no_red_flags", "perfect => no_red_flags");
assertEqual(perfect.verdict.flaggedSkills, [], "perfect => no flagged skills");
assertEqual(perfect.recommendations.length, 0, "perfect => no recommendations");

// 2. All wrong: not_yet.
const allWrong = {};
for (const q of questions) {
  allWrong[q.id] = q.options.find((o) => !o.correct).text;
}
const none = score(allWrong);
assertEqual(none.total, 0, "all wrong => 0");
assertEqual(none.verdict.key, "not_yet", "all wrong => not_yet");
assertEqual(none.recommendations.length <= 3, true, "max 3 recommendations");

// 3. Almost: correct everywhere except reading (3 wrong reading) => 12 total, reading flagged.
const readingWeak = answerAll("reading", false);
const rw = score(readingWeak);
assertEqual(rw.total, 10, "reading weak => 10 correct (5 vocab + 5 grammar)");
assertEqual(rw.verdict.key, "almost", "12 but reading weak => almost (here 10 total)");
assertEqual(rw.verdict.flaggedSkills.includes("reading"), true, "reading flagged");

// 3b. 12 correct with reading below 3/5: force reading = 2 correct.
const reading2 = answerAll("reading", true);
const r2q = questions.filter((q) => q.skill === "reading");
reading2[r2q[0].id] = r2q[0].options.find((o) => !o.correct).text;
reading2[r2q[1].id] = r2q[1].options.find((o) => !o.correct).text;
reading2[r2q[2].id] = r2q[2].options.find((o) => !o.correct).text;
const r2 = score(reading2);
assertEqual(r2.total, 12, "12 correct scenario");
assertEqual(r2.skills.reading.correct, 2, "reading = 2/5");
assertEqual(r2.verdict.key, "almost", "12 with reading<3 => almost");
assertEqual(r2.verdict.flaggedSkills, ["reading"], "only reading flagged");

// 4. Eight correct: almost.
const almost8 = {};
const qById = {};
for (const q of questions) qById[q.id] = q;
// Correct first 8, wrong the rest.
questions.forEach((q, i) => {
  almost8[q.id] =
    i < 8
      ? q.options.find((o) => o.correct).text
      : q.options.find((o) => !o.correct).text;
});
const a8 = score(almost8);
assertEqual(a8.total, 8, "eight correct");
assertEqual(a8.verdict.key, "almost", "8 => almost");

// 5. Seven correct: not_yet.
const seven = {};
questions.forEach((q, i) => {
  seven[q.id] =
    i < 7
      ? q.options.find((o) => o.correct).text
      : q.options.find((o) => !o.correct).text;
});
const s7 = score(seven);
assertEqual(s7.total, 7, "seven correct");
assertEqual(s7.verdict.key, "not_yet", "7 => not_yet");

// 6. Bands.
assertEqual(perfect.skills.vocabulary.band, "Strong", "5/5 => Strong");
assertEqual(perfect.skills.reading.band, "Strong", "5/5 => Strong");
assertEqual(r2.skills.reading.band, "Needs work", "2/5 => Needs work");
const almost3 = answerAll("vocabulary", true);
const vq = questions.filter((q) => q.skill === "vocabulary");
almost3[vq[0].id] = vq[0].options.find((o) => !o.correct).text;
almost3[vq[1].id] = vq[1].options.find((o) => !o.correct).text;
const b3 = score(almost3);
assertEqual(b3.skills.vocabulary.correct, 3, "vocab 3/5");
assertEqual(b3.skills.vocabulary.band, "Developing", "3/5 => Developing");

// 7. Coverage note present.
assertEqual(typeof perfect.coverageNote, "string", "coverageNote is a string");
assertEqual(perfect.coverageNote.includes("listening"), true, "coverageNote mentions listening");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.error("Some checks failed.");
  process.exit(1);
} else {
  console.log("All checks passed.");
}
