"use client";

import { useEffect } from "react";

export function DevTools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    void import("react-scan").then(({ scan }) => {
      scan({ enabled: true, showToolbar: true });
    });

    void import("react-grab").then(({ init }) => {
      init();
    });
  }, []);

  return null;
}
