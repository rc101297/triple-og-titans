# 🏋️‍♂️ Triple OG Titans - Fitness Tracking App

**"Train Hard. Become Legendary."**

A modern, responsive fitness tracking application built with Vue 3 that empowers users to manage their workouts, track progress, and achieve their fitness goals.

## 📋 Table of Contents

- [Technical Specification](#technical-specification)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 📚 Technical Specification

### Project Overview

**Triple OG Titans** is a comprehensive fitness tracking application designed for strength training enthusiasts. The application provides a seamless user experience for managing workout routines, tracking progress, and maintaining motivation through gamified elements and intuitive design.

**Core Philosophy:** Empower users to forge their path to greatness through structured workout management and progress tracking.

### Business Requirements

- **User Management:** Secure authentication with JWT tokens
- **Workout Tracking:** CRUD operations for workout management
- **Progress Monitoring:** Completion status and historical tracking
- **Responsive Design:** Optimized for mobile and desktop experiences
- **Brand Consistency:** Unique Titan-themed branding throughout

## ✨ Features

### 🔐 Authentication System

- User registration and login
- JWT-based secure authentication
- Conditional UI based on login state
- Logout functionality with session cleanup

### 💪 Workout Management

- **Create:** Add new workouts with name and duration
- **Read:** View all workouts with status indicators
- **Update:** Edit workout details (disabled for completed workouts)
- **Delete:** Remove unwanted workouts
- **Complete:** Mark workouts as completed with status transitions

### 🎨 User Experience

- Confirmation modals for critical actions
- Real-time feedback with toast notifications
- Responsive design for all device sizes
- Smooth animations and transitions
- Brand-consistent color scheme and typography

### 🎯 Advanced Features

- Inline editing for workout modifications
- Conditional button states based on workout status
- Loading states and error handling
- Mobile-optimized navigation
- Progressive enhancement patterns

## 🛠️ Tech Stack

### Frontend Framework

- **Vue 3** (3.5.22) - Progressive JavaScript framework with Composition API
- **Vite** (7.1.7) - Fast build tool and development server

### State Management

- **Pinia** (3.0.3) - Intuitive state management for Vue

### Routing & Navigation

- **Vue Router** (4.6.3) - Official Vue.js routing library

### UI Framework & Styling

- **Bootstrap 5** (5.3.8) - Popular CSS framework
- **Bootstrap Icons** (1.13.1) - Icon library
- **Custom CSS Variables** - Brand-specific color system

### HTTP Client & API

- **Axios** (1.13.1) - Promise-based HTTP client with interceptors
- **JWT Authentication** - Secure token-based auth flow

### User Experience

- **Notyf** (3.10.0) - Clean notification system
- **SweetAlert2** (11.26.3) - Styled modal dialog management

### Development Tools

- **@vitejs/plugin-vue** (6.0.1) - Vue integration for Vite
- **ESLint-ready** - Code quality and consistency

## 🏗️ Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavbarComponent.vue     # Main navigation
│   ├── FooterComponent.vue     # Site footer
│   ├── HomeComponent.vue       # Landing page
│   ├── AddWorkoutComponent.vue # Workout creation modal
│   └── MyWorkoutsComponent.vue # Workout list & management
├── pages/              # Route-based page components
│   ├── LoginPage.vue          # Authentication
│   ├── RegistrationPage.vue   # User signup
│   ├── WorkoutPage.vue        # Main workout interface
│   └── LogoutPage.vue         # Session cleanup
├── stores/             # Pinia state management
│   └── global.js              # Global app state
├── assets/            # Static assets
│   ├── main.css              # Global styles & variables
│   └── [images]              # Brand assets
├── api.js             # HTTP client configuration
├── App.vue           # Root component
└── main.js           # Application entry point
```

### State Management Pattern

```javascript
// Pinia Store Structure
{
  user: {
    token: null,
    email: null,
    isAdmin: false,
    isLoading: false,
    // ... other user properties
  }
}
```

### Component Architecture

- **Composition API:** Modern Vue 3 script setup syntax
- **Scoped Styling:** Component-specific CSS isolation
- **Reactive Props:** Dynamic data flow between components
- **Event Communication:** Custom events for parent-child communication

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** (>=18.0.0)
- **npm** (>=9.0.0) or **yarn**
- **Backend API** running (see API section)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fitnessApp-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:

   ```
   VITE_FITNESS_APP_API=<your-backend-api-url>
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   ```
   http://localhost:5174
   ```

## 💻 Development

### Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

### Development Workflow

1. **Component Development**

   - Use Vue 3 Composition API
   - Follow scoped styling patterns
   - Implement responsive design principles

2. **State Management**

   - Use Pinia for reactive state
   - Implement proper error boundaries
   - Follow Vue composition patterns

3. **API Integration**
   - Use Axios interceptors for auth
   - Handle loading states properly
   - Implement error handling patterns

### Code Quality

- **Vue 3 Composition API** for reactive logic
- **Scoped CSS** for component isolation
- **Responsive design** with Bootstrap utilities
- **Error boundaries** and proper exception handling
- **Accessibility** considerations in all components

## 🔌 API Integration

### Backend API Requirements

The application expects a REST API with the following structure:

**Base URL:** `VITE_FITNESS_APP_API` environment variable

#### Authentication Endpoints

- `POST /users/register` - User registration
- `POST /users/login` - User authentication
- `GET /users/details` - Get user profile (authenticated)

#### Workout Endpoints

- `POST /workouts/addWorkout` - Create new workout
- `GET /workouts/getMyWorkouts` - List user workouts
- `PATCH /workouts/updateWorkout/:id` - Update workout details
- `PATCH /workouts/completeWorkoutStatus/:id` - Mark workout complete
- `DELETE /workouts/deleteWorkout/:id` - Delete workout

### Authentication Flow

1. User submits login/register form
2. JWT token received and stored in localStorage
3. Token automatically included in subsequent API calls
4. UI updates based on authentication state
5. Logout clears token and resets application state

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Considerations

- Ensure backend API is deployed and accessible
- Set proper `VITE_FITNESS_APP_API` environment variable
- Configure CORS settings on backend for production domain

### Recommended Hosting

- **Vercel** - Seamless Vue.js deployment
- **Netlify** - Good for static sites with forms
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free hosting option

## 🤝 Contributing

### Development Guidelines

1. **Code Standards**

   - Use Vue 3 Composition API patterns
   - Follow component naming conventions
   - Maintain responsive design principles

2. **Testing Approach**

   - Test authentication flows thoroughly
   - Validate API error scenarios
   - Check responsive behavior on multiple devices

3. **Documentation**
   - Keep this README updated
   - Document new features and API endpoints
   - Maintain code comments for complex logic

### Feature Requests

When proposing new features:

- Describe the user problem being solved
- Provide mockups or wireframes if applicable
- Consider the impact on existing functionality
- Follow the established brand and design language

## 📞 Support & Contact

For questions, bug reports, or feature requests, please:

- Check existing documentation
- Search known issues
- Create detailed bug reports with reproduction steps
- Include screenshots for UI-related issues

---

**Built with passion for fitness enthusiasts by the Triple OG Titans development team.**
