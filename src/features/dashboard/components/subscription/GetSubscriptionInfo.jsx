import plans from "@dashCommon/PlansData";
import Medal from "@dashCommon/Medal.jsx";
import PlanLabel from "@dashCommon/PlanLabel.jsx";
import FormatDate from "@dashCommon/FormatDate";
import CancelSubscription from "@dashSubscription/CancelSubscription";
import SuspendCancellation from "@dashSubscription/SuspendCancellation";
import { Loader } from "@common/Loader.jsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const GetSubscriptionInfo = () => {
  const { subscription, loading, plan } = useContext(AuthContext);
  const currentPlanDetails = plans.find((p) => plan?.includes(p.planType));

  if (loading) return <Loader type="spinner" className="w-full h-full" />;
  if (!subscription)
    return <div>No hay información de suscripción disponible.</div>;

  return (
    <main className="flex flex-col p-4 md:p-5 w-full h-full">
      <AnimatePresence>
        <aside className="flex flex-col lg:flex-row gap-5 w-full">
          <motion.article
            key="myAccountMain"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-start gap-5 w-full"
          >
            <Medal plan={plan} classNameIcon="hidden md:block text-8xl" />
            <article className="paragraphText gap-0 my-0 w-full">
              <strong className="subTitle2 text-base">Plan:</strong>
              <span className="flex flex-row w-full">
                <Medal
                  plan={plan}
                  classNameIcon="block md:hidden mr-2 text-4xl"
                />
                <p className="text-base md:text-xl lg:text-2xl inputStyle w-full">
                  <PlanLabel plan={subscription.plan} />
                </p>
              </span>

              <strong className="subTitle2 text-base">Estado:</strong>
              <p className="text-sm mb-1 ml-2 -mt-1">{subscription.status}</p>

              <strong className="subTitle2 text-base">Fecha de inicio:</strong>
              <p className="text-sm mb-1 ml-2 -mt-1">
                {FormatDate(subscription.startDate)}
              </p>

              <strong className="subTitle2 text-base">
                Fecha de renovación:
              </strong>
              <p className="text-sm mb-1 ml-2 -mt-1">
                {subscription.renewalDate
                  ? FormatDate(subscription.renewalDate)
                  : "N/A"}
              </p>
            </article>
          </motion.article>

          <motion.article
            key="myAccountDetails"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full"
          >
            <h2 className="text-xl subTitle1">Detalles</h2>
            <p className="subTitle2 font-normal text-base">
              {currentPlanDetails?.description || "No disponible"}
            </p>
            <ul className="list-disc pl-10 lg:h-32 mt-2 md:overflow-y-scroll text-sm paragraphText gap-0">
              {currentPlanDetails?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </motion.article>
        </aside>
      </AnimatePresence>

      <hr className="divider" />
      <aside className="flex flex-col md:flex-row w-full items-center mt-2">
        {subscription.status === "pending" && (
          <p className="text-md text-amber-500 dark:text-dark-accent drop-shadow-sm font-semibold">
            Tu suscripción se cancelará el{" "}
            {FormatDate(subscription.renewalDate)}.
          </p>
        )}
        {subscription.status === "pendingToFree" && (
          <p className="text-md text-amber-500 dark:text-dark-accent drop-shadow-sm font-semibold">
            Tu suscripción cambiara a <strong className="text-xl">Free</strong>{" "}
            el {FormatDate(subscription.renewalDate)}.
          </p>
        )}
        <article className="ml-auto w-full md:w-auto">
          {subscription.status === "pending" ? (
            <SuspendCancellation />
          ) : subscription.status === "pendingToFree" ? (
            ""
          ) : (
            <CancelSubscription />
          )}
        </article>
      </aside>
    </main>
  );
};

export default GetSubscriptionInfo;
