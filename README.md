# Demo Automated Tests for https://www.saucedemo.com/

## Technologies

- TypeScript
- Playwright
- ESLint
- Prettier

## Description

This repository contains three demo end-to-end tests against the Sauce Demo site:

1. Successful login.
2. Parameterized test for incorrect credentials - you can vary inputs and observe different error messages.
3. Product-sorting verification.

> **Note:** One test is intentionally failing to demonstrate screenshot capture in the report.

The tests use the Page Object Model pattern.  
Playwright’s HTML report is generated after runs; screenshots are attached for failed cases.

## Prerequisites

- Node.js installed.
- `npm` available.
- Any IDE that supports TypeScript (e.g. Visual Studio Code) installed.

## Setup

1. Clone the repository.
2. Open the folder in an IDE that supports TypeScript (e.g. Visual Studio Code).
3. Install dependencies:

```bash
npm install
```

## Usage

- Format code: `npm run format`
- Lint code: `npm run lint`
- Lint with auto-fix: `npm run lint:fix`
- Run tests: `npm test`
- Show report (if not shown automatically): `npm run report`
