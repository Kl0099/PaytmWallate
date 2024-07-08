"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQRCode } from "next-qrcode";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { decryption, encryption } from "../app/lib/encryption";
import { useSetRecoilState } from "recoil";
import { uniqueToken } from "../atom/sendAtom";
import { BsQrCodeScan } from "react-icons/bs";

const QrCode = ({ token, number }: { token: string; number: string }) => {
  const [loading, setLoading] = useState(false);
  const { Canvas, SVG, Image } = useQRCode();
  // const setUniqToken = useSetRecoilState(uniqueToken);
  const imageRef = useRef<HTMLImageElement>(null);

  const router = useRouter();

  const handlescann = () => {
    router.replace(`/qrscanner/${token}?number=${number}`);
  };
  const clickmethod = () => {};

  // useEffect(() => {
  //   console.log("imageref curent : ", imageRef.current?.src);
  //   if (imageRef.current) {
  //     console.log("imagefer : ", imageRef.current.src);
  //   }
  // }, [imageRef]);

  return (
    <div className="flex mb-5 flex-col  justify-center items-center">
      <Image
        text={`${token}&number=${number}`}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            // dark: "#010599FF",
            dark: "#000000",
            // light: "#FFBF60FF",
          },
        }}
        //@ts-ignore
        ref={imageRef}
      />
      <div className=" flex items-center justify-center w-[200px]">
        <Button onClick={handlescann}>
          <div className=" w-full justify-center flex items-center gap-2">
            <span>
              <BsQrCodeScan
                size={22}
                color="white"
              />
            </span>
            <span>Scan & Pay</span>
          </div>
        </Button>
      </div>
      {/* <Button onClick={clickmethod}>click</Button> */}
    </div>
  );
};

export default QrCode;
