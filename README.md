# Caantin AI Script Builder Node Editor

A specialized component for Caantin AI's voice AI platform allowing non-technical users to create and edit voice conversation flows through an intuitive visual interface. This project focuses on the Node Properties Panel with a preview of how nodes appear visually.

## Project Overview

The Script Builder Node Editor enables Sales & Marketing Managers to create and edit voice conversation nodes without technical expertise. It provides a simple interface to customize node content and preview how it will appear in the conversation flow.

### Key Features

- Form-based editor for configuring node properties
- Support for 3 node types: Greeting, Question, and Information
- Type-specific form fields for each node type
- Visual preview showing how nodes appear in the flow diagram
- Simple save and edit functionality

## Technology Stack

- **Frontend**: React, Next.js
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Context API
- **Testing**: Jest and React Testing Library

## Getting Started

To run the development server:

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Live Demo

The application is deployed on Vercel: [https://caantin-script-builder-node-editor.vercel.app/node-editor](https://caantin-script-builder-node-editor.vercel.app/node-editor)

## Project Structure

- `/components/script-builder` - Core components for the node editor
- `/components/ui` - Reusable UI components
- `/types` - TypeScript type definitions
- `/contexts` - React Context providers

## Node Types

The application supports three node types:

1. **Greeting** - For initial conversation messages
2. **Question** - For collecting user input with multiple choice options
3. **Information** - For providing information to users

## Development Approach

This project follows a component-based architecture with clear separation of concerns. The main components are:

- `NodeProperties` - Form-based editor for node configuration
- `NodePreview` - Visual representation of how nodes appear in the flow
- `NodeTypeSelector` - Interface for switching between node types

## Approach and Trade-offs

### Design Philosophy

I approached this technical challenge with a focus on creating an intuitive user experience for non-technical users while maintaining a clean, maintainable code architecture. The implementation prioritizes:

- **User-centered design**: Clear visual differentiation between node types with consistent color coding and intuitive form layouts
- **Component modularity**: Each component has a single responsibility, making the codebase easier to maintain and extend
- **Type safety**: Comprehensive TypeScript definitions ensure robust data handling

### Technical Decisions

- **Local state management**: Used React's Context API instead of more complex state management solutions like Redux, as the scope of the application didn't warrant the additional complexity
- **Shadcn/UI components**: Leveraged pre-built UI components to accelerate development while maintaining visual consistency
- **Custom styling**: Extended TailwindCSS with custom utility classes for node-specific styling

### Trade-offs Made

1. **Simplicity vs. Completeness**: Focused on making the three node types work perfectly rather than implementing a broader range of features
2. **Visual vs. Functional**: Prioritized a clean, responsive UI that works well on all devices over adding more advanced features
3. **Testing approach**: Emphasized component unit tests over end-to-end testing to ensure core functionality works while keeping the development cycle fast
4. **Form validation**: Implemented basic validation to ensure required fields are filled while leaving more sophisticated validation for future iterations

## Testing

Run tests with:

```bash
yarn test
```

## Future Enhancements

- Advanced validation for required fields
- More sophisticated node type visualization
- Drag-and-drop node positioning
- Connection management between nodes

## About Caantin AI

Caantin AI is building a voice AI platform for African enterprises that enables automated customer interactions at scale. Learn more at [caantin.ai](https://caantin.com).
