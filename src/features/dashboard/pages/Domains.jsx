// Domains.jsx
import React, { Suspense, useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import PremiumMessage from "@dashDomains/PremiumMessage.jsx"; // el mensaje para usuarios no premium

// Lazy load de Domains
const DomainsPremium = React.lazy(() => import('@dashDomains/DomainsPremium.jsx'));

const Domains = () => {
  const { plan } = useContext(AuthContext);
  return (
    <>
      <h1 className="title dashGrlHeadings text-2xl">Dominios Personalizados</h1>
      <hr className="divider mb-8" />
      {!plan.startsWith("premium") ? (
        <PremiumMessage />
      ) : (
        <Suspense fallback={<div>Cargando...</div>}>
          <DomainsPremium />
        </Suspense>
      )}
    </>
  );
};

export default Domains;
