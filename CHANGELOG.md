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

## [0.2.0] - 2025-03-20
### Added
- [Add] T component for internationalization with React
- [Add] i18n configuration with English and Chinese translations
- [Add] TailwindCSS configuration with design system colors and typography
- [Add] Component showcase page at '/showcase' route
- [Add] Implemented UI component library including Button, Card, Input, Container, and Badge components
- [Add] Created component showcase for testing and development 
- [Add] Created utility functions for Tailwind class merging

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