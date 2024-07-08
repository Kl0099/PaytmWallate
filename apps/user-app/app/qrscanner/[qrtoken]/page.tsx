"use client";

import { useSession, signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import QrReader from "../../../components/QrReader";
import "../../globals.css";
const QRScannerPage = () => {
  const { data: session, status } = useSession();
  const router = useParams();
  const { token } = router;
  // console.log("session :", session);
  const params = useSearchParams();
  const number = params.get("number");

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
        <QrReader />
      </div>
    );
  }

  return null;
};

export default QRScannerPage;
