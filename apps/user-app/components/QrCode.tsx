"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

const QrCode = () => {
  const { Canvas, SVG } = useQRCode();
  return (
    <Canvas
      text={"https://github.com/bunlong/next-qrcode"}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          //   dark: "#010599FF",
          dark: "#000000",
          //   light: "#FFBF60FF",
        },
      }}
    />
  );
};

export default QrCode;
