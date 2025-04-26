# AI Safety Incident Dashboard

A modern, professional dashboard for tracking and reporting AI safety incidents.

## 🚀 Tech Stack
- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **Styling:** CSS Modules

## 🛠️ Getting Started

### 1. Deploy Link
```bash
https://ai-safety-dashboard.netlify.app/
```

### 2. Clone the Repository
```bash
git clone https://github.com/kunalsahdeveloper/ai-safety-dashboard.git
cd ai-safety-dashboard
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Project Locally
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 5. Build for Production
```bash
npm run build
```

## 📦 Project Structure
- `src/components/IncidentDashboard.tsx` — Main dashboard component
- `src/types/incident.ts` — TypeScript types and mock data
- `src/components/IncidentDashboard.css` — Dashboard styling

## 🎨 Design Decisions & Challenges
- **Professional UI:** The dashboard uses a clean, modern Material-inspired design for clarity and usability.
- **Responsiveness:** Layout adapts to all screen sizes for accessibility.
- **State Management:** React hooks manage filtering, sorting, and form state simply and efficiently.
- **Expandable Details:** Incident details are shown inline for quick access without leaving the table.
- **Challenge:** Ensuring the table width remains fixed and visually consistent when expanding/collapsing details required careful CSS adjustments.


