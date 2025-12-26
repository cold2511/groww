# 🚀 FinBoard – Customizable Finance Dashboard

**Live Demo:** https://grow-tau-swart.vercel.app

FinBoard is a customizable finance dashboard built with Next.js that enables users to create, manage, and persist finance widgets using real-world financial APIs. The project demonstrates clean frontend architecture, effective state management, API integration with real-world constraints, performance optimization, and responsive UI/UX design.

This project was developed as part of a **Frontend Engineering Assignment**.

---

## Features

### Widget Management
- Add and remove finance widgets dynamically
- Custom widget titles and configurations
- Persistent dashboard state across browser sessions
- Modular widget architecture for easy extensibility

### Financial API Integration
- Integrated with Alpha Vantage API
- Symbol-based stock data fetching
- Graceful handling of API rate limits, network failures, and invalid responses
- Client-side caching using localStorage to reduce redundant API calls

### Data Visualization
- Daily stock price line charts
- Visual indicators for gain (green), loss (red), and neutral movement
- Responsive chart rendering

### State Management & Persistence
- Centralized state management using Zustand
- Widget configurations persist across page refresh
- Automatic dashboard restoration

### UI / UX
- Fully responsive interface
- Light and dark theme toggle
- Clear loading, empty, and error states
- Clean and minimal user interface

---

## Engineering Decisions

### Symbol-Based API Integration
Alpha Vantage APIs are symbol-driven and rate-limited. Using symbol input avoids CORS and validation issues, improves security, and keeps the system extensible for future support of URL-based dynamic widgets.

### Rate Limit & Performance Handling
The application implements time-based caching (TTL), early cache resolution, and user-friendly error messaging to maintain UI stability under strict API limits.

---

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + CSS Variables
- State Management: Zustand
- Data Visualization: Recharts
- API Provider: Alpha Vantage
- Persistence: Browser localStorage
- Deployment: Vercel

---

## Project Structure

src/
 ├── app/
 │   ├── page.tsx
 │   ├── layout.tsx
 │   └── globals.css
 │
 ├── components/
 │   ├── dashboard/
 │   │   ├── Dashboard.tsx
 │   │   └── WidgetCard.tsx
 │   ├── widgets/
 │   │   └── DailyChart.tsx
 │   └── common/
 │       └── ThemeToggle.tsx
 │
 ├── store/
 │   └── dashboardStore.ts
 │
 └── utils/

---

## Environment Setup

Create a `.env.local` file in the project root:

NEXT_PUBLIC_ALPHA_VANTAGE_KEY=YOUR_API_KEY

Environment files are excluded from version control for security.

---

## Run Locally

npm install  
npm run dev

Open http://localhost:3000 in your browser.

---

## Known Limitations
- Alpha Vantage free tier provides delayed market data
- Percentage change may reflect previous trading day
- Strict API request limits apply
- Full support primarily for US stock symbols

All limitations are handled gracefully within the UI.

---

## Future Enhancements
- URL-based API widgets
- Dynamic JSON field selection
- Weekly and monthly chart intervals
- Drag-and-drop dashboard layout
- Export and import dashboard configurations
- WebSocket-based real-time data updates

---

## Summary
FinBoard demonstrates practical frontend engineering skills including API integration under real constraints, scalable state management, performance optimization, and professional UI/UX implementation. The application is designed with extensibility and stability in mind.

---

## Author
Hrishi Raj  
Frontend Developer  
GitHub: https://github.com/cold2511/
