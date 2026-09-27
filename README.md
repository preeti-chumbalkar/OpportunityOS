# OpportunityOS

## Problem

Students face thousands of opportunities but often don't know which ones fit them or what they need to improve before applying. Most platforms simply list opportunities, leaving students overwhelmed and unsure of their readiness.

## Solution

OpportunityOS is an AI Opportunity Copilot that matches students to opportunities and helps them become ready. It goes beyond simple job boards by providing deep insights into *why* a student matches and *what* they need to do to improve.

## Innovation

**Opportunity Readiness Engine™** - A proprietary system that calculates not just how well a student matches an opportunity (Match Score), but how ready they are to apply today (Readiness Score), and what they could achieve if they address their skill gaps (Potential Score).

## Features

* **Personalized matching:** Deterministic engine considering skills, interests, eligibility, and goals.
* **Match Score:** Transparent 0-100 score explaining fit.
* **Readiness Score:** Actionable metric showing current application readiness.
* **Skill Gap Analysis:** Clear identification of missing skills and required proficiency levels.
* **AI Opportunity Insight:** Personalized explanations of why an opportunity is a good fit.
* **Improve My Match:** One-click generation of a personalized learning plan.
* **AI Action Plan:** Step-by-step daily tasks to bridge skill gaps.
* **Deadline Intelligence:** Visual indicators for urgency and priority.
* **Smart Priority:** Opportunities ranked by a combination of match, readiness, and urgency.
* **Dashboard:** A central hub for all opportunity intelligence.

## Architecture

Student Profile → Matching Engine → Readiness Engine → Gemini AI → Personalized Action Plan

## Tech Stack

* **Frontend:** Next.js 15 (App Router), React, Lucide Icons
* **Styling:** Vanilla CSS (CSS Modules) with a custom design system
* **Backend:** Next.js Route Handlers
* **AI:** Google Gemini 1.5 Flash (via `@google/genai` or direct REST API)
* **Deployment:** Docker, Google Cloud Run

## Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and add your Gemini API key.
   ```bash
   cp .env.example .env
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

* `GEMINI_API_KEY`: Required for the AI insight and action plan generation. Get one from Google AI Studio.

## Cloud Run Deployment

1. Build the Docker image:
   ```bash
   docker build -t opportunity-os .
   ```
2. Tag and push to Google Artifact Registry:
   ```bash
   docker tag opportunity-os gcr.io/YOUR_PROJECT_ID/opportunity-os
   docker push gcr.io/YOUR_PROJECT_ID/opportunity-os
   ```
3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy opportunity-os --image gcr.io/YOUR_PROJECT_ID/opportunity-os --platform managed --allow-unauthenticated --port 8080 --set-env-vars="GEMINI_API_KEY=your_key"
   ```

## Demo Flow (2 Minutes)

1. Open OpportunityOS.
2. Click **Try Demo Profile**.
3. Click **Discover My Opportunities**.
4. See personalized rankings with the #1 Recommendation highlighted.
5. Open the top opportunity (Data Analyst Internship).
6. Show the 82% Match and 68% Readiness scores.
7. Show the identified Skill Gaps (e.g., Advanced SQL).
8. Click **IMPROVE MY MATCH 🚀**.
9. Wait 2 seconds for the AI to generate the **AI Action Plan**.
10. Show the personalized day-by-day plan.
11. Navigate to the **Dashboard** to see the recommended next action.
