# Provable

Learn skills through guided practice, then prove them in realistic work simulations.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Two independent flows

| Flow | Route | Coach |
|------|-------|-------|
| **Learning Path** | `/learn` → `/learn/sql` | Provable Coach |
| **Enterprise Internship** | `/internships` → `/internships/novatech` | NovaTech Mentor |

No completion of one flow is required to start the other. The **Dashboard** (`/`) is the central hub.

## Routes

- `/` — Dashboard (hero + topic & internship cards)
- `/learn` — Browse learning topics
- `/learn/sql` — SQL Fundamentals (5 modules)
- `/internships` — Browse virtual internships
- `/internships/novatech` — NovaTech Data Operations Virtual Internship

## Navigation

Top nav: **Provable** · **Learn** · **Internships** · **Dashboard**

## Prototype scope

**Functional:** SQL Fundamentals, NovaTech internship

**Mock (coming soon):** JavaScript, React, Data Analysis, Git, BrightHire, CloudCart

## Demo script

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)
