````markdown
# Caantin AI Script Builder Node Editor

A specialized component for Caantin AI's voice AI platform allowing non-technical users to create and edit voice conversation flows through an intuitive visual interface. This project implements a full-featured Script Builder with node editing capabilities and visual workflow representation.

## Project Overview

The Script Builder enables Sales & Marketing Managers to create and edit voice conversation nodes without technical expertise. It provides a simple interface to customize node content and preview how it will appear in the conversation flow.

### Implemented Features

#### Must-Have Requirements (P0) ✅

- [x] Form-based editor for configuring node properties
- [x] Support for 3 node types: Greeting, Question, and Information
- [x] Type-specific form fields (message text, question options, etc.)
- [x] Visual preview showing how nodes appear in the flow diagram
- [x] Ability to save node configurations

#### Nice-to-Have Features (P1) ✅

- [x] Validation for required fields
- [x] Toggle to switch between node types
- [x] Visual styling that differentiates node types in the preview
- [x] Responsive design that works on mobile and desktop

#### Additional Enhancements (From Feedback) ✅

- [x] **Node Connectivity** – Users can visually connect nodes using interactive edges
- [x] **More Node Types** – Added Decision, Knowledge, Database, and Transfer node types
- [x] **Drag-and-Drop** – Fully implemented drag-and-drop functionality for node positioning
- [x] **Node Linking** – Interactive connection management between nodes
- [x] **UI Enhancements** – Improved styling to match reference designs
- [x] **Templates System** – Added support for saving and loading workflow templates
- [x] **Dark/Light Mode** – Theme-aware nodes and UI components

## Technology Stack

- **Frontend**: React, Next.js
- **Styling**: TailwindCSS with shadcn/ui components
- **Flow Visualization**: React Flow
- **State Management**: React Context API and hooks
- **Testing**: Jest and React Testing Library

## Getting Started

To run the development server:

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```
````

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

## Live Demo

The application is deployed on Vercel: [https://joe-nzau.vercel.app](https://joe-nzau.vercel.app)

## Project Structure

- `/components/WorkflowEditor` - Core components for the script builder
- `/components/ui` - Reusable UI components
- `/types` - TypeScript type definitions
- `/constants` - Application constants and template data
- `/hooks` - Custom React hooks

## Node Types Supported

The application now supports seven node types:

1. **Greeting** - For initial conversation messages
2. **Question** - For collecting user input with multiple choice options
3. **Information** - For providing information to users
4. **Decision** - For branching conversation flows based on conditions
5. **Knowledge** - For integrating with knowledge base content
6. **Database** - For database interactions
7. **Transfer** - For transferring to human agents

## User Stories Implemented

- [x] "As a Sales Manager, I want to edit the content of conversation nodes so I can customize my script messages."
- [x] "As a Customer Service Lead, I want to configure question options so I can handle different customer responses."
- [x] "As a Business Analyst, I want to preview how nodes will appear so I can ensure they're properly configured."
- [x] "As a Workflow Designer, I want to connect nodes visually to create logical conversation flows."
- [x] "As a Team Manager, I want to save templates that my team can reuse for common scenarios."
- [x] "As a Content Creator, I want to easily position and organize nodes to create clear visual representations."

## Features in Detail

### Node Properties Panel

- Dynamic form fields based on node type
- Real-time validation
- Organized sections for better usability
- Mobile-responsive design

### Visual Flow Editor

- Interactive canvas for node manipulation
- Drag-and-drop placement of nodes
- Visual connections between nodes
- Zoom and pan functionality
- Theme-aware styling

### Templates System

- Save current workflow as a template
- Load predefined templates
- Preview template structure before applying

### Node Types and Styling

- Distinct visual styling for each node type
- Color-coded borders and backgrounds
- Clear visual hierarchy
- Consistent theme support across all components

## Development Approach

This project follows a component-based architecture with clear separation of concerns:

- **WorkflowEditor** - Main container component orchestrating the editor experience
- **NodePanel** - Library of available node types
- **NodePropertiesPanel** - Dynamic form for editing node properties
- **TemplatesPanel** - Interface for managing workflow templates
- **Custom Node Components** - Specialized React Flow node implementations

## Approach and Trade-offs

### Design Philosophy

The implementation prioritizes:

- **User-centered design**: Clear visual differentiation between node types with consistent color coding
- **Component modularity**: Each component has a single responsibility
- **Type safety**: Comprehensive TypeScript definitions ensure robust data handling
- **Visual clarity**: Clean, intuitive interface focusing on the workflow structure

### Technical Decisions

- **React Flow**: Leveraged specialized library for node-based interfaces instead of building from scratch
- **Context API**: Used for theme and basic state management without introducing Redux complexity
- **Constants File**: Centralized template data and styling information for consistency
- **Custom Hooks**: Extracted complex logic into reusable hooks

### Trade-offs Made

1. **Local Storage vs. Backend**: Used local state for data persistence to focus on UI/UX rather than API integration
2. **Template Variety vs. Quality**: Focused on making a few high-quality templates instead of many basic ones
3. **Visual Polish vs. Feature Breadth**: Prioritized polishing core features over adding numerous edge case features
4. **Mobile Experience**: Optimized for tablet and desktop as primary use cases while ensuring mobile compatibility

## Testing

Run tests with:

```bash
yarn test
```

## Deliverables Completed

- [x] Source code repository (GitHub)
- [x] Running prototype (deployed)
- [x] Comprehensive documentation (this README)
- [x] All PRD requirements implemented
- [x] Additional enhancements from feedback implemented

## Future Enhancements

- Undo/redo functionality
- Export/import of workflow JSON
- Collaborative editing features
- Advanced validation rules
- Integration with backend services
- Automated workflow testing tools

## About Caantin AI

Caantin AI is building a voice AI platform for African enterprises that enables automated customer interactions at scale. Learn more at [caantin.com](https://caantin.com).

```

This updated README now includes:

1. All the original PRD requirements as completed items
2. The additional enhancements from the feedback email
3. More detailed descriptions of the implemented features
4. Additional node types as mentioned in the feedback
5. A structured overview of how the implementation addresses all requirements
6. More comprehensive user stories that cover the added functionality
7. A clear organization of the technical approach and design decisions

The README maintains a professional tone while highlighting all the completed work based on both the PRD and feedback.
```
