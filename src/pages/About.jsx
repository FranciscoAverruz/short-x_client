/* eslint-disable no-unused-vars */
import Sx from "@common/Sx.jsx";
import icon from "@assets/icon.png";
import React from "react";
import avatar from "@assets/avatar.jpg";

const About = () => {
  return (
    <main className="mt-16 mb-8">
      <section className="grlContainer p-5 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center">
        <article className="relative rounded-xl innerlight p-3 md:p-10 gradientToB">
          <div
            className="hidden lg:block absolute inset-0 bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <div className="w-16 md:w-28 lg:w-40 drop-shadow-xl z-10">
              <img src={icon} alt="" />
            </div>
            <header className="title flex items-center lg:hidden w-full z-10 flex-col md:items-start md:gap-2">
              <Sx />
              <h1 className="text-2xl">Más que un Acortador</h1>
            </header>
          </div>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-bl from-light-Title/70 to-transparent opacity-80 rounded-xl z-0"></div>
        </article>

        <article className="flex flex-col text-light-grlText/80 dark:text-dark-grlText/80">
          <h1 className="title mb-8 hidden lg:flex lg:gap-2 lg:items-baseline">
            <Sx className="text-5xl" />
            <p>: Más que un Acortador</p>
          </h1>
          <p>
            En <Sx />, nos apasiona facilitar la comunicación digital, ayudando
            a personas y empresas a compartir información de manera eficiente y
            profesional. Nuestra plataforma de acortamiento de enlaces surgió
            con un objetivo claro: simplificar el intercambio de enlaces largos
            y complejos, transformándolos en URL breves, fáciles de recordar y
            de aspecto limpio.
          </p>
          <br />
          <p>
            Vivimos en un mundo digital en constante evolución, donde cada
            segundo cuenta. Sabemos que quienes trabajan en marketing, redes
            sociales, ventas o gestión de contenido necesitan herramientas
            fiables que optimicen su flujo de trabajo. Por eso, hemos diseñado
            un servicio que no solo acorta enlaces, sino que también ofrece
            funciones avanzadas, exclusivas para usuarios registrados, tales
            como:
          </p>
          <br />
          <ul className="list-disc pl-10">
            <li>
              <strong className="text-Tlight-heading dark:text-Tdark-heading">
                Estadísticas detalladas
              </strong>{" "}
              para que puedas medir el impacto de cada enlace.
            </li>
            <li>
              <strong className="text-Tlight-heading dark:text-Tdark-heading">
                Personalización de URLs
              </strong>
              , permitiéndote crear enlaces únicos y representativos de tu
              marca.
            </li>
            <li>
              <strong className="text-Tlight-heading dark:text-Tdark-heading">
                Redirección inteligente
              </strong>
              , que optimiza la experiencia del usuario según el dispositivo o
              ubicación geográfica.
            </li>
          </ul>
          <br />
          <p>
            La seguridad también es una prioridad para nosotros. Todos los
            enlaces generados a través de nuestra plataforma son monitoreados y
            protegidos contra actividades maliciosas, asegurando que quienes
            confían en nuestro servicio puedan compartir contenido sin
            preocupaciones.
          </p>
          <br />
          <p>
            Creemos que la tecnología debe ser accesible para todos, por eso
            nuestra interfaz es simple e intuitiva, ideal tanto para usuarios
            ocasionales como para equipos profesionales que manejan grandes
            volúmenes de enlaces.
          </p>
          <br />
          <p>
            Nuestra misión es ayudarte a potenciar tu presencia digital,
            proporcionándote las herramientas necesarias para convertir enlaces
            ordinarios en poderosos vehículos de información. Estamos
            comprometidos con la innovación constante y abiertos a tus ideas
            para seguir mejorando.
          </p>
          <br />
          <p>
            Gracias por confiar en <Sx />. ¡Estamos emocionados de ser parte de
            tu éxito digital!
          </p>
        </article>
      </section>
    </main>
  );
};

export default About;
