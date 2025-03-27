/* eslint-disable no-unused-vars */
import React from "react";
import FAQSection from "@homeSections/FAQSection.jsx";
import HeroSection from "@homeSections/HeroSection.jsx";
import PricingSection from "@homeSections/PricingSection.jsx";
import BenefitsSection from "@homeSections/BenefitsSection.jsx";
// import FinalCTA from "@homeSections/FinalCTA.jsx";

const Home = () => {
  return (
    <main className="w-screen">
      {/* Hero Section */}
      <section className="relative w-full h-auto flex items-center py-14 justify-center">
        <HeroSection />
      </section>

      {/* Benefits */}
      <section className="w-screen h-fit flex items-center justify-center">
        <article className="p-10 rounded-3xl bg-gradient-to-b from-transparent/30 dark:from-dark-sectionBg to-transparent via-light-inputBg/20">
          <BenefitsSection />
        </article>
      </section>

      {/* pricing */}
      <section className="relative w-full h-fit flex items-center justify-center px-5 py-20">
        <article className="md:w-4/5">
          <PricingSection />
        </article>
      </section>

      {/* FAQ */}
      <section className="h-fit">
        <FAQSection />
      </section>

      {/* CTA */}
      {/* <section className="relative w-full min-h-[55vh] flex items-center justify-center bg-light-primary/60">
        <article className="pb-5">
          <FinalCTA />
        </article>
      </section> */}
    </main>
  );
};

export default Home;