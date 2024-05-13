"use client";
import BasicSettingPage from "@/components/settings/BasicSetting";
import BackgroundSettingPage from "@/components/settings/BackgroundSetting";
import styles from "@/public/styles/modal.module.scss";
import { useState } from "react";
import { Modal } from "@/app/@modal/modal";

export default function OptionModal() {
  const [settingOption, setSettingOption] = useState<number>(0);

  return (
    <div>
      <Modal>
        <h1 className={`${styles.title} ${styles.center}`}>
          {settingOption == 0 ? "SETTING" : "SELECT BACKGROUND"}
        </h1>
        {settingOption == 0 ? (
          <BasicSettingPage setSettingOption={setSettingOption} />
        ) : (
          <BackgroundSettingPage />
        )}
      </Modal>
    </div>
  );
}
