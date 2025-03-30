/* eslint-disable no-unused-vars */
import Sx from "@common/Sx.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";

const Condiciones = () => {
  const navigate = useNavigate();

  return (
    <main className="grlContainer p-5 md:p-10 mt-16 mb-8">
      <section>
        <h1 className="title">Términos y Condiciones de Uso</h1>
        <p className="mb-5 paragraphText font-semibold">
          Última actualización: 30 de marzo de 2025
        </p>
        <article className="mb-3 paragraphText">
          <p>
            Bienvenido a <Sx />. Al acceder o utilizar nuestro servicio de
            acortamiento de enlaces, aceptas estos términos y condiciones. Si no
            estás de acuerdo con alguno de estos términos, no debes utilizar
            nuestro servicio.
          </p>
        </article>
      </section>
      <ol>
        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Uso del Servicio</strong>
          <ol className="paragraphText">
            <li>
              <strong>Licencia de Uso: </strong>
              Te otorgamos una licencia limitada, no exclusiva, no transferible
              y revocable para usar nuestro servicio, siempre que cumplas con
              los términos y condiciones.
            </li>
            <li>
              <strong>Uso Responsable: </strong>
              Te comprometes a no utilizar nuestro servicio para compartir
              contenidos ilegales, difamatorios, discriminatorios, o cualquier
              material que infrinja los derechos de terceros.
            </li>
            <li>
              <strong>Registro de Cuenta: </strong>
              Si decides crear una cuenta en <Sx />, serás responsable de
              mantener la confidencialidad de tus credenciales de acceso y de
              cualquier actividad realizada bajo tu cuenta.
            </li>
          </ol>
        </li>

        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Propiedad Intelectual</strong>
          <ol className="paragraphText">
            <li>
              <strong>Contenido de la Plataforma: </strong>
              Todo el contenido del sitio web, incluyendo pero no limitándose a
              texto, imágenes, logotipos y gráficos, está protegido por derechos
              de propiedad intelectual y es propiedad exclusiva de <Sx />, salvo
              que se indique lo contrario. Algunos de los recursos visuales,
              como imágenes y gráficos, son proporcionados por plataformas de
              recursos gratuitos como <strong>Pexels</strong>,{" "}
              <strong>Canva</strong>, u otros proveedores, y están sujetos a las
              licencias correspondientes de cada plataforma.
            </li>
            <li>
              <strong>Licencia de Uso de Recursos de Terceros: </strong>
              Las imágenes y otros recursos visuales utilizados en el sitio web
              están sujetos a las licencias bajo las cuales se distribuyen en
              plataformas como <strong>Pexels</strong>, <strong>Canva</strong>.
              Estos recursos son proporcionados bajo licencias libres para uso
              personal y no comercial, y no requieren atribución, salvo que se
              indique lo contrario. Si bien pueden ser utilizados en proyectos
              no comerciales como este, no pueden ser reutilizados en otros
              proyectos comerciales sin cumplir con las condiciones de las
              respectivas licencias.
            </li>
            <li>
              <strong>Restricciones:</strong>
              Los usuarios de <Sx /> no tienen autorización para utilizar,
              reproducir, modificar, distribuir o comercializar ningún contenido
              de la plataforma, excepto en los casos expresamente permitidos por
              las licencias de los recursos de terceros. Este sitio es un
              proyecto personal de demostración y no tiene fines comerciales.
            </li>
          </ol>
        </li>

        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Limitación de Responsabilidad</strong>
          <ol className="paragraphText">
            <li>
              <Sx /> no será responsable de cualquier daño directo o indirecto,
              incluyendo pero no limitado a pérdida de datos, pérdida de
              beneficios o interrupción del servicio, derivado del uso de la
              plataforma.
            </li>
            <li>
              No garantizamos la disponibilidad ininterrumpida del servicio y
              nos reservamos el derecho de modificar, suspender o interrumpir el
              servicio sin previo aviso.
            </li>
          </ol>
        </li>

        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Protección de Datos Personales</strong>
          <p className="paragraphText inline-block indent-0">
            Recopilamos y tratamos tus datos personales conforme a nuestra
            <strong
              className="btnLink ml-1"
              onClick={() => navigate("/privacy")}
            >
              Política de Privacidad
            </strong>
            . Al utilizar nuestros servicios, aceptas el tratamiento de tus
            datos según lo establecido en dicha política.
          </p>
        </li>

        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Modificaciones</strong>
          <p className="paragraphText inline-block indent-0">
            <Sx /> se reserva el derecho de modificar estos Términos y
            Condiciones en cualquier momento. Las modificaciones entrarán en
            vigor en el momento de su publicación en el sitio web. Te
            recomendamos revisar periódicamente estos términos.
          </p>
        </li>

        {/* *********************************************** */}
        <li className="subTitle1UL">
          <strong>Ley Aplicable y Jurisdicción</strong>
          <p className="paragraphText inline-block indent-0">
            Estos Términos y Condiciones se rigen por la legislación española.
            Cualquier disputa que surja en relación con los servicios de <Sx />{" "}
            será resuelta en los tribunales competentes de{" "}
            <strong>Madrid, España</strong>.
          </p>
        </li>
      </ol>
    </main>
  );
};

export default Condiciones;
