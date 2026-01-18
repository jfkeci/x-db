# Adding New Exercises

This guide explains how to add new exercises to the x-db exercise database.

## Quick Start

1. Create an icon SVG in `src/assets/exercises/`
2. Create a markdown file in `src/content/exercises/`
3. Run `npm run dev` to preview

## Step 1: Create the Icon

Create an SVG icon at `src/assets/exercises/[exercise-name]-icon.svg`.

**Icon requirements:**
- 64x64 viewBox
- White strokes on transparent background
- Gradient circle background with 0.2 opacity

**Template:**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <circle cx="32" cy="32" r="30" fill="url(#gradient)" opacity="0.2"/>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f97316"/>
      <stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
  </defs>
  <!-- Your exercise illustration here -->
  <!-- Use white strokes: stroke="white" stroke-width="2.5" stroke-linecap="round" -->
</svg>
```

## Step 2: Create the Exercise File

Create a markdown file at `src/content/exercises/[exercise-name].md`.

**Filename:** Use kebab-case (e.g., `bench-press.md`, `russian-twist.md`)

### Frontmatter Schema

```yaml
---
name: 'Exercise Name'
description: 'Brief one-line description of the exercise.'
category: 'Strength'  # See options below
muscleGroups: ['Primary Muscle', 'Secondary Muscle']
difficulty: 'Intermediate'  # See options below
equipment: ['Barbell', 'Bench']  # Optional, use empty array [] if none
icon: '../../assets/exercises/[exercise-name]-icon.svg'
---
```

**Category options:**
- `Strength` - Weight training exercises
- `Cardio` - Cardiovascular exercises
- `Core` - Abdominal and stability exercises
- `Flexibility` - Stretching and mobility exercises
- `Compound` - Multi-joint exercises targeting multiple muscle groups

**Difficulty options:**
- `Beginner` - Simple movements, minimal equipment
- `Intermediate` - Requires some experience or strength
- `Advanced` - Complex movements or heavy loads

### Content Structure

After the frontmatter, write the exercise content:

```markdown
Brief introduction paragraph about the exercise and its benefits.

## How to Perform

1. **Step Name**: Description of the step.

2. **Step Name**: Description of the step.

3. **Step Name**: Description of the step.

## Tips

- Helpful tip for proper form
- Another tip
- Safety consideration

## Common Mistakes

- Mistake to avoid
- Another common error
- Form breakdown to watch for

## Variations (optional)

- **Variation Name**: Brief description
- **Another Variation**: Brief description
```

## Complete Example

**File:** `src/content/exercises/bent-over-row.md`

```markdown
---
name: 'Bent Over Row'
description: 'A compound back exercise that builds thickness and strength.'
category: 'Compound'
muscleGroups: ['Lats', 'Rhomboids', 'Rear Deltoids', 'Biceps']
difficulty: 'Intermediate'
equipment: ['Barbell']
icon: '../../assets/exercises/bent-over-row-icon.svg'
---

The bent over row is a fundamental back exercise that targets the entire posterior chain while building pulling strength.

## How to Perform

1. **Setup**: Stand with feet hip-width apart, holding a barbell with an overhand grip.

2. **Hinge**: Push your hips back and bend forward until your torso is nearly parallel to the floor.

3. **Pull**: Drive your elbows back, pulling the bar to your lower chest/upper abdomen.

4. **Lower**: Control the bar back to the starting position with arms extended.

## Tips

- Keep your back flat throughout the movement
- Squeeze your shoulder blades together at the top
- Don't use momentum to swing the weight up

## Common Mistakes

- Rounding the lower back
- Standing too upright
- Using excessive body English
- Pulling to the wrong position (too high or low)

## Variations

- **Underhand Row**: Grip reversed, more bicep involvement
- **Pendlay Row**: Bar returns to floor each rep
- **Dumbbell Row**: Unilateral version
```

## Checklist

Before committing your new exercise:

- [ ] Icon SVG created in `src/assets/exercises/`
- [ ] Icon uses correct 64x64 viewBox and white strokes
- [ ] Markdown file created in `src/content/exercises/`
- [ ] Frontmatter includes all required fields (name, description, category, muscleGroups, difficulty, icon)
- [ ] Category is one of: Strength, Cardio, Core, Flexibility, Compound
- [ ] Difficulty is one of: Beginner, Intermediate, Advanced
- [ ] Icon path is correct relative path
- [ ] Content includes How to Perform section with numbered steps
- [ ] Previewed locally with `npm run dev`
