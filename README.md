# PromptForge

An AI-powered web application builder that generates complete React applications from natural language prompts using Claude AI and WebContainer.

# Preview
<img width="1878" height="822" alt="Image" src="https://github.com/user-attachments/assets/43a2b7ab-e8a4-4f42-8f41-b67f8f4c58a5" />
<img width="581" height="355" alt="Image" src="https://github.com/user-attachments/assets/fbb3cf39-21c5-4f2c-95b1-a91d0dbf5b8f" />

## 🧠 My Journey & Learnings

I built PrompForge completely on my own to understand how modern AI coding tools actually work under the hood.

Major challenges I solved:
- Creating a strong System Prompt that makes Claude output clean, structured XML
- Building a custom real-time parser to handle streaming tokens from the LLM
- Integrating WebContainers to run full Node.js environment directly in the browser
- Managing complex state synchronization between AI output and virtual filesystem
- Focusing on great user experience instead of just making it work

## Features

- **Natural Language to Code**: Describe your app in plain English and get a fully functional React application
- **Real-time Preview**: See your app running live in the browser as it's being built
- **Iterative Development**: Modify and enhance your app with additional prompts
- **WebContainer Integration**: Run applications in isolated browser environments
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Vite

## Architecture

### Backend (`/be`)
- **Express.js** server with TypeScript
- **Claude AI** integration for code generation
- **CORS** enabled for frontend communication
- **Template detection** for React vs Node.js projects

### Frontend (`/frontend`)
- **React** with TypeScript
- **Vite** for fast development
- **WebContainer** for isolated app execution
- **Tailwind CSS** for styling
- **React Router** for navigation

## Prerequisites

- Node.js 18+
- npm or yarn
- Claude AI API key (set in `.env`)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PromptForge
   ```

2. **Install backend dependencies**
   ```bash
   cd be
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `/be` directory:
   ```
   ANTHROPIC_API_KEY=your_claude_api_key_here
   ```

5. **Start the backend server**
   ```bash
   cd be
   npm run dev
   ```
   The backend will run on `http://localhost:3002`

6. **Start the frontend server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or next available port)

## Usage

1. Open your browser and navigate to the frontend URL
2. Enter a description of the app you want to build (e.g., "create a todo app")
3. Click "Generate Website Plan"
4. Watch as the system:
   - Analyzes your prompt
   - Generates all necessary files
   - Sets up the project structure
   - Installs dependencies
   - Runs the development server
5. View your live application in the preview pane
6. Use the "Send" button to make modifications and improvements

## How It Works

1. **Prompt Analysis**: The backend uses Claude AI to determine if your request is for a frontend or backend application
2. **Artifact Generation**: Claude generates a complete `<boltArtifact>` containing all files, dependencies, and shell commands
3. **Step Execution**: The frontend parses the artifact and executes each step in WebContainer
4. **Live Preview**: Your application runs in an isolated browser environment with real-time updates

## Project Structure

```
PromptForge/
├── be/                          # Backend (Express.js + TypeScript)
│   ├── src/
│   │   ├── index.ts            # Main server file
│   │   ├── prompts.ts          # AI prompts and system instructions
│   │   ├── constants.ts        # Application constants
│   │   ├── stripindents.ts     # String utilities
│   │   └── defaults/           # Default prompts for different project types
│   │       ├── node.ts
│   │       └── react.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── App.tsx             # Main React app
│   │   ├── config.ts           # Configuration constants
│   │   ├── steps.ts            # XML parsing utilities
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── components/         # React components
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── FileExplorer.tsx
│   │   │   ├── PreviewFrame.tsx
│   │   │   └── ...
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useWebContainer.ts
│   │   └── pages/              # Page components
│   │       ├── Home.tsx
│   │       └── Builder.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

### Backend API

- `POST /template` - Analyze prompt and return project template
- `POST /chat` - Generate code artifacts for app modifications

### Request/Response Format

**Template Request:**
```json
{
  "prompt": "create a todo app"
}
```

**Template Response:**
```json
{
  "prompts": ["system prompt", "user prompt"],
  "uiPrompts": ["parsed artifact"]
}
```

## Development

### Adding New Features

1. **Backend**: Add new endpoints in `be/src/index.ts`
2. **Frontend**: Create new components in `frontend/src/components/`
3. **AI Prompts**: Modify prompts in `be/src/prompts.ts`

### Testing

```bash
# Backend tests
cd be && npm test

# Frontend tests
cd frontend && npm test
```

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, TypeScript, Anthropic Claude AI
- **Containerization**: WebContainer API
- **Build Tools**: Vite, TypeScript Compiler
- **Styling**: Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## Support

For issues and questions:
- Check the troubleshooting section below
- Open an issue on GitHub
- Review the code comments for implementation details

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 3002 or 5173 are in use, the servers will automatically use the next available port
2. **CORS errors**: Ensure the backend CORS configuration includes your frontend URL
3. **API key issues**: Verify your Claude AI API key is correctly set in the `.env` file
4. **WebContainer errors**: Check browser console for WebContainer-specific issues

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=promptforge:*
```

## Future Enhancements

- [ ] Support for additional frameworks (Vue, Svelte, Angular)
- [ ] Database integration templates
- [ ] Authentication system templates
- [ ] Mobile-responsive design improvements
- [ ] Export functionality for generated projects
- [ ] Collaboration features for team development
