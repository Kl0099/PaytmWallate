"use client";
import { useEffect, useRef, useState } from "react";

// Styles
import "../app/globals.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrImage from "../app/Qr-image.svg";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { decryption, validateUser } from "../app/lib/encryption";
import ErrorComponent from "./ErrorComponent";
// import QrFrame from "../assets/qr-frame.svg";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const router = useRouter();
  const [qrcodescanneddata, setqrcodescanneddata] = useState({
    number: "",
    token: "",
  });

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  // const validateUser = (value: string): boolean => {
  //   let newData = value.split("?number=");

  //   // Check if newData array has exactly two parts
  //   if (newData.length === 2) {
  //     // Extract the UUID part (newData[0]) and the phone number part (newData[1])
  //     const uuidPart = newData[0] || "";
  //     const phoneNumber = newData[1] || "";

  //     // Check if uuidPart is a valid UUID and phoneNumber is exactly 10 characters and consists only of digits
  //     if (
  //       /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
  //         uuidPart
  //       ) &&
  //       /^\d{10}$/.test(phoneNumber)
  //     ) {
  //       return true; // Valid format
  //     }
  //   }

  //   return false; // Invalid format or missing parts
  // };
  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // 🖨 Print the "result" to browser console.
    // console.log(result);
    if (result.data) {
      const data = result.data;
      const isValid = validateUser(data);
      console.log(data);
      if (isValid) {
        setScannedResult(data);
      } else {
        console.log("Invalid QR code format."); // Set error state if validation fails
        alert("invalid qr code formate");
      }
    }
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    // setScannedResult(result?.data);
  };

  useEffect(() => {
    if (scannedResult) {
      console.log("Navigating to /api/payment?token=", scannedResult);
      redirect(`/api/payment?token=${scannedResult}`);
    }
  }, [scannedResult, router]);

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div
        ref={qrBoxEl}
        className="qr-box"
      >
        <Image
          //@ts-ignore
          src={QrImage}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QrReader;
