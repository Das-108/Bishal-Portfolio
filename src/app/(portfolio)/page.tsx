import React from "react";
import SmoothScroll from "../../components/portfolio/SmoothScroll";
import Navbar from "../../components/portfolio/Navbar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Navbar />
      {/* Dynamic single-page view structure injects safely here */}
      <div className="relative w-full min-h-screen">
        {children}
      </div>
    </SmoothScroll>
  );
}