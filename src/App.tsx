import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlessingProvider } from "@/context/BlessingContext";
import EntryPage from "./pages/EntryPage";
import HomePage from "./pages/HomePage";
import BlessingEditPage from "./pages/BlessingEditPage";
import BlessingSuccessPage from "./pages/BlessingSuccessPage";
import BlessingViewPage from "./pages/BlessingViewPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BlessingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 1. NFC 路径：捕获任何路径参数，并将其传递给 EntryPage */}
            <Route path="/:nfcId" element={<EntryPage />} />
            {/* 2. 没有参数时访问 EntryPage */}
            <Route path="/" element={<EntryPage />} />
            
            <Route path="/home" element={<HomePage />} />
            <Route path="/edit" element={<BlessingEditPage />} />
            <Route path="/success" element={<BlessingSuccessPage />} />
            <Route path="/view" element={<BlessingViewPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BlessingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
