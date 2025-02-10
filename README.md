# ✈️ AI Trip Planner

🔗 **Live Demo:** https://ai-trip-planner-yash-malhotra.vercel.app/

An AI-powered web application that generates **personalized travel itineraries** based on user preferences such as destination, budget, trip duration, and travel type.

---

## 🚀 Features

- 🤖 AI-generated travel plans using Google Gemini
- 🧳 Personalized itineraries (hotels + day-wise plans)
- 🔍 Smart destination search with autocomplete
- 🔐 User authentication (Google Sign-In)
- 💾 Save and manage trips with persistent storage
- 📄 Detailed trip view with hotels and places to visit

---

## 🧠 Key Concepts Used

- AI integration (Google Generative AI - Gemini)
- Full user flow (input → AI generation → storage → retrieval)
- Firebase Authentication & Firestore
- Dynamic routing and state management
- Structured JSON parsing and rendering

---

## ⚙️ How It Works

- Converts user input into a structured AI prompt
- Generates itinerary using Gemini AI
- Parses JSON response into usable UI data
- Stores trips in Firestore linked to user

---

## 🛠️ Tech Stack

React • Firebase • Google Gemini AI • Tailwind CSS

---

## ⚙️ Getting Started

```bash
git clone https://github.com/yasmalhotraa/AiTripPlanner.git
cd AiTripPlanner
npm install
npm run dev
```

Runs on http://localhost:5173

---

## 🔐 Environment Variables

Create a `.env` file and add:

```env
VITE_GOOGLE_GEMINI_AI_API_KEY=your_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
```

## 🧪 Future Improvements

- Add trip sharing functionality
- Add real-time collaboration
- Improve itinerary customization
- Add maps integration

---
