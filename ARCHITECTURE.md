# Portfolio Site Architecture Documentation

## Overview

This is a modern portfolio website built with SvelteKit 5, featuring fuzzy search and multi-category filtering. The site showcases creative projects with a clean, minimalist interface and responsive design.

## Tech Stack

- **Framework**: SvelteKit 5 (using Svelte 5 runes)
- **Deployment**: Cloudflare (adapter-cloudflare)
- **Search**: Fuse.js for fuzzy search
- **Styling**: Vanilla CSS with CSS custom properties
- **Fonts**: Adobe Typekit (pragmatapro-fraktur, pt-mono)

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte          # Root layout
│   ├── +page.svelte             # Home page with project list
│   ├── gallery/                 # Gallery route
│   └── projects/[id]/           # Dynamic project detail pages
│       ├── +layout.svelte
│       ├── +layout.server.js
│       ├── +page.svelte
│       └── +page.server.js
├── lib/
│   ├── components/
│   │   ├── apply-filters.svelte  # Filter UI component
│   │   ├── header.svelte         # Site header
│   │   └── search-bar.svelte     # Search input
│   └── stores/
│       ├── projects.svelte.js    # Project data and store
│       ├── filter.svelte.js      # Filter state management
│       └── search.svelte.js      # Search state management
├── app.css                       # Global styles
└── app.html                      # HTML template
```

## Core Features

### 1. Reactive State Management with Svelte 5 Runes

The application uses Svelte 5's new runes API for state management:

- `$state()` - Reactive state
- `$derived()` - Computed/derived values
- `$effect()` - Side effects

### 2. Search Implementation

**Location**: `src/lib/stores/search.svelte.js`

Uses Fuse.js for fuzzy search functionality:

```javascript
const fuse = new Fuse(projects.state, {
  includeScore: true,
  keys: ['name', 'description', 'categories']
});
```

**Features**:
- Searches across project name, description, and categories
- Score threshold of 0.5 for result filtering
- Real-time search as user types
- Returns result IDs for filtering

**How it works**:
1. User types in search bar (`search-bar.svelte`)
2. `search.updateQuery()` is called on input
3. Fuse.js searches all projects
4. Results with score < 0.5 are stored
5. Result IDs are used to filter displayed projects

### 3. Category Filtering

**Location**: `src/lib/stores/filter.svelte.js`

**Features**:
- Multiple category selection (AND logic)
- Toggle categories on/off
- Reset all filters
- Visual feedback for active filters

**Filter Logic**:
```javascript
categoryFilter(project) {
  if (filter.state.categories.length === 0) {
    return true;  // No filters = show all
  }
  // ALL selected categories must be present (AND logic)
  return filter.state.categories.every((filterCategory) =>
    project.categories.includes(filterCategory)
  );
}
```

**UI Component** (`apply-filters.svelte`):
- Show/hide filters button
- Category pills with active state
- Active filters displayed prominently
- Yellow accent color for selected categories

### 4. Combined Search + Filter

**Location**: `src/routes/+page.svelte:8-10`

Projects are filtered through both search AND category filters:

```javascript
let filteredProjects = $derived(
  projects.state
    .filter(projects.searchFilter)
    .filter(projects.categoryFilter)
);
```

This creates a reactive chain where:
1. Search filter narrows by text match
2. Category filter further narrows by selected categories
3. Results update automatically when either changes

### 5. Project Data Structure

**Location**: `src/lib/stores/projects.svelte.js`

Each project includes:
- `id` - Unique identifier
- `name` - Project title
- `description` - Short description
- `descriptionLong` - Array of detailed paragraphs
- `url` - Array of project URLs
- `categories` - Array of category tags
- `hasGallery` - Boolean for gallery display
- `videoUrls` - Optional video assets
- `videoConfiguration` - Optional video config
- `imgConfiguration` - Optional image sizing

**Categories are automatically extracted**:
```javascript
let allCategories = [];
for (const project of projectsData) {
  for (const category of project.categories) {
    if (!allCategories.includes(category)) {
      allCategories.push(category);
    }
  }
}
```

## Routing

### Static Site Generation

The site uses SvelteKit's prerendering (`prerender = true`) for static site generation:

- All project pages are pre-generated at build time
- `entries()` function provides list of project IDs for generation
- Deployed to Cloudflare Pages as static assets

### Dynamic Routes

**Project Detail Pages**: `/projects/[id]`

- Dynamic route based on project ID
- Server-side data loading via `+layout.server.js`
- Pre-rendered at build time for all projects

## Styling Approach

### Design System

**Colors** (`app.css`):
```css
--black: #202020;
--primary-color: var(--black);
--secondary-color: whitesmoke;
--accent-color: 239, 239, 54;  /* Yellow, used as RGB */
```

**Typography**:
- Body: `pt-mono` (monospace)
- Headings: `pragmatapro-fraktur` (serif)
- Base size: 18px

### Responsive Design

Mobile-first approach with breakpoint at `768px`:

**Home Page Layout**:
- Mobile: Stacked (header/search/filters → projects)
- Desktop: Sidebar layout (sticky header + scrolling projects)

**Project Detail**:
- Mobile: Stacked (image → info)
- Desktop: Two-column (image | info)

### Component Styling

Uses scoped CSS in Svelte components with some global styles:

**Global**:
- `.category-nugget` - Category pill styling
- `.btn` - Button styles

**Scoped**:
- Component-specific layouts and interactions
- Responsive media queries

## Key UX Patterns

### 1. Empty State Handling

When no projects match filters:
```svelte
{#if filteredProjects.length === 0}
  <div>No projects found for filtered selected</div>
  <button onclick={filter.resetFilters}>Clear filters</button>
{/if}
```

### 2. Sticky Sidebar (Desktop)

Header/search/filters stick to viewport on scroll:
```css
.header-search-wrapper {
  position: sticky;
  top: 0;
}
```

### 3. SEO Optimization

Comprehensive meta tags on home page:
- Standard meta (title, description, keywords, author)
- Open Graph (og:title, og:description, og:image, og:url)
- Twitter Card (twitter:card, twitter:title, etc.)

### 4. Interactive Gallery

Project detail pages feature:
- Auto-rotating featured images (3-5 second intervals)
- Click gallery thumbnails to view full size
- Fade transitions between images
- Scroll to top on thumbnail click
- Opacity changes for viewed images

## Performance Optimizations

1. **Static Site Generation**: All pages pre-rendered
2. **Efficient Filtering**: Computed values with `$derived`
3. **Lazy Loading**: iframes load with fade-in effect
4. **Score Threshold**: Fuse.js results filtered by relevance
5. **Interval Management**: Proper cleanup of timers with `onMount` return

## State Management Architecture

### Stores Pattern

Each store follows a consistent pattern:

```javascript
function createStore() {
  const state = $state(initialValue);

  return {
    get state() { return state; },
    // methods to update state
  };
}

const store = createStore();
export default store;
```

**Benefits**:
- Reactive state updates
- Encapsulated logic
- Easy to test
- Type-safe with JSDoc

### Data Flow

```
User Input (search/filter)
    ↓
Store Method (updateQuery/toggleCategory)
    ↓
State Update ($state)
    ↓
Derived Computation ($derived)
    ↓
UI Re-render
```

## Build Configuration

**SvelteKit Config** (`svelte.config.js`):
- Adapter: `@sveltejs/adapter-cloudflare`
- Optimized for Cloudflare Pages deployment

**Vite Config** (`vite.config.js`):
- SvelteKit plugin integration
- Svelte 5 support

## Deployment

**Platform**: Cloudflare Pages

**Process**:
1. `npm run build` - Generates static site
2. Cloudflare Pages builds from main branch
3. Static assets served via Cloudflare CDN

## Notable Implementation Details

### 1. Fuse.js Configuration

The search is configured to be somewhat strict (score < 0.5) to avoid irrelevant results while still providing fuzzy matching benefits.

### 2. Filter Logic Choice

Uses AND logic for multiple categories - all selected categories must be present. This is more restrictive than OR logic but provides more precise filtering.

### 3. Auto-Generated Categories

Categories are extracted from project data rather than hardcoded, making it easy to add new categories by simply using them in project data.

### 4. Svelte 5 Migration

The codebase uses Svelte 5's new runes API throughout:
- No more `$:` reactive declarations
- No more `.subscribe()` on stores
- Cleaner, more explicit reactivity

## Future Enhancement Opportunities

Based on the codebase structure, potential improvements could include:

1. **Search Enhancements**:
   - Search highlighting
   - Recent searches
   - Search suggestions

2. **Filter Improvements**:
   - OR/AND toggle for category logic
   - Filter by date
   - Save filter presets

3. **Performance**:
   - Image optimization
   - Progressive image loading
   - Virtual scrolling for large project lists

4. **UX**:
   - URL-based filter state (shareable links)
   - Keyboard shortcuts
   - Sort options (date, name, etc.)

## Conclusion

This portfolio site demonstrates modern web development practices with SvelteKit 5, featuring a clean architecture that separates concerns between data management (stores), UI components, and routing. The combination of Fuse.js search and multi-category filtering provides a powerful, user-friendly browsing experience while maintaining excellent performance through static site generation.
