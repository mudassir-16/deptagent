
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more optimized rendering approach
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Removed transform-gpu from #root as it breaks position: fixed for descendant elements

root.render(<App />);
