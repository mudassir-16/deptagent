
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more optimized rendering approach
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Add a class to the root element to optimize rendering
rootElement.classList.add('transform-gpu', 'will-change-auto');

root.render(<App />);
