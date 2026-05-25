import { useState, useCallback } from "react";
import Frame31 from "../imports/Frame2147240606/Frame2147240606";
import { IMSImportScreen } from "./components/IMSImportScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScanningScreen } from "./components/ScanningScreen";
import { DashboardScreen } from "./components/DashboardScreen";

type Screen = "import" | "loading" | "synced" | "scanning" | "dashboard";

export default function App() {
  const [screen, setScreen] = useState<Screen>("import");
  const [imsName, setImsName] = useState<string>("Vincue");

  const handleImport = useCallback((name: string) => {
    setImsName(name);
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

  if (screen === "dashboard") {
    return (
      <div className="size-full overflow-auto">
        <DashboardScreen />
      </div>
    );
  }

  if (screen === "scanning") {
    return (
      <div className="size-full overflow-auto">
        <ScanningScreen imsName={imsName} onFinish={() => setScreen("dashboard")} />
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
    </div>
  );
}
