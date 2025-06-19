# SymptoSense

## Welcome to SymptoSense!

**SymptoSense** helps users predict potential allergies using advanced artificial intelligence. Input your bio information and other relevant details, and SymptoSense will provide predictions for allergies you might have, as well as:

- Personalized dos and don'ts  
- Possible medications  
- An AI-powered chat interface for real-time allergy consultation  

SymptoSense simplifies allergy management with an intelligent, user-friendly platform that uses cutting-edge AI to help users take proactive steps.

---

## Core Features

- ✅ AI-Powered Allergy Predictions  
- ✅ Personalized Dos and Don'ts Recommendations  
- ✅ Possible Medication Suggestions  
- ✅ Interactive Chat AI for Allergy Queries  

---

## SymptoSense Components

- [SymptoSense]()

---

## Installation Steps

1. **Clone this repository**  
   ```bash
   git clone https://github.com/YourRepo/symptoSense.git
   cd symptoSense
   
2. **Set up Supabase**
   - Go to https://supabase.com and create a new project.
   - In the Supabase dashboard, open the SQL Editor, and run the SQL script in:
   ```bash
   /supabase/schema.sql
   ```
   to initialize your database.
3. Create a .env.local file in the root directory and fill these
   ```bash
   touch .env.local
   ```
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```
4. Then Run the Development server
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```

