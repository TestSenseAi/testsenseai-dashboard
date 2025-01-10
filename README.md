# TestSenseAI Dashboard Components

## Core Components

### Layout & Navigation

- `src/components/layout/Layout.tsx` - Main layout wrapper
- `src/components/layout/Sidebar.tsx` - Navigation sidebar
- `src/components/layout/Header.tsx` - Top header with user menu

### Dashboard

- `src/components/dashboard/TestMetrics.tsx` - Key metrics display
- `src/components/dashboard/TestTrends.tsx` - Trend analysis charts
- `src/components/dashboard/AIRecommendations.tsx` - AI-powered insights
- `src/components/dashboard/RecentActivity.tsx` - Activity feed

## New Components

### Integration Settings

- `src/components/integrations/IntegrationCard.tsx` - Individual integration config card
- `src/components/integrations/IntegrationForm.tsx` - Configuration form component
- `src/components/integrations/ConnectionStatus.tsx` - Status indicator
- `src/pages/Integrations.tsx` - Main integrations page

### Team Management

- `src/components/teams/TeamList.tsx` - List of team members
- `src/components/teams/RoleSelector.tsx` - Role assignment dropdown
- `src/components/teams/InviteModal.tsx` - Member invitation modal
- `src/components/teams/UsageStats.tsx` - Organization usage metrics
- `src/pages/Teams.tsx` - Team management page

### Analytics

- `src/components/analytics/CoverageChart.tsx` - Test coverage visualization
- `src/components/analytics/TestDurationChart.tsx` - Duration analysis
- `src/components/analytics/RiskAnalysis.tsx` - AI risk assessment
- `src/pages/Analytics.tsx` - Enhanced analytics page

### System Configuration

- `src/components/system/EnvironmentConfig.tsx` - Environment settings
- `src/components/system/AuthSettings.tsx` - Authentication configuration
- `src/components/system/ThemeToggle.tsx` - Theme customization
- `src/pages/SystemConfig.tsx` - System settings page

### AI Features

- `src/components/ai/SuggestionCard.tsx` - AI suggestion display
- `src/components/ai/SuggestionList.tsx` - List of AI recommendations
- `src/components/ai/ApprovalActions.tsx` - Suggestion approval UI
- `src/pages/AISuggestions.tsx` - AI suggestions page

## Types & Utilities

- `src/types/integration.ts` - Integration-related types
- `src/types/team.ts` - Team management types
- `src/types/system.ts` - System configuration types
- `src/utils/integration.ts` - Integration helpers
- `src/utils/team.ts` - Team management utilities
- `src/utils/analytics.ts` - Analytics helper functions

## Store

- `src/store/integration.ts` - Integration state management
- `src/store/team.ts` - Team state management
- `src/store/system.ts` - System configuration state

## Mock Data

- `src/mocks/integrations.ts` - Sample integration data
- `src/mocks/teams.ts` - Sample team/org data
- `src/mocks/analytics.ts` - Sample analytics data
