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

## 2024-03-20
- [Fix] Updated component classes to use Tailwind v4 compatible color utilities (color- instead of text-)
- [Fix] Added explicit white, black and gray color definitions to tailwind.config.js
- [Fix] Replaced @apply with direct CSS in app.css to resolve Tailwind v4 compatibility issues
- [Fix] Fixed Tailwind v4 configuration to properly generate color utilities
- [Fix] Updated app.css to use the correct Tailwind v4 directives
- [Update] Enhanced color configuration in tailwind.config.js with explicit color values
- [Update] Changed component route from '/ui-components' to '/showcase' 
- [Update] Enhanced UI components showcase with color palette demonstration and better component organization
- [Fix] Fixed route configuration to correctly map to UI components showcase
- [Test] Verified UI components showcase route (`/ui-components`) is functioning correctly
- [Add] Implemented UI component library including Button, Card, Input, Container, and Badge components
- [Add] Created component showcase for testing and development 
- [Add] Implemented T component for internationalization with React
- [Add] Created i18n configuration with English and Chinese translations
- [Add] Configured TailwindCSS with design system colors and typography
- [Chore] Added i18next, Zustand, and utility dependencies
- [Add] Created utility functions for Tailwind class merging
- [Add] Defined design system compliance rules for consistent implementation
- [Add] Created internationalization text component (`T`) and usage guidelines
- [Update] Revised design system to use mobile-first approach and align with TailwindCSS defaults
- [Design] Created comprehensive design system with typography, colors, spacing, and component styles
- [Docs] Added DESIGN_SYSTEM.md with detailed guidelines and examples
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

## 2024-03-19
- [Add] Initial project setup with React Router 7
- [Add] Basic project structure with app routes and welcome page
- [Add] Docker configuration for containerized deployment
- [Add] Tailwind CSS integration
- [Add] GitHub workflow configurations
- [Add] Configuration files (tsconfig.json, vite.config.ts, etc.) 

## [0.2.0] - 2024-03-20

### Added
- [Add] T component for internationalization with React
- [Add] i18n configuration with English and Chinese translations
- [Add] TailwindCSS configuration with design system colors and typography

### Fixed
- [Fix] Tailwind v4 compatibility issues with utility classes
- [Fix] Updated component styles to use standard Tailwind color utilities
- [Fix] Corrected CSS structure in app.css for Tailwind v4
- [Fix] Updated Card component to use proper HTML structure
- [Fix] Fixed Button and Badge components to use standard color classes

### Changed
- [Update] Transformed project into "VocabMaster - AI-Powered Vocabulary Learning Platform"
- [Update] Added new dependencies: i18next, react-i18next, zustand
- [Update] Route change from "ui-components" to "showcase"
- [Update] Enhanced ComponentsShowcase with better organization
- [Update] Simplified Card component API for better usability

### Other
- [Chore] Created utility function for Tailwind class merging
- [Docs] Updated design system in project planning 