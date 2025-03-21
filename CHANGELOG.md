# Changelog

All notable changes to this project will be documented in this file.

## Tags Definition
- [Add] - New features, files, or functionality added to the project
- [Update] - Changes, improvements, or enhancements to existing functionality
- [Remove] - Features, files, or functionality that were removed from the project
- [Fix] - Bug fixes or error corrections
- [Refactor] - Code changes that neither fix bugs nor add features, but improve structure
- [Docs] - Documentation changes or additions
- [Test] - Adding or updating tests
- [Chore] - Changes to build process, tooling, or dependencies
- [Plan] - Project planning, architecture design, or roadmap development
- [Design] - UI/UX design, visual elements, or design system components
- [Style] - Visual changes, layout adjustments, and styling improvements
- [Enhance] - Improvements to existing features that go beyond regular updates
- [API] - API integration, GraphQL operations, and backend communication
- [Perf] - Performance optimizations and improvements

## [Unreleased]

### [API]
- Added GraphQL schema definition files for backend API
- Implemented type definitions for User, VocabItem, VocabList, Test, and related entities
- Added query and mutation definitions for the GraphQL API

### [Fix]
- Fixed incorrect link references in auth components (sign in, register, and forgot password)
- Fixed 404 error when navigating to auth pages by updating route configuration
- Fixed browser throttling warning on dashboard page navigation
- Fixed server-side rendering issues with localStorage access
- Added proper error handling for localStorage operations in private browsing mode
- Fixed GraphQL registration mutation by updating incorrect type references from RegisterInput to RegisterUserInput
- Fixed GraphQL login mutation to use LoginInput structure instead of individual parameters
- Fixed user authentication query to use 'me' instead of 'verifyToken'
- Aligned client-side GraphQL operations with backend schema definitions
- Resolved type mismatch in authentication context for user registration
- Updated login functionality to match server schema requirements
- Fixed token verification process to use the correct query field
- Fixed missing translations in the i18n system for the welcome page, dashboard page, and UI components showcase
- Fixed i18next being initialized twice in the application, causing console warnings
- Fixed browser throttling warning in dashboard page by optimizing performance
- Fixed infinite loop and excessive re-renders in dashboard component

### [Enhance]
- Added improved translations for English and Traditional Chinese
- Optimized dashboard performance through memoization and deferred loading
- Added loading state to improve perceived performance
- Added missing translations for English and Traditional Chinese locales
- Enhanced user experience by providing more comprehensive translations across the application
- Improved i18n initialization with a condition to prevent multiple initializations
- Optimized dashboard page performance with memoization and deferred loading
- Added debounced localStorage implementation for Zustand stores to prevent excessive IPC calls
- Added loading state to the dashboard to improve perceived performance

### [Perf]
- Implemented lazy loading for dashboard content to reduce IPC calls during navigation
- Created dedicated DashboardContent component to improve code organization and performance
- Added staggered loading pattern to prevent browser throttling warnings
- Optimized state access in dashboard component to minimize re-renders
- Improved initial page loading sequence by deferring heavy component rendering
- Added optimized store access patterns in the dashboard component
- Restructured component rendering to avoid expensive calculations on every render
- Added error handling for localStorage operations in Zustand stores
- Improved delays for loading expensive components
- Added server-side rendering compatibility to all Zustand stores
- Implemented staggered data loading pattern to reduce IPC calls
- Added lazy selectors for accessing store data only when needed
- Improved data loading sequence to prevent browser throttling

## [0.3.6] - 2025-03-28

### [Fix]
- Fixed navigation in the Welcome component to use React Router navigation.
- Fixed the incorrect registration link in the login form (changed from "/auth/register" to "/register").
- Fixed the incorrect forgot password link in the login form (changed from "/auth/forgot-password" to "/forgot-password").
- Fixed the incorrect login link in the register form (changed from "/auth/login" to "/login").
- Updated non-existent profile and settings links in Navbar to temporarily redirect to the dashboard.
- Added forgot-password route to routes configuration.
- Improved client-side routing for better user experience.

### [Add]
- Implemented forgot password page and functionality.
- Added translations for the forgot password page in English and Traditional Chinese.

### [Enhance]
- Enhanced error handling for GraphQL queries.
- Added Traditional Chinese localization for the Welcome page.

## [0.3.5] - 2025-03-27

### [Fix]
- Fixed GraphQL introspection error in TestGql component.
- Improved error handling for network issues.

### [Enhance]
- Added React Query for better data fetching.
- Enhanced form validation on authentication forms.

### [API]
- Implemented GraphQL integration with Apollo Client.
- Added schema validation for server responses.

