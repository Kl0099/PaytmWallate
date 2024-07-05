import Error from "next/error";
import React from "react";

const ErrorComponent = ({ statusCode }: { statusCode: number }) => {
  return <Error statusCode={statusCode} />;
};

export default ErrorComponent;
