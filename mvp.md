# Job Application Template Manager - v0.dev Implementation Prompt

## App Overview
Create a modern, luxurious job application template manager that helps users create, organize, and personalize cover letters, outreach messages, LinkedIn messages, and other job-related communications. This should be a uniquely beautiful, minimalist web app with subtle gamification elements.

## Design Philosophy
- **Uniquely Beautiful**: Not generic SaaS beautiful - think premium productivity tool with personality
- **Luxury Minimalism**: Clean lines, perfect typography, subtle shadows, premium feel
- **Inspired by**: shadcn/ui components, aceternity UI patterns, Linear's design system
- **Color Palette**: Deep blacks, warm grays, electric blues/purples for accents, with excellent dark mode
- **Typography**: Modern sans-serif, excellent hierarchy, generous whitespace

## Core Features to Implement

### 1. Dashboard/Homepage
- **Header**: Logo, user avatar, settings dropdown, theme toggle
- **Stats Row**: Cards showing total templates, success rate, community rank, recent activity
- **Quick Actions**: "New Template", "Browse Community", "Template Lab" buttons
- **Recent Templates**: Grid/list of user's most recent templates with quick copy buttons
- **Community Spotlight**: Featured community templates section

### 2. Template Library (Personal)
- **Sidebar**: Categories (Cover Letters, LinkedIn Messages, Cold Outreach, etc.), tags, folders
- **Main Area**: Template cards with preview, edit, duplicate, delete actions
- **Search Bar**: Advanced search with filters (date, success rate, tags, variables used)
- **Template Cards**: Show template name, preview text, success metrics, last used date

### 3. Template Editor
- **Split View**: Editor on left, live preview on right
- **Variable System**: Easy insertion of {{Company}}, {{Role}}, {{HiringManager}} etc.
- **Toolbar**: Bold, italic, formatting options, variable picker dropdown
- **Smart Suggestions**: AI-powered writing suggestions sidebar
- **Metadata Panel**: Tags, category, success tracking toggle

### 4. Quick Personalization Modal
- **Overlay**: Sleek modal when user clicks "Use Template"
- **Variable Form**: Auto-detected variables with smart input fields
- **Live Preview**: Real-time preview of personalized message
- **Export Options**: Copy to clipboard, download as PDF/Word, send to email draft

### 5. Community Templates
- **Browse Interface**: Trending, recent, categories, search
- **Template Cards**: Rating stars, fork count, success stories, creator info
- **Filtering**: By industry, role level, response rate, recency
- **Template Detail**: Full preview, comments, success metrics, fork button

### 6. Template Lab/Workshop
- **Experimental Space**: Draft templates that don't clutter main library
- **A/B Testing**: Compare template versions with success tracking
- **Analytics Dashboard**: Charts showing template performance, usage patterns
- **Challenge Section**: Monthly template challenges, community voting

### 7. Leaderboard & Gamification
- **Leaderboard**: Top template creators, most forked templates, highest rated
- **User Profiles**: Public profiles showing created templates, achievements
- **Achievement System**: Badges for milestones, unlockable features
- **Progress Indicators**: Template creation streaks, community contributions

## Specific UI Components Needed

### Navigation
- **Top Navigation**: Clean, minimal with user dropdown
- **Sidebar**: Collapsible with icons and labels, smooth animations
- **Breadcrumbs**: For deep navigation paths

### Cards & Lists
- **Template Cards**: Hover animations, quick action buttons
- **Stat Cards**: Clean metrics display with icons
- **Activity Feed**: Recent actions, community updates

### Forms & Inputs
- **Variable Input Fields**: Special styling for template variables
- **Rich Text Editor**: Clean toolbar, markdown support
- **Tag Input**: Autocomplete, easy removal
- **Search**: Instant results, advanced filters

### Modals & Overlays
- **Personalization Modal**: Large, focused on variable filling
- **Template Preview**: Full-screen preview option
- **Confirmation Dialogs**: Elegant, not intrusive

### Data Visualization
- **Success Rate Charts**: Clean line/bar charts
- **Template Analytics**: Usage heatmaps, performance metrics
- **Leaderboard Tables**: Animated rankings

## Technical Requirements
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query/SWR for data fetching
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icons
- **Typography**: Inter or similar modern font

## Sample Data Structure
```typescript
interface Template {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  variables: string[]
  successRate?: number
  timesUsed: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface CommunityTemplate extends Template {
  author: User
  rating: number
  forkCount: number
  comments: Comment[]
}
```

## Key User Flows to Implement
1. **Create Template**: New template → Add content with variables → Save with metadata
2. **Use Template**: Select template → Fill variables in modal → Copy/export
3. **Browse Community**: Explore templates → Preview → Fork to personal library
4. **Template Lab**: Create experimental version → A/B test → Promote to main library

## Unique Design Elements
- **Variable Highlighting**: Special styling for {{variables}} in editor and preview
- **Success Indicators**: Subtle green indicators for high-performing templates
- **Template Genealogy**: Visual indication when templates are forked from community
- **Smooth Transitions**: Page transitions, hover states, loading states
- **Empty States**: Beautiful illustrations for empty libraries, search results

## Priority Order
1. Dashboard with template library
2. Template editor with variable system
3. Personalization modal
4. Community templates browser
5. Template Lab and analytics
6. Leaderboard and gamification

Create a fully functional prototype with realistic sample data, smooth animations, and production-ready UI components. Focus on making it feel premium and uniquely beautiful, not like a generic template manager.