import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { BrandProfileBuilder } from "@/components/landing/BrandProfileBuilder";
import { AutonomousFlywheel } from "@/components/landing/AutonomousFlywheel";
import { AutoLearnCycleDemo } from "@/components/landing/AutoLearnCycleDemo";
import { CreativesShowcase } from "@/components/landing/CreativesShowcase";
import { VideoShowcase } from "@/components/landing/VideoShowcase";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { AUTH_URL } from "@/lib/config";

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleScrollToVault = () => {
    document.getElementById("brand-vault")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenGetStarted={() => window.location.assign(AUTH_URL)}
      />

      <main className="flex-1">
        <Hero onScrollToVault={handleScrollToVault} onOpenDemo={() => setIsDemoModalOpen(true)} />
        <BrandProfileBuilder
          onAutopilotActivated={() => {
            document.getElementById("auto-learn")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <AutonomousFlywheel />
        <AutoLearnCycleDemo />
        <CreativesShowcase />
        <VideoShowcase onOpenDemo={() => setIsDemoModalOpen(true)} />
        <ComparisonTable />
        <PricingSection />
        <FaqSection />
        <CtaSection onStartWithUrl={() => handleScrollToVault()} />
      </main>

      <Footer />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenVault={handleScrollToVault}
      />
    </div>
  );
}
