"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionEvents from "@/components/sections/SectionEvents";
import SectionGetThere from "@/components/sections/SectionGetThere";
import SectionTestimonial from "@/components/sections/SectionTestimonial";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 1500);
    }

  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <Carousel />
      <SectionAbout />
      <SectionGetThere />
      <SectionTestimonial />
      <SectionEvents />
    </div>
  );
}
