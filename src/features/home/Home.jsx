/* eslint-disable no-unused-vars */
import React from "react";
import HeroSection from "@homeSections/HeroSection.jsx";
import BenefitsSection from "@homeSections/BenefitsSection.jsx";
import PricingSection from "@homeSections/PricingSection.jsx";
// import FinalCTA from "@homeSections/FinalCTA.jsx";
import FAQSection from "@homeSections/FAQSection.jsx";

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
        <FAQSection/>
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

// style={{
//   backgroundImage:
//     "url(https://images.pexels.com/photos/14657167/pexels-photo-14657167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
//   backgroundAttachment: "fixed",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// }}

// Bordes
{/* <aside className="hidden md:flex absolute left-0 -bottom-[6.1rem] lg:-bottom-[7.8rem] w-28 lg:w-36 z-0 md:z-[2] scale-y-[-1] -rotate-90 overflow-hidden">
  <img src={border} alt="border left" />
</aside>
<aside className="absolute md:right-0 -bottom-[6.1rem] lg:-bottom-[7.8rem] w-28 lg:w-36 z-0 md:z-[2] -scale-y-[-2] md:-scale-y-[-1] -rotate-90">
  <img src={border} alt="border left" />
</aside> */}