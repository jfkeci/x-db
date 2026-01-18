# Workout Configurator Feature Plan

## Overview

A page where users can browse and select exercises from the database, then generate and download a PDF workout plan containing their selections.

## User Flow

1. User navigates to `/configurator/`
2. User sees a grid of available exercises (filterable by category, muscle group, difficulty)
3. User clicks exercises to add/remove them from their workout plan
4. Selected exercises appear in a sidebar or bottom panel showing the current workout
5. User can reorder exercises in their workout
6. User clicks "Download PDF" to generate and download their custom workout plan

## Technical Approach

### PDF Generation (Client-Side)

Use a client-side PDF library to avoid server dependencies (compatible with static GitHub Pages hosting).

**Recommended library:** [jsPDF](https://github.com/parallax/jsPDF)
- Lightweight, no server required
- Good text and layout support
- Can include images (exercise icons)

```bash
npm install jspdf
```

### Page Structure

```
src/pages/configurator/index.astro    # Main configurator page
src/components/
├── ExerciseSelector.astro            # Grid of selectable exercises
├── ExerciseCard.astro                # Individual exercise card (selectable variant)
├── WorkoutBuilder.astro              # Selected exercises panel
├── FilterBar.astro                   # Category/difficulty/muscle filters
└── PdfGenerator.ts                   # Client-side PDF generation logic
```

### State Management

Use vanilla JavaScript with custom events for state (no framework needed):

```typescript
// Client-side state for selected exercises
interface WorkoutState {
  exercises: Array<{
    id: string;
    name: string;
    category: string;
    muscleGroups: string[];
    difficulty: string;
    description: string;
  }>;
}
```

Store selections in `localStorage` to persist across page refreshes.

### Data Flow

1. **Load exercises:** Fetch all exercises via Astro's `getCollection('exercises')` at build time
2. **Pass to client:** Serialize exercise data as JSON in a `<script>` tag
3. **User interaction:** JavaScript handles selection/deselection
4. **PDF generation:** On download click, jsPDF creates PDF from selected exercises

## PDF Layout

```
┌─────────────────────────────────────┐
│         MY WORKOUT PLAN             │
│         Generated from x-db         │
├─────────────────────────────────────┤
│ 1. Exercise Name                    │
│    Category: Strength | Difficulty  │
│    Muscle Groups: Chest, Triceps    │
│    [Description text...]            │
├─────────────────────────────────────┤
│ 2. Exercise Name                    │
│    ...                              │
└─────────────────────────────────────┘
```

## Implementation Steps

1. **Install jsPDF dependency**
   ```bash
   npm install jspdf
   ```

2. **Create configurator page** (`src/pages/configurator/index.astro`)
   - Load all exercises from content collection
   - Render filterable exercise grid
   - Include workout builder panel
   - Add client-side scripts for interactivity

3. **Build exercise selector component**
   - Reuse existing exercise card styling with selection state
   - Visual feedback for selected items (border highlight, checkmark)

4. **Build filter controls**
   - Category dropdown/chips
   - Difficulty dropdown/chips
   - Muscle group multi-select

5. **Build workout builder panel**
   - List of selected exercises
   - Drag-to-reorder functionality (optional)
   - Remove button per exercise
   - Clear all button
   - Exercise count display

6. **Implement PDF generator**
   - Create `src/lib/pdfGenerator.ts`
   - Function that takes exercise array and returns PDF blob
   - Style PDF to match site branding

7. **Add navigation link**
   - Add "Configurator" link to site header/nav

## UI Considerations

- Use existing glassmorphism styling (`glass-card`, `glass-input`)
- Selected exercises should have clear visual distinction
- Mobile-responsive: stack panels vertically on small screens
- Empty state messaging when no exercises selected
- Loading state while PDF generates

## Filters Data Structure

```typescript
interface Filters {
  category: 'all' | 'Strength' | 'Cardio' | 'Core' | 'Flexibility' | 'Compound';
  difficulty: 'all' | 'Beginner' | 'Intermediate' | 'Advanced';
  muscleGroups: string[]; // empty = all
}
```

## Optional Enhancements

- **Workout naming:** Let user title their workout plan
- **Sets/reps input:** Add customizable sets and reps per exercise
- **Notes field:** Add personal notes to include in PDF
- **Share link:** Generate shareable URL with selected exercise IDs
- **Print-friendly view:** CSS print styles as alternative to PDF
