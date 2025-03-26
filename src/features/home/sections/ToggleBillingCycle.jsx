/* eslint-disable react/prop-types */
import Input from "@molecules/Input.jsx";

const ToggleBillingCycle = ({ isAnnual, setIsAnnual }) => {

  const togglePlanType = () => {
    setIsAnnual(prevState => !prevState);
  };

  return (
      <label className="flex w-52 justify-center items-center">
        {/* toggle *************************************************************************/}
        <Input
          type="checkbox"
          id="toggle-dark"
          className="sr-only"
          checked={isAnnual}
          onChange={togglePlanType}
          aria-label="Toggle dark mode"
          role="switch"
          aria-checked={isAnnual}
        />
        <article className="relative bg-light-inputBg dark:bg-dark-btnMenuHoverBg w-[14.6rem] h-8 rounded-full shadow-md flex items-center justify-between px-2 transition-colors duration-300 cursor-pointer">
          <span
            className={`flex justify-center items-center -ml-1 w-28 h-6 rounded-full font-bold transition-colors duration-300 ${
              isAnnual
                ? "text-light-subTitle dark:text-dark-subTitle"
                : "text-light-Title"
            } z-10`}
          >
            Mensual
          </span>
          <span
            className={`absolute left-1 top-1 bg-dark-accent w-28 h-6 rounded-full flex items-center justify-center text-white font-bold shadow-inner transition-transform duration-300 ${
              isAnnual ? "translate-x-full" : ""
            } z-0`}
          ></span>
          <span
            className={`flex justify-center items-center -mr-1 w-28 h-6 rounded-full font-bold transition-colors duration-300 ${
              isAnnual
                ? "text-light-Title"
                : "text-light-subTitle dark:text-dark-subTitle"
            } z-10`}
          >
            Anual
          </span>
        </article>
      </label>
  );
};

export default ToggleBillingCycle;
