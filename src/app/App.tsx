import { useState, useCallback } from "react";
import Frame31 from "../imports/Frame2147240606/Frame2147240606";
import { IMSImportScreen } from "./components/IMSImportScreen";
import { BenchmarksModal, DEFAULT_BENCHMARKS, type Benchmarks } from "./components/BenchmarksModal";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScanningScreen } from "./components/ScanningScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { MarketingScreen } from "./components/MarketingScreen";

type Screen = "import" | "loading" | "synced" | "scanning" | "dashboard" | "marketing";

export default function App() {
  const [screen, setScreen] = useState<Screen>("import");
  const [imsName, setImsName] = useState<string>("Vincue");
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);
  const [benchmarks, setBenchmarks] = useState<Benchmarks>(DEFAULT_BENCHMARKS);

  // After IMS pick: capture benchmarks before starting the import animation
  const handleImport = useCallback((name: string) => {
    setImsName(name);
    setBenchmarksOpen(true);
  }, []);

  const handleBenchmarksSubmit = useCallback((b: Benchmarks) => {
    setBenchmarks(b);
    setBenchmarksOpen(false);
    setScreen("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setScreen("synced");
  }, []);

  const handleSyncedClick = (e: React.MouseEvent) => {
    let el: HTMLElement | null = e.target as HTMLElement;
    while (el) {
      if (el.textContent?.toLowerCase().includes("scan your inventory")) {
        setScreen("scanning");
        return;
      }
      el = el.parentElement;
    }
  };

  const handleNav = (label: string) => {
    if (label === "Marketing") setScreen("marketing");
    else if (label === "Studio AI" || label === "Inventory") setScreen("dashboard");
  };

  if (screen === "marketing") {
    return (
      <div className="size-full overflow-auto">
        <MarketingScreen onNavigate={handleNav} />
      </div>
    );
  }

  if (screen === "dashboard") {
    return (
      <div className="size-full overflow-auto">
        <DashboardScreen benchmarks={benchmarks} onNavigate={handleNav} />
      </div>
    );
  }

  if (screen === "scanning") {
    return (
      <div className="size-full overflow-auto">
        <ScanningScreen
          imsName={imsName}
          benchmarks={benchmarks}
          onFinish={() => setScreen("dashboard")}
        />
      </div>
    );
  }

  if (screen === "synced") {
    return (
      <div className="size-full overflow-auto" onClick={handleSyncedClick}>
        <Frame31 />
      </div>
    );
  }

  if (screen === "loading") {
    return (
      <div className="size-full overflow-auto">
        <LoadingScreen onComplete={handleLoadingComplete} />
      </div>
    );
  }

  return (
    <div className="size-full">
      <IMSImportScreen onImport={handleImport} />
      <BenchmarksModal
        open={benchmarksOpen}
        imsName={imsName}
        onClose={() => setBenchmarksOpen(false)}
        onSubmit={handleBenchmarksSubmit}
      />
    </div>
  );
}
