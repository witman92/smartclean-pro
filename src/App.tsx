import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Quotation from "./pages/Quotation";
import ClientDashboard from "./pages/ClientDashboard";
import PartnerJobs from "./pages/PartnerJobs";
import PartnerProfile from "./pages/PartnerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/cotizar" element={<Quotation />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          
          {/* Partner Routes */}
          <Route path="/partner" element={<PartnerJobs />} />
          <Route path="/partner/perfil" element={<PartnerProfile />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
