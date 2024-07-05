"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

const QrCode = ({ email }: { email: string }) => {
  const { Canvas, SVG } = useQRCode();
  return (
    <Canvas
      text={email}
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
