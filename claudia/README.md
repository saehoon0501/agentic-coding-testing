# Claudia - Agentic Coding Test Application

A React application built with Vite for testing agentic coding tools and methodologies. This project features a timebox timer with various enhancements including dark mode, sound alerts, and local storage functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the claudia directory:
   ```bash
   cd claudia
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your specific configuration values.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
claudia/
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── app.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles
│   └── theme.js           # Theme configuration
├── tests/                  # Test files
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation (this file)
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **UI Library**: Material-UI (MUI) 7.2.0
- **Styling**: Tailwind CSS 3.4.15 + Inline Styles
- **Code Quality**: ESLint 9.29.0
- **Development**: Hot Module Replacement (HMR)

## ✨ Features

- **Timebox Timer**: Core timer functionality for productivity
- **Dark Mode Support**: Toggle between light and dark themes
- **Sound Alerts**: Audio notifications when timer completes
- **Local Storage**: Persistent storage of timer history
- **Responsive Design**: Works on desktop and mobile devices
- **Countdown Animation**: Visual progress indicator

## 🏗️ Architecture

This application follows modern React patterns:

- **Functional Components**: Uses React hooks for state management
- **Component Composition**: Modular and reusable component structure
- **Inline Styling**: Primary styling approach with Material-UI components
- **No External State Management**: Relies on React's built-in state
- **ES6+ Modules**: Modern JavaScript import/export syntax

## 🧪 Testing

Test files should be placed in the `tests/` directory. The project is set up to support:

- Unit testing with Jest (to be configured)
- Component testing with React Testing Library (to be configured)
- Integration tests (to be configured)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

- `NODE_ENV`: Application environment (development/production/test)
- `VITE_PORT`: Development server port (default: 5173)
- `VITE_HOST`: Development server host (default: localhost)

### Build Configuration

The project uses Vite for building and bundling:

- Development: Fast HMR and development server
- Production: Optimized builds with code splitting
- Preview: Local preview of production builds

## 🤝 Development Guidelines

- Use functional components with hooks
- Follow Material-UI design patterns
- Maintain responsive design principles
- Keep components modular and reusable
- Use descriptive component and variable names
- Include proper error handling
- Follow ESLint rules for code consistency

## 📦 Dependencies

### Production Dependencies
- React & React DOM for UI framework
- Material-UI for component library
- Emotion for CSS-in-JS styling
- Tailwind CSS for utility-first styling

### Development Dependencies
- Vite for build tooling and development server
- ESLint for code quality and consistency
- Various plugins for React and Vite integration

## 🔄 Git Workflow

This project uses git worktrees for parallel development:

- Each feature branch has its own worktree directory
- Primary development occurs in the `claudia/` folder
- Follow conventional commit messages
- Use feature branches for new functionality

## 📝 License

This project is part of an agentic coding tools testing repository.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `.env` file or kill the process using the port
2. **Dependencies not found**: Run `npm install` to ensure all packages are installed
3. **Build failures**: Check for syntax errors and run `npm run lint`
4. **Hot reload not working**: Restart the development server

### Getting Help

- Check the console for error messages
- Review the browser developer tools
- Ensure all dependencies are properly installed
- Verify environment variables are correctly set

---

For more information about the testing framework and methodology, see the main repository documentation.