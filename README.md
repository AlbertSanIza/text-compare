# Text Compare

A modern, responsive web application for comparing text differences built with React, TypeScript, and Tailwind CSS.

## Features

- **Side-by-side text comparison**: Enter or paste text in two separate fields to compare them
- **Real-time diff visualization**: See differences highlighted in real-time as you type
- **Character-level diffing**: Uses precise character-based comparison algorithm
- **Persistent storage**: Your text is automatically saved to localStorage and restored when you return
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **Clean interface**: Modern UI with clear visual indicators for additions and deletions
- **Line numbers**: Easy-to-read line numbering for reference

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **diff.js** - Text diffing algorithm

## Usage

1. **Enter Original Text**: Paste or type your original text in the left textarea
2. **Enter Modified Text**: Paste or type your modified text in the right textarea
3. **View Differences**: The diff will appear below, showing:
    - 🟢 **Green highlighting**: Added text
    - 🔴 **Red highlighting**: Removed text
    - Regular text: Unchanged content

### Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles
├── components/
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── label.tsx
│       └── textarea.tsx
└── lib/
    └── utils.ts         # Utility functions
```
