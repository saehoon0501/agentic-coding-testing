# Agentic Coding Tools Testing Repository

## Overview

This repository is designed for testing and comparing various agentic coding tools and their unique rule/instruction formats. The project serves as a practical testing ground to evaluate how different AI coding assistants handle project-specific guidelines and coding conventions.

## Tested Tools

### 1. **Codex**
- **Directory**: `codex/`
- **Rule Format**: Uses `AGENTS.md` files
- **Scope**: Instructions apply to the entire directory tree rooted at the folder containing the AGENTS.md file
- **Key Features**:
  - Can be placed anywhere in the filesystem (/, ~, Git repos)
  - Provides coding conventions, code organization info, and testing instructions
  - Supports programmatic checks that must be validated after changes
  - Nested AGENTS.md files take precedence over parent files
  - Direct system/user instructions override AGENTS.md instructions

### 2. **Claude (Claudia)**
- **Directory**: `claudia/`
- **Rule Format**: Uses `CLAUDE.md` files
- **Scope**: Automatically pulled into context when starting conversations
- **Key Features**:
  - Can be placed in repo root, parent directories, child directories, or home folder (~/.claude/)
  - Ideal for documenting common bash commands, core files, code style guidelines
  - Supports both checked-in (CLAUDE.md) and local (CLAUDE.local.md) variants
  - Automatically generates CLAUDE.md when using `/init` command
  - Optimizes context gathering and token usage

### 3. **Cursor**
- **Directory**: `cursor/`
- **Rule Format**: Uses `.cursor/rules` directory with `.mdc` files (MDC format)
- **Scope**: Can be scoped using path patterns and applied based on relevance
- **Key Features**:
  - Version-controlled rule files in `.cursor/rules` directories
  - Supports multiple rule types:
    - **Always**: Always included in model context
    - **Auto Attached**: Included when files matching glob patterns are referenced
    - **Agent Requested**: AI decides whether to include (requires description)
    - **Manual**: Only included when explicitly mentioned using @ruleName
  - Nested rules automatically attach when files in their directory are referenced
  - Supports metadata and content in MDC format

## Test Scenario

### 🛑 Task 1: Add Pause and Reset Controls

"Add a Pause and Reset button to the <TimeboxTimer /> component. The Pause button should stop the countdown, and the Reset button should clear the timer and allow the user to enter a new task."

### 🔔 Task 2: Play a Sound and Show an Alert When Time Is Up

"When the countdown reaches zero, play a short chime sound (local file) and show a modal or toast that says 'Timebox complete!' using mui components."

### 💾 Task 3: Store Timeboxes in LocalStorage

"Save completed timeboxes (task name, duration, and completion timestamp) to localStorage. Also, display a history of the last 5 timeboxes below the timer."

### 🎨 Task 4: Animate the Timer Countdown Circle

"Add a circular progress bar around the timer that visually counts down using SVG or canvas. Animate the circle to decrease smoothly in sync with the timer."

### 🌙 Task 5: Add Dark Mode Support

"Enable dark mode using Tailwind's built-in dark mode class and update mui theme config to support both light and dark styles. Add a toggle button at the top of the page."



## Project Structure

```
agentic-coding-tools-testing/
├── README.md                 # This overview document
├── package.json              # Root workspace configuration and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore patterns
├── AGENTS.md                # Project rules for Codex
├── CLAUDE.md                # Project rules for Claude Code
│
├── start_template/          # Base template for new tool tests
│   ├── src/                # Source code directory
│   │   ├── app.jsx         # Main React application
│   │   ├── main.jsx        # React entry point
│   │   └── timeboxTimer.jsx # Sample component for testing
│   ├── package.json        # Dependencies and scripts
│   ├── vite.config.js      # Vite configuration
│   └── eslint.config.js    # ESLint configuration
│
├── codex/                  # Codex testing environment
│   ├── src/                # Source code directory
│   ├── rules/              # Codex-specific rule files
│   ├── package.json        # Project dependencies
│   └── [config files]      # Build and linting configuration
│
├── claudia/                # Claude testing environment  
│   ├── src/                # Source code directory
│   ├── package.json        # Project dependencies
│   └── [config files]      # Build and linting configuration
│
└── cursor/                 # Cursor testing environment
    ├── src/                # Source code directory
    ├── package.json        # Project dependencies
    └── [config files]      # Build and linting configuration
```

## Sample Application

All environments contain a consistent React application featuring:
- A timebox timer component for productivity tracking
- Modern React patterns and hooks
- Responsive design principles
- ESLint configuration for code quality

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd agentic-coding-tools-testing
   ```

2. **Install all dependencies (recommended for testing)**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your specific configuration
   ```

### Working with Individual Environments

#### Option 1: Using Root-Level Scripts (Recommended)
```bash
# Start development server for specific environment
npm run dev:claudia     # Claude testing environment
npm run dev:codex       # Codex testing environment  
npm run dev:cursor      # Cursor testing environment
npm run dev:start-template  # Base template

# Run linting for all environments
npm run lint:all

# Build all environments
npm run build:all
```

#### Option 2: Working Directly in Sub-Projects
```bash
# Navigate to specific environment
cd [claudia|codex|cursor|start_template]

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Development Workflow

1. **Choose your testing environment** based on which AI coding assistant you want to test
2. **Follow the specific rule format** for that environment (see sections above)
3. **Implement the test tasks** using the AI assistant
4. **Compare results** across different environments

## Testing Methodology

This repository enables systematic testing of:
- **Rule adherence**: How well each tool follows project-specific guidelines
- **Code quality**: Consistency in generated code across different tools
- **Integration**: How tools work with existing project structures
- **Performance**: Speed and efficiency of code generation and modification
- **Context understanding**: How well tools understand and apply project context