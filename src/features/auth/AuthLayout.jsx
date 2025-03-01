/* eslint-disable react/prop-types */
const AuthLayout = ({ formContent, borderSrc, imageSrc, title, borderClasses, onSubmit, className="mt-20"}) => {
    return (
      <section className={`flex justify-center w-full lg:w-[50%] ${className}`}>
      <main className="grlContainer innerlight flex flex-col md:flex-row p-5 gap-5 relative w-full my-5 md:my-5">
        <aside className={`absolute -left-[30px] -bottom-[4.4rem] w-20 z-0 md:z-[2] scale-y-[-1] -rotate-90 ${borderClasses?.left}`}>
          <img src={borderSrc} alt="border left" />
        </aside>
        <aside className={`absolute -right-[30px] -top-[4.4rem] w-20 z-0 md:z-[2] scale-y-[-1] rotate-90 ${borderClasses?.right}`}>
          <img src={borderSrc} alt="border right" />
        </aside>
  
        <aside className="relative shadow-lg rounded-xl innerlight p-3 md:p-10 h-20 md:h-auto w-full md:w-[30%]">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></div>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-bl from-light-bg/50 dark:from-dark-bg to-transparent opacity-80 rounded-xl z-0"></div>
          <h2 className="absolute flex title top-0 left-0 h-full w-full items-center pl-5 md:hidden z-10 bg-gradient-to-tr from-light-bg/80 dark:from-dark-bg text-light-Title dark:text-dark-Title">{title}</h2>
        </aside>
  
        <section className="w-full">
          <form onSubmit={onSubmit}>
            <h2 className="title mb-8 hidden md:block">{title}</h2>
            {formContent}
          </form>
        </section>
      </main>
      </section>
    );
  };
  
  export default AuthLayout;
  