import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clubs from "./pages/Clubs";
import Faculty from "./pages/Faculty";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import IndustryInteraction from "./pages/IndustryInteraction";
import Achievements from "./pages/Achievements";
import Research from "./pages/Research";
import Placements from "./pages/Placements";
import MOUs from './pages/MOUs';
import Newsletters from './pages/Newsletters';
import EventsPage from "@/pages/Events";
import AdmissionAgentWidget from "./agent/AdmissionAgentWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="transform-gpu will-change-auto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/mous" element={<MOUs />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/research" element={<Research />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/iii" element={<IndustryInteraction />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* ── AI Admission Counselor – floats on every page ── */}
        <AdmissionAgentWidget />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
