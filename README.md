# Focus Calendar 📅

A beautifully designed, interactive wall calendar component built with Next.js, React, and Tailwind CSS. The design is inspired by high-end physical wall calendars, featuring a rich, dark aesthetic, seamless micro-animations, and integrated daily task management.

**🌍 Live Demo:** [https://frontend-project-vert-three.vercel.app/](https://frontend-project-vert-three.vercel.app/)

## ✨ Features

- **Interactive Physical Wall Calendar Aesthetic**: Smooth spiral bindings, rich dark mode colors, and hanging hole details.
- **Dynamic Date Grid**: Built entirely with `date-fns` for accurate, zero-dependency date logic. Supports date range selection and current month highlighting.
- **Motivational Hero Banner**: Rotates inspiring software engineering quotes and beautiful imagery based on the selected month. Uses `framer-motion` for smooth layout transitions.
- **Integrated Daily Notes / Tasks**: Persistent task tracker synced with `localStorage`. Attach tasks to specific dates, mark them as completed, or delete them on the fly.
- **Micro-interactions**: Subtle hover states, range highlighting, and status indicators in the calendar grid.
- **Responsive Layout**: Adapts gracefully to different screen sizes, moving from a side-by-side desktop view to an accessible mobile view.

##  Running the Project Locally

To run this Next.js project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vridhichaudhary/Frontend_Project.git
   cd Frontend_Project
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the calendar in action!

##  Component Architecture & Functions Explained

This project is built using a component-driven architecture. Here is a breakdown of the core components found in `src/components/` and their respective functionalities:

### `CalendarWall.tsx`
The main orchestrator and state-holder for the application. 
- **Functionality:** Manages the active viewing month, the selected date range (`selectedStart`, `selectedEnd`), and the tasks mapping (`notes`). 
- **Effect hooks:** Retrieves and saves tasks seamlessly into browser `localStorage` to ensure persistence across page resets.
- **Layout:** Mounts the physical layout, placing the wall hangings, grid, hero banner, and sidebar into the DOM.

### `CalendarGrid.tsx`
The visual workhorse for the calendar dates.
- **Functionality:** Uses `date-fns` (`eachDayOfInterval`, `startOfMonth`, `endOfWeek`) to generate the correct grid pattern for any given month, correctly padding days leading into or falling after the month bounding.
- **Interactions:** Handles user clicks to compute complex date range selections (click to start, click to end) and highlights the range visually.
- **Indicators:** Renders visual hints (small colored dots) underneath dates that contain active or completed tasks.

### `HeroImage.tsx`
The aesthetic top half of the "physical" calendar.
- **Functionality:** Takes the current `monthIndex` as a prop and rotates through a mapped array of 12 distinct motivational coding quotes and Unsplash background images.
- **Animations:** Uses `framer-motion` (`AnimatePresence`) to generate smooth, fade-in transitions when navigating between different months.

### `NotesSidebar.tsx`
The task management panel dedicated to note-taking.
- **Functionality:** Takes the target date(s) and displays a list of related tasks. Provides form handling to submit a new note, toggle existing tasks via checkmarks, and remove tasks with a trash icon. 
- **State Handling:** Triggers callback functions bounded back to the `CalendarWall` orchestrator to ensure a single source of truth for all note modifications.

### `MonthHeader.tsx`
The navigational toolbar sitting above the grid.
- **Functionality:** Displays the currently focused month and year. Contains structural buttons attached to `handlePrevMonth` and `handleNextMonth` to shift the calendar's temporal context.

### `SpiralBinding.tsx`
A purely aesthetic component.
- **Functionality:** Draws the realistic spiral wire bindings attaching the top image section to the bottom calendaring section.

##  Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Utility**: `date-fns` (Date calculations), `clsx` & `tailwind-merge` (Dynamic CSS classes)
- **Animation**: `framer-motion`
- **Icons**: `lucide-react`

## 🚀 Deployment

The project is live and can be accessed at:
[https://frontend-project-vert-three.vercel.app/](https://frontend-project-vert-three.vercel.app/)

Deployed using **Vercel** with automatic deployments from the GitHub repository.
