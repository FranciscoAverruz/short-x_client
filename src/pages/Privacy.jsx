/* eslint-disable no-unused-vars */
import React from 'react'
import Sx from "@common/Sx.jsx"
import { useNavigate } from 'react-router-dom';

const Privacidad = () => {
  const navigate = useNavigate();
  return (
    <main className='grlContainer p-5 md:p-10 mt-16 mb-8'>
    <section>
      <h1 className="title">
        Política de Privacidad de <Sx className="text-4xl"/>
      </h1>
      <p className='mb-5 paragraphText font-semibold'>Última actualización: 15 de enero de 2025</p>
      <article className='mb-3 paragraphText'>
        <p>En <Sx />, respetamos tu privacidad y nos comprometemos a proteger la información personal que nos proporcionas. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos tus datos personales al utilizar nuestros servicios.</p>
      </article>
     </section>
    <ol>
    {/* *********************************************** */}
      <li className="subTitle1UL"><strong>Información que Recopilamos</strong>
        <ol className="paragraphText">
          <li >
            <strong>Información Personal: </strong> 
            Recopilamos información personal que proporcionas al registrarte en nuestra plataforma, como tu nombre, dirección de correo electrónico, dirección IP, y cualquier otra información necesaria para el funcionamiento del servicio.
          </li>
          <li>
            <strong>Información de Uso: </strong>
            También recopilamos datos relacionados con tu uso del servicio, como los enlaces que acortas, la cantidad de clics que reciben y otros detalles relacionados con la interacción con nuestros servicios.
          </li>
          <li>
            <strong>Cookies: </strong>
            Utilizamos cookies para mejorar la experiencia del usuario, realizar análisis de tráfico y personalizar contenido. Al continuar utilizando nuestro sitio, aceptas el uso de cookies de acuerdo con nuestra Política de Cookies.
          </li>
        </ol>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL"><strong>Propiedad Intelectual</strong>
        <ol className="paragraphText ">
          <li>Utilizamos tus datos personales para:
            <ul className="mt-3 indent-0">
              <li>Proporcionar y gestionar los servicios de acortamiento de enlaces.</li>
              <li>Mejorar la experiencia del usuario y el rendimiento del servicio.</li>
              <li>Comunicarnos contigo para informarte sobre actualizaciones del servicio.</li>
              <li>Cumplir con nuestras obligaciones legales y contractuales.</li>
            </ul>
          </li>
          <li >
              <Sx/> no compartirá tu información personal con terceros, salvo que sea necesario para cumplir con la ley o por requerimientos legales.
          </li>
        </ol>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL"><strong>Derechos de los Usuarios</strong>
        <ol className="paragraphText">
          <li>
            Tienes derecho a acceder, corregir, eliminar y limitar el tratamiento de tus datos personales. Además, puedes oponerte al tratamiento de tus datos o solicitar la portabilidad de los mismos.
          </li>
          <li>
            Para ejercer estos derechos, puedes ponerte en contacto con nosotros a través de{' '}
            <strong
              className="btnLink"
              onClick={() => (window.location.href = 'mailto:averruz.projects@gmail.com')}
            >
              contact@short-x.com
            </strong>
          </li>
        </ol>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL"><strong>Seguridad de los Datos</strong>
        <ol className="paragraphText">
          <li>
            Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales de accesos no autorizados, alteraciones, divulgaciones o destrucción no autorizadas.
          </li>
          <li>
            No obstante, no podemos garantizar la seguridad absoluta de los datos en Internet y no nos hacemos responsables de los incidentes que puedan surgir debido a fallos en la seguridad fuera de nuestro control.
          </li>
        </ol>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL"><strong> Retención de Datos</strong>
        <ol className="paragraphText">
          <li>
            Conservamos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados, y conforme a los plazos establecidos por la legislación vigente.
          </li>
          <li>
            Después de este período, procederemos a la eliminación o anonimización de los datos personales.
          </li>
        </ol>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL"><strong>Modificaciones</strong>
        <p className="paragraphText indent-0">
          Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Las modificaciones se publicarán en nuestro sitio web y entrarán en vigor en el momento de su publicación.
        </p>
      </li>

      {/* *********************************************** */}
      <li className="subTitle1UL inline-block"><strong>Contacto</strong>
        <p className="paragraphText indent-0 inline-block">
          Si tienes alguna pregunta o solicitud sobre esta Política de Privacidad, puedes ponerte en contacto con nosotros a través de nuestro
          <strong className="btnLink ml-1" onClick={() => navigate('/contact')}>
            formulario de contacto
          </strong>.
          </p>
      </li>
    </ol>

    </main>
  )
}

export default Privacidad