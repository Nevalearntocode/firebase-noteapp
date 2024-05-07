import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center xl:justify-start">
      <div className="flex h-full w-full items-center border-r-2 bg-muted px-12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
