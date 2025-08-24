# StapuBox Tournament Calendar Showdown

A React Native app that brings sports tournaments to life with a beautiful calendar view and expandable tournament cards. Built with TypeScript and Expo.

## Features

- **Sports Filter Dropdown**: Filter tournaments by sport type
- **Interactive Calendar**: Month view with highlighted tournament start dates
- **Tournament Cards**: Expandable cards showing tournament details and matches
- **Date Selection**: Tap calendar dates to filter tournaments for specific days
- **Responsive Design**: Clean, modern UI matching the Figma design
- **Real-time Filtering**: Dynamic updates based on sport and date selection

## Screenshots

The app features a tournament screen with:
- Header with "Tournament" title and sports filter button
- Calendar component showing August-October 2025 with highlighted dates
- Tournament cards with expandable match details
- Sports filter modal for selecting specific sports

##  Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stapu-tour
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For web
   npm run web
   ```

## Project Structure

```
stapu-tour/
├── components/
│   ├── SportsFilter.tsx          # Sports dropdown filter
│   ├── TournamentCalendar.tsx    # Calendar component
│   ├── TournamentCard.tsx        # Tournament card with matches
│   └── TournamentScreen.tsx      # Main screen component
├── services/
│   └── api.ts                    # API service for data fetching
├── types/
│   └── tournament.ts             # TypeScript interfaces
├── utils/
│   └── dateUtils.ts              # Date formatting utilities
├── App.tsx                       # Main app component
└── package.json                  # Dependencies and scripts
```

## API Integration

### Development (Demo APIs)
- **Sports List**: `https://mockly.me/custom/sportslist`
- **Tournaments**: `https://mockly.me/custom/tournament/demo`

### Production (StapuBox APIs)
- **Sports List**: `https://stapubox.com/sportslist`
- **Tournaments**: `https://stapubox.com/tournament/demo`

The app automatically falls back to mock data if the APIs are unavailable.

## Core Requirements Implementation

### Sports Filter Dropdown
- Fetches sports from API with fallback to mock data
- Default: ALL sports selected
- On change → calendar highlights + tournament list refresh for that sport

### Calendar (Month View: Aug–Sep–Oct)
- Highlights only tournament start dates (not entire range)
- Tap highlighted date → shows tournaments starting that day
- Custom navigation arrows for month switching

### Tournament Cards
- **Outer Card**: Tournament logo, name, sport, level, date range
- **Inner Card**: Expandable fixtures/matches
- No expand icon if no fixtures available

###  Data & Time
- Parses schedule date/time from API → displays in IST
- Proper date formatting and timezone handling

## Evaluation Criteria

### Base Requirements (150 points)
-  Sports dropdown fetch → +10
-  On change → correct updates → +20
-  Calendar implementation → +20
-  Date highlight (start date only) → +20
-  Outer card UI/UX → +20
-  Inner card expand/collapse → +20
-  GitHub repo link → +10
-  Demo video → +10
-  Working APK → +50

### Bonus Features (60 points)
- Closeness to design → +30
- Extra polish (error states, loading states) → +20
- Performance optimizations → +10

##  Design Implementation

The app closely follows the Figma design with:
- Clean white background with subtle shadows
- Orange accent color (#FF6B35) for highlights
- Proper spacing and typography hierarchy
- Responsive card layouts
- Smooth animations and transitions

## 🔧 Technical Decisions

### State Management
- React hooks for local state management
- useMemo for performance optimization
- Proper state lifting for component communication

### Data Flow
- Centralized API service
- Type-safe data handling with TypeScript
- Efficient filtering and memoization

### UI Components
- Reusable component architecture
- Consistent styling with StyleSheet
- Proper accessibility considerations




