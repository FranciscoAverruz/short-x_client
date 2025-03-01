import Button from "@atoms/Button.jsx";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import Sx from "@common/Sx.jsx";
import logo from "@assets/icon.png";

function Cancel() {
  const navigate = useNavigate();

  return (
    <main className="bg flex flex-col lg:flex-row items-center justify-center h-screen gap-10">
      <section className="flex flex-col items-center justify-center gap-5 border-b-2 lg:border-b-0 lg:border-r-2 pb-10 lg:pb-0 lg:pr-10">
        <img src={logo} alt="Logo" className="w-28 h-28 aspect-square" />
        <article className="flex flex-col items-center lg:gap-2 md:mb-0">
          <Sx className="text-4xl -mb-3" />
          <p className="smart">Your Smart Link Shortener</p>
        </article>
      </section>
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-600">Pago cancelado</h1>
        <span className="text-5xl my-5">❌</span>
        <p className="smart">
          Si tuviste un problema, por favor, intenta nuevamente.
        </p>
        <Button
          onClick={() => navigate("/register")}
          label="Volver al formulario de registro"
          icon={RiArrowGoBackFill}
          className="gap-5 p-2 mt-5"
        />
      </section>
    </main>
  );
}

export default Cancel;
