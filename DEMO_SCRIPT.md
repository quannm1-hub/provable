# Provable — 3–5 Minute Demo Script

## Setup

```bash
cd provable-app
npm install
npm run dev
```

Open **http://localhost:3000** → click **Start SQL for Beginners**.

---

## 0:00–0:30 — Positioning

> "Provable is not a static course. It constantly interacts with the learner: asks what they know, adapts explanations, quizzes concepts, runs SQL exercises, gives hints, explains mistakes, and only moves on when understanding is shown."

Point out the **3-panel workspace**: **Provable Coach** (chat tutor) · SQL Editor · Dataset & Results. Mention **Readiness %** in the top bar.

---

## 0:30–1:30 — Module 1 SELECT (adaptive path)

1. In **Provable Coach**, choose **"I don't know this yet"** → coach explains in chat → example code bubble → mini quiz quick replies → exercise task.
2. Run **Submit Answer** with `SELECT * FROM employees;` → success feedback + result rows.
3. Optionally show **"I already understand this"** on Module 2 for contrast — skips to harder task, hints hidden until failure.

---

## 1:30–2:30 — Module 2 WHERE or 3 AND/OR

1. Pick **"I know a little"** → short recap → concept check → medium exercise.
2. Submit wrong SQL once → targeted feedback.
3. Submit wrong twice → **hint appears automatically**.
4. Use **Explain again** or **Easier example** buttons.

---

## 2:30–3:30 — UPDATE / DELETE safety

1. Open **UPDATE** module — highlight safety copy about WHERE.
2. Run an UPDATE → show **preview** (no permanent data loss).
3. Open **DELETE** — show deletion preview.

---

## 3:30–4:30 — Module 6 NovaTech Simulation

1. Complete modules → enter **NovaTech · Junior Data Operations Analyst**.
2. Complete 4 workplace tasks (SELECT → WHERE → UPDATE → DELETE).
3. Finish → **Work Simulation Completed** card with scores and badge.

---

## 4:30–5:00 — Close

> "Provable teaches through interaction, adapts to confidence and performance, and ends with job-like proof — not just videos."

---

## Quick paths for live demo

| Goal | Action |
|------|--------|
| Fastest win | Module 1 → "don't know" → quiz B → `SELECT * FROM employees;` |
| Show adaptation | Module 2 → "already understand" → advanced WHERE |
| Show safety | Module 4 UPDATE without WHERE → error message |
| Grand finale | Complete simulation → 88% / badge screen |
