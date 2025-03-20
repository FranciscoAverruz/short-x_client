/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Acceso limitado a funciones básicas.",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: "$10",
    priceYearly: "$100",
    description: "Acceso a funciones avanzadas y soporte prioritario.",
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: "$20",
    priceYearly: "$200",
    description: "Todas las funciones, incluyendo herramientas exclusivas.",
  },
];

const PlanSelect = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <select
        id="plan"
        value={value}
        onChange={onChange}
        className="border p-2 rounded"
      >
        <option value="" disabled>
          Selecciona un plan...
        </option>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name} - {plan.priceMonthly} / mes | {plan.priceYearly} / año
          </option>
        ))}
      </select>
      {value && (
        <p className="text-sm mt-2 text-gray-600">
          {plans.find((plan) => plan.id === value)?.description}
        </p>
      )}
    </div>
  );
};

export default PlanSelect;
