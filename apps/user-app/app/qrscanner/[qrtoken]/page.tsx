"use client";

import { useSession, signIn } from "next-auth/react";
import { Suspense, useEffect } from "react";
import QrReader from "../../../components/QrReader";
import "../../globals.css";
const QRScannerPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to login page if not authenticated
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while session is being fetched
  }

  if (status === "authenticated") {
    // if(session.user.)
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <QrReader />
      </div>
    );
  }

  return null;
};

export default QRScannerPage;
