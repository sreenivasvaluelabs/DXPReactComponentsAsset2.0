# React Component Library Application

## Overview

This is a React component library application built with modern web technologies. The project showcases a collection of reusable UI components with an interactive playground for testing and customization. It features a full-stack architecture with a React frontend and Express backend, designed for developing and demonstrating professional UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design tokens and Shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Component System**: Comprehensive component library with 19 components including Button, Accordion, Carousel, Container, Navigation, Card, Search Bar, Modal, Form, Table, Tabs, Alert, Badge, Breadcrumb, Pagination, Progress, Slider, Tooltip, and Avatar components
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **UI Components**: Comprehensive set of Radix UI primitives wrapped with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API
- **Module System**: ES modules with modern import/export syntax
- **Development**: Hot reload with Vite middleware integration
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Request/response logging with performance metrics
- **Storage Interface**: Abstract storage interface with in-memory implementation (ready for database integration)

### Data Storage
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Centralized schema definitions in TypeScript
- **Migration System**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configured but not actively used)
- **Current Storage**: In-memory storage implementation for development

### Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Schema**: Basic user model with username/password fields
- **Validation**: Zod schemas for input validation and type inference

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **TypeScript**: Strict type checking with path mapping for clean imports
- **Code Quality**: ESBuild for production builds with external package handling
- **Asset Management**: Alias-based imports for organized code structure

### External Dependencies
- **UI Primitives**: Radix UI for accessible, unstyled components
- **Styling**: Tailwind CSS with custom configuration and design tokens
- **Icons**: Lucide React for consistent icon system
- **Fonts**: Google Fonts integration (Inter, DM Sans, Fira Code, Geist Mono)
- **Date Handling**: date-fns for date manipulation utilities
- **Carousel**: Embla Carousel for smooth carousel interactions
- **Charts**: Recharts for data visualization components
- **Utilities**: Class Variance Authority for component variant management

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Drizzle Kit**: Database migration and introspection tools

### UI & Styling
- **Radix UI**: Complete set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library with consistent design language

### Development Tools
- **Vite**: Frontend build tool with hot module replacement
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Powerful data synchronization for React

### Third-party Services
- **Google Fonts**: Web font service for typography
- **Replit**: Cloud development environment with specialized tooling