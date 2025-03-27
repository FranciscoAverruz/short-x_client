/* eslint-disable react/prop-types */
import Sx from "@common/Sx.jsx";
import logo from "@assets/icon.png";

const AuthLayout = ({
  formContent,
  title,
  onSubmit,
  classNameAL = "w-[90%] lg:w-[80%] mt-5 md:mt-24 mb-10",
}) => {
  return (
    <section className={`flex md:flex-col lg:flex-row justify-center gap-5 ${classNameAL}`}>
      <article className="hidden md:flex lg:flex-col items-center md:justify-center lg:justify-start border-r-0 md:border-b-2 lg:border-b-0 lg:border-r-2 md:pb-16 lg:pb-0 lg:pr-8 min-w-52 lg:mr-2">
        <img
          src={logo}
          alt="Logo"
          className={"md:w-20 lg:w-28 drop-shadow-xl lg:mt-5 md:mr-5 lg:mr-0 lg:mb-8"}
        />
        <div className="hidden md:flex flex-col lg:items-center md:mb-0">
          <Sx className="md:text-6xl lg:text-4xl -mb-3 md:-mb-0" />
          <p className="smart md:text-2xl lg:text-sm">
            Your Smart Link Shortener
          </p>
        </div>
      </article>
      <article className="w-full py-5">
        <form onSubmit={onSubmit}>
          <h2 className="flex title mb-8 justify-center lg:justify-start">
            {title}
          </h2>
          {formContent}
        </form>
      </article>
    </section>
  );
};

export default AuthLayout;
