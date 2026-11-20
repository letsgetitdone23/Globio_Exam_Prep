// Pure readiness scorer. answers = { [questionId]: selectedOptionText }.
// Returns { total, outOf, skills, verdict, recommendations, coverageNote }.

import { questions } from "./questions.js";
import { advice } from "./advice.js";

const SKILLS = ["vocabulary", "grammar", "reading"];
const MIN_PER_SKILL = 3;
const MAX_RECOMMENDATIONS = 3;

function bandFor(correct) {
  if (correct >= 4) return "Strong";
  if (correct === 3) return "Developing";
  return "Needs work";
}

function makeRec(tag, skill, count) {
  const a = advice[tag] || { title: tag, why: "", practice: "" };
  return { tag, skill, count, title: a.title, why: a.why, practice: a.practice };
}

function buildRecommendations(wrongTags, skills) {
  const countsBySkill = {};
  for (const s of SKILLS) countsBySkill[s] = new Map();
  for (const { tag, skill } of wrongTags) {
    countsBySkill[skill].set(tag, (countsBySkill[skill].get(tag) || 0) + 1);
  }

  const usedTags = new Set();
  const recs = [];

  // Each skill below "Strong" gets its top mistake first, weakest skill first.
  const weakSkills = SKILLS
    .filter((s) => skills[s].band !== "Strong")
    .sort((a, b) => skills[a].correct - skills[b].correct);

  for (const s of weakSkills) {
    if (recs.length >= MAX_RECOMMENDATIONS) break;
    const tags = countsBySkill[s];
    if (tags.size === 0) continue;
    let topTag = null;
    let topCount = 0;
    for (const [tag, count] of tags) {
      if (count > topCount) {
        topTag = tag;
        topCount = count;
      }
    }
    if (topTag && !usedTags.has(topTag)) {
      recs.push(makeRec(topTag, s, topCount));
      usedTags.add(topTag);
    }
  }

  // Fill remaining slots by frequency across all remaining tags.
  const globalCounts = new Map();
  const tagSkill = new Map();
  for (const { tag, skill } of wrongTags) {
    globalCounts.set(tag, (globalCounts.get(tag) || 0) + 1);
    if (!tagSkill.has(tag)) tagSkill.set(tag, skill);
  }
  const remaining = [...globalCounts.entries()]
    .filter(([tag]) => !usedTags.has(tag))
    .sort((a, b) => b[1] - a[1]);

  for (const [tag, count] of remaining) {
    if (recs.length >= MAX_RECOMMENDATIONS) break;
    recs.push(makeRec(tag, tagSkill.get(tag), count));
    usedTags.add(tag);
  }

  return recs;
}

export function score(answers) {
  const skills = {};
  for (const s of SKILLS) skills[s] = { correct: 0, total: 0 };

  const wrongTags = [];

  for (const q of questions) {
    const stats = skills[q.skill];
    stats.total += 1;
    const selected = answers[q.id];
    const correctOption = q.options.find((o) => o.correct);
    if (selected === correctOption.text) {
      stats.correct += 1;
    } else {
      const chosen = q.options.find((o) => o.text === selected);
      if (chosen && chosen.mistake) {
        wrongTags.push({ tag: chosen.mistake, skill: q.skill });
      }
    }
  }

  for (const s of SKILLS) skills[s].band = bandFor(skills[s].correct);

  const total = SKILLS.reduce((sum, s) => sum + skills[s].correct, 0);
  const outOf = questions.length;

  const flaggedSkills = SKILLS.filter((s) => skills[s].correct < MIN_PER_SKILL);

  let key;
  if (total >= 11 && flaggedSkills.length === 0) key = "no_red_flags";
  else if (total <= 7) key = "not_yet";
  else key = "almost";

  const verdictText = {
    no_red_flags: {
      label: "No red flags",
      message:
        "We found no red flags in your vocabulary, grammar or reading. This is not a guarantee you will pass — the real exam also tests listening, writing and speaking.",
    },
    almost: {
      label: "Almost there: practise before you book",
      message:
        "You are close, but we found at least one skill below the minimum we recommend. Practise the areas below before booking the exam.",
    },
    not_yet: {
      label: "Not yet: build your foundations first",
      message:
        "Your score is below the level we recommend before booking. Build up your vocabulary, grammar and reading, then take this check again.",
    },
  };

  const verdict = { key, ...verdictText[key], flaggedSkills };

  const recommendations = buildRecommendations(wrongTags, skills);

  const coverageNote =
    "This check only covers vocabulary, grammar and reading. It does not test listening, writing or speaking, which are part of the real exam.";

  return { total, outOf, skills, verdict, recommendations, coverageNote };
}
