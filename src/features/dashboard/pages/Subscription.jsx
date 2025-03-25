/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import GetPaymentHistory from "@dashSubscription/GetPaymentHistory";
import UpdateSubscription from "@dashSubscription/UpdateSubscription";
import GetSubscriptionInfo from "@dashSubscription/GetSubscriptionInfo";
import { Loader } from "@common/Loader.jsx";
import { AuthContext } from "@context/AuthContext";

const Subscription = () => {
  const { plan, subscription, loading } = useContext(AuthContext);
  const subscriptionId = subscription?._id;

  if (loading) {
    return (
      <Loader
        type="loading"
        text="Cargando..."
        className="flex items-center justify-center h-[90%]"
      />
    );
  }

  if (!subscription) {
    return <p>Cargando información de suscripción...</p>;
  }

  return (
    <>
      <h1 className="title dashGrlHeadings text-2xl">Suscripción</h1>
      <hr className="divider mb-8" />
      <main className="flex w-full justify-center items-center flex-col px-5">
        <aside className="grid gap-5 w-[90%] grid-rows-auto grid-cols-1 md:grid-cols-6 transition-transform ease-in-out duration-300">
          <article className="grlContainer col-span-1 md:col-span-6 lg:min-h-5xl">
            <GetSubscriptionInfo />
          </article>

          <article className="col-span-1 md:col-span-6 lg:col-span-2">
            {subscription ? (
              <UpdateSubscription
                currentPlan={plan}
                subscriptionId={subscriptionId}
              />
            ) : (
              <p>Cargando información de suscripción...</p>
            )}
          </article>

          <article className="grlContainer col-span-1 md:col-span-6 lg:col-span-4">
            <GetPaymentHistory />
          </article>
        </aside>
      </main>
    </>
  );
};

export default Subscription;
