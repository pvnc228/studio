# RouteWise

This is a Next.js application built in Firebase Studio for personalized travel route planning in Russian cities.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

To start the Next.js development server:

```bash
npm run dev
# or
# yarn dev
```

This will typically start the server on `http://localhost:9002`. Open this URL in your browser to see the application.

### Running the Genkit Development Server (Optional)

If you need to interact with the Genkit flows directly or use the Genkit developer UI:

```bash
npm run genkit:dev
# or for watching changes
npm run genkit:watch
```

This will start the Genkit development server, usually on `http://localhost:4000`.

### Building for Production

To build the application for production:

```bash
npm run build
# or
# yarn build
```

### Starting the Production Server

After building, you can start the production server:

```bash
npm run start
# or
# yarn start
```

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) with [Google AI (Gemini)](https://ai.google.dev/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **Package Manager:** npm / yarn

## Project Structure

- `src/app/`: Contains the main application pages and layout (Next.js App Router).
- `src/components/`: Reusable React components.
  - `src/components/ui/`: Components from ShadCN UI.
- `src/ai/`: Genkit related code.
  - `src/ai/flows/`: Genkit flows for AI interactions.
  - `src/ai/ai-instance.ts`: Genkit configuration.
- `src/services/`: Contains service functions, like fetching place data.
- `src/lib/`: Utility functions.
- `src/hooks/`: Custom React hooks.
- `public/`: Static assets.
- `styles/`: Global CSS styles.
```