import type { NextPage } from "next";
import React from "react";
import dynamic from "next/dynamic";
import { Logo } from "@/components/Logo/Logo";

const SkopjeMap = dynamic(() => import("../components/Map/ConfirmLocation"), {
  ssr: false,
});
const HomePage: NextPage = () => {
  return (
    <div>
      <Logo />

      <SkopjeMap />
    </div>
  );
};

export default HomePage;
