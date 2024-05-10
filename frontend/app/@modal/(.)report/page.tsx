"use client";

import { ReportModal } from "../report-modal";
import DamagochiHealth from "@/components/report/DamagochiHealth";
import DamagochiHistory from "@/components/report/DamagochiHistory";
import UserHealth from "@/components/report/UserHealth";
import UserHistory from "@/components/report/UserHistory";
import { useState } from "react";

export default function ModalReport() {
  const [activeMenu, setActiveMenu] = useState("damagochi-report");

  const getComponent = () => {
    switch (activeMenu) {
      case "damagochi-report":
        return <DamagochiHealth />;
      case "user-report":
        return <DamagochiHistory />;
      case "damagochi-history":
        return <UserHealth />;
      case "user-history":
        return <UserHistory />;
      default:
        return null;
    }
  };

  return (
    <ReportModal activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      {getComponent()}
    </ReportModal>
  );
}