## [0.3.4] - 2025-03-26
### Added
- [Add] Added UI components: Alert and Spinner for better user feedback
- [Add] Added services architecture for authentication and data operations
- [Add] Added GraphQL operation definitions and utilities
- [Add] Added browser utility functions for safe localStorage operations
- [Add] Added TypeScript types and interfaces for improved code safety

### Infrastructure
- [Chore] Updated environment configuration for development and production
- [Refactor] Improved project structure with clear separation of concerns
- [API] Added GraphQL client setup and service integration

## [0.3.3] - 2025-03-25
### Improved
- [Enhance] Added missing Traditional Chinese translations for the Welcome page
- [Update] Expanded translation coverage in zh locale files

## [0.3.2] - 2025-03-24
### Added
- [Add] Added language switcher in the navbar to toggle between English and Traditional Chinese
- [Enhance] Improved i18n configuration to better support language switching

### Improved
- [Update] Enhanced i18n translation files with language selection related keys

## [0.3.1] - 2025-03-23
### Fixed
- [Fix] Enhanced T component to better handle missing translations with fallback to children
- [Fix] Added debug logging in development mode for missing translations
- [Fix] Fixed Apollo Client imports to use explicit module paths to avoid CommonJS issues
- [Fix] Fixed wrong usage of T component in showcase components
- [Fix] Added missing translations for common elements and GraphQL test component

### Improved
- [Refactor] Consolidated Apollo Client configuration into a single file
- [Refactor] Removed redundant T component implementation in favor of the enhanced common/T component
- [Refactor] Updated GraphQL utility functions with re-exported hooks using proper paths
- [Update] Converted Chinese localization from Simplified Chinese to Traditional Chinese

### Removed
- [Remove] Deleted redundant Apollo Provider implementations
- [Remove] Removed old T.tsx component in favor of common/T.tsx

## [0.3.0] - 2025-03-22
### Added
- [Add] Apollo Client integration for GraphQL API communication
- [Add] Created authentication context for global user state management
- [Add] Implemented LoginForm and RegisterForm components with validation
- [Add] Created Alert component for user feedback messages
- [Add] Added Spinner component for loading states
- [Add] Created utility functions for class names, error handling, and more
- [API] Added authService with GraphQL mutations for login and register
- [API] Added userService for profile management operations
- [API] Added vocabularyService with GraphQL operations for vocabulary items
- [API] Added testService with GraphQL operations for vocabulary tests
- [Add] Environment configuration for API endpoints in different environments

### Updated 
- [Update] Refactored auth routes to use GraphQL authentication
- [Update] Enhanced UI components to support dark mode and accessibility
- [Update] Updated backend integration documentation
- [Enhance] Improved form validation with detailed error messages
- [Update] Refactored login and registration forms for better UX

### Configuration
- [Chore] Added Apollo Client dependencies for GraphQL integration
- [Chore] Added clsx and tailwind-merge for class name utilities
- [Config] Environment files for development and production

## [0.2.1] - 2025-03-21
### Added
- [Add] Created placeholder vocabulary management page with "coming soon" message
- [Add] Created placeholder tests page with "coming soon" message
- [Add] Custom 404 page for better user experience

### Fixed
- [Fix] Card component exports in UI component library index
- [Fix] Dashboard styling issues on desktop view
- [Fix] Button variant type consistency in welcome page

### Changed
- [Update] Enhanced AppLayout component with better spacing and colors
- [Update] Improved Container component with more flexible width options
- [Design] Completely redesigned landing page with modern, attractive UI
- [Style] Enhanced dashboard layout for better responsiveness

## [0.2.0] - 2025-03-20
### Added
- [Add] T component for internationalization with React
- [Add] i18n configuration with English and Chinese translations
- [Add] TailwindCSS configuration with design system colors and typography
- [Add] Component showcase page at '/showcase' route
- [Add] Implemented UI component library including Button, Card, Input, Container, and Badge components
- [Add] Created component showcase for testing and development 
- [Add] Created utility functions for Tailwind class merging
- [Add] Zustand store implementation for user authentication, vocabulary management, and testing
- [Add] Created login and registration pages with form validation
- [Add] Implemented dashboard for authenticated users
- [Add] Added user menu in navbar with authentication-aware display

### Fixed
- [Fix] Tailwind v4 compatibility issues with utility classes
- [Fix] Updated component styles to use standard Tailwind color utilities
- [Fix] Corrected CSS structure in app.css for Tailwind v4
- [Fix] Updated Card component to use proper HTML structure
- [Fix] Fixed Button and Badge components to use standard color classes
- [Fix] Fixed route configuration to correctly map to UI components showcase

