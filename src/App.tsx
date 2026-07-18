import { useState, useCallback } from "react";
import Navbar, { type Page } from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import HomePage from "./pages/HomePage";
import TiersPage from "./pages/TiersPage";
import ConsultationPage from "./pages/ConsultationPage";
import SuccessPage from "./pages/SuccessPage";

export default function App() {
  const [page, setPage] = useState<Page | "success">("home");
  const [preselectedTier, setPreselectedTier] = useState<string | null>(null);

  const navigate = useCallback((next: Page | "success", tier?: string) => {
    if (tier) setPreselectedTier(tier);
    setPage(next);
  }, []);

  const isSuccess = page === "success";

  return (
    <div className="min-h-screen bg-ink-950 relative">
      {/* Global ambient glow */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] glow-radial-cyan opacity-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] glow-radial-orange opacity-10 pointer-events-none" />

      <Navbar
        current={page === "success" ? "consultation" : page}
        onNavigate={(p) => navigate(p)}
      />

      <PageTransition pageKey={page}>
        {page === "home" && <HomePage onNavigate={(p) => navigate(p)} />}
        {page === "tiers" && <TiersPage onNavigate={(p) => navigate(p)} />}
        {page === "consultation" && (
          <ConsultationPage
            onNavigate={(p) => navigate(p)}
            preselectedTier={preselectedTier}
          />
        )}
        {page === "success" && <SuccessPage onNavigate={(p) => navigate(p)} />}
      </PageTransition>

      {!isSuccess && <Footer onNavigate={(p) => navigate(p)} />}
    </div>
  );
}
