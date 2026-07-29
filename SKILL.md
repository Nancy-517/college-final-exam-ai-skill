---
name: build-exam-knowledge-system
description: Build an exam-ready knowledge system from a student's authorized course materials. Use for university final-exam preparation involving syllabi, teacher slides, review notes, assignments, past papers, question-type analysis, scoring-point answers, worked solutions, targeted practice, open-book indexes, emergency review, or last-minute cheat sheets. Prioritize supplied sources, label evidence, and never invent course-specific claims.
---

# Build Exam Knowledge System

Turn authorized course materials into a source-grounded system that helps the student recognize questions, retrieve the right knowledge, and produce scorable answers.

## Start

1. Identify exam time, open/closed-book format, question types, score weights, available study time, and target score from the user's message or materials.
2. Inventory the supplied materials without assuming completeness.
3. Rank sources using:

   `teacher-confirmed scope > same-course past papers > teacher slides/notes > assignments > assigned textbook > clearly labeled general knowledge`

4. Use the workflow in [references/core-workflow.md](references/core-workflow.md).
5. Track sources and uncertainty using [references/source-policy.md](references/source-policy.md).
6. Select output templates from `templates/`.

Do not ask avoidable questions. Make reasonable assumptions and label them. If the user says the exam is imminent or asks for direct重点, activate Emergency Mode immediately.

## Required outputs

Produce only what the current stage needs, but preserve this progression:

1. **Exam-ready knowledge system** grounded in the actual course materials.
2. **Priority review order** based on probability, score value, transfer value, and learner gaps.
3. **Complete past-paper solutions** with reasoning, scoring points, errors, and variants.
4. **Targeted drills** for weak or high-value question types.
5. **Final 30-minute review** based on the whole interaction and observed mistakes.

For the customizable five-stage implementation, read [references/customization.md](references/customization.md). The full extended variant is maintained on the `five-stage-workflow` branch.

## Output rules

- Connect every important point to a likely question form and answer action.
- For subjective questions, provide: trigger words, principle/model, answer structure, scoring points, material integration, and common omissions.
- For calculations, provide: model recognition, conditions, formula, symbols, substitution, calculation, interpretation, and checks.
- For diagrams, provide: axes, initial state, change, new equilibrium, variable directions, and mechanism.
- For open-book exams, provide a keyword-to-location index.
- Distinguish evidence from inference. Never present an AI guess as the teacher's view.
- Say `材料未体现` when the supplied materials do not support a course-specific claim.
- Do not reproduce or redistribute unauthorized slides, internal papers, answer keys, personal data, or confidential teaching materials.

## Emergency Mode

Trigger on phrases such as `马上考试`, `半小时后考试`, `今晚速成`, `不要问我`, or equivalent urgency.

Output in this order:

1. Score-first strategy and time allocation.
2. Must-win topics and question types.
3. Formula/model/answer skeletons.
4. Personal error alerts and confusable pairs.
5. Open-book locator if applicable.
6. Final self-check.

Compress aggressively, but do not remove a point the learner repeatedly missed.

## Subject profiles

Use a profile only when it matches the course:

- [subject_profiles/quantitative.md](subject_profiles/quantitative.md)
- [subject_profiles/economics-social-science.md](subject_profiles/economics-social-science.md)
- [subject_profiles/open-book-subjective.md](subject_profiles/open-book-subjective.md)

Profiles guide structure; supplied course materials remain authoritative.