### Changed
- [Update] Transformed project into "VocabMaster - AI-Powered Vocabulary Learning Platform"
- [Update] Added new dependencies: i18next, react-i18next, zustand
- [Update] Route change from "ui-components" to "showcase"
- [Update] Enhanced ComponentsShowcase with better organization
- [Update] Simplified Card component API for better usability
- [Update] Package dependency lock files for consistent installation
- [Update] Enhanced color configuration in tailwind.config.js with explicit color values

### Other
- [Chore] Added i18next, Zustand, and utility dependencies
- [Docs] Updated design system in project planning
- [Test] Verified UI components showcase route is functioning correctly

## 2024-03-20
- [Update] Refined tech stack with Zustand for state management, GraphQL for API, and Jest for testing
- [Update] Enhanced architecture diagram with more detailed components
- [Add] Added internationalization and accessibility features to project plan
- [Docs] Updated technical specifications in both README and PROJECT_PLANNING
- [Update] Transformed project into VocabMaster - AI-Powered Vocabulary Learning Platform
- [Docs] Updated README.md with project introduction and features
- [Docs] Added system architecture diagram using mermaid
- [Add] Created PROJECT_PLANNING.md with detailed development roadmap
- [Plan] Defined database schema for vocabulary learning system
- [Plan] Established technical architecture and system requirements
- [Update] Changed deployment strategy to Vercel instead of Docker
- [Plan] Added recommendations for LLM selection, testing methodology, and data privacy
- [Design] Created comprehensive design system with typography, colors, spacing, and component styles
- [Docs] Added DESIGN_SYSTEM.md with detailed guidelines and examples
- [Add] Defined design system compliance rules for consistent implementation
- [Update] Revised design system to use mobile-first approach and align with TailwindCSS defaults

## 2024-03-19
- [Add] Initial project setup with React Router 7
- [Add] Basic project structure with app routes and welcome page
- [Add] Docker configuration for containerized deployment
- [Add] Tailwind CSS integration
- [Add] GitHub workflow configurations
- [Add] Configuration files (tsconfig.json, vite.config.ts, etc.)

## 0.4.0 - 2024-02-23

### [Add]
- Added GraphQL subscriptions for real-time updates
- Added global notifications system for application events
- Added test history and performance tracking over time
- Added localized error messages for all application errors

### [Fix]  
- Fixed memory leaks in vocabulary list component
- Fixed incorrect scoring in test engine
- Fixed accessibility issues in form components
- Fixed missing translations in the i18n system for the welcome page, dashboard page, and UI components showcase.

### [Enhance]
- Improved mobile responsiveness for main application screens
- Enhanced keyboard navigation throughout the application
- Optimized data loading patterns for vocabulary lists
- Added missing translations for English and Traditional Chinese locales
- Enhanced user experience by providing more comprehensive translations across the application

## 0.3.2 - 2024-01-30

### [Fix]
- Fixed vocabulary import feature for CSV files
- Fixed user registration validation errors
- Fixed sorting functionality in vocabulary lists

### [Enhance]
- Improved error handling for authentication flows
- Enhanced dark mode theme consistency
- Added more detailed progress statistics in dashboard

## 0.3.1 - 2024-01-15

### [Fix]
- Fixed critical security issue in authentication flow
- Fixed data synchronization issues with offline mode
- Fixed UI rendering glitches in vocabulary flashcards

### [Enhance]
- Enhanced performance for vocabulary search functionality
- Improved loading states throughout the application

## 0.3.0 - 2024-01-02

### [Add]
- Added offline mode support for vocabulary study
- Added spaced repetition algorithm for optimized learning
- Added detailed analytics for learning progress
- Added bulk operations for vocabulary management

### [Fix]
- Fixed accessibility issues in UI components
- Fixed data consistency issues in vocabulary storage
- Fixed performance bottlenecks in test generation

### [Enhance]
- Improved user onboarding experience
- Enhanced search functionality with filters and sorting options
- Redesigned dashboard with more actionable insights

## 0.2.0 - 2023-12-01

### [Add]
- Added test generation from vocabulary lists
- Added user authentication and profile management
- Added vocabulary sharing between users
- Added multiple study modes for different learning styles

### [Fix]
- Fixed data persistence issues across sessions
- Fixed UI inconsistencies across different devices
- Fixed performance issues with large vocabulary sets

### [Enhance]
- Enhanced vocabulary import capabilities
- Improved testing interface with immediate feedback
- Added progress tracking across different vocabulary sets

## 0.1.0 - 2023-11-01

### [Add]
- Initial release with basic vocabulary management
- Added simple testing functionality
- Added user registration and login
- Added basic dashboard for vocabulary overview 