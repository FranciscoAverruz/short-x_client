/* eslint-disable react/prop-types */
const planNames = {
  premium_monthly: "Premium Monthly",
  premium_annual: "Premium Annual",
  pro_monthly: "Pro Monthly",
  pro_annual: "Pro Annnual",
  free_monthly: "Free",
  free_annual: "Free",
};

const PlanLabel = ({ plan }) => {
  return <span>{planNames[plan] || plan}</span>;
};

export default PlanLabel;
