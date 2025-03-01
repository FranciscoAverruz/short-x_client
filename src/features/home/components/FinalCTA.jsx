/* eslint-disable no-unused-vars */
import React from 'react'

const FinalCTA = () => {

  const isPromoActive = true;

    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold">Acorta y gestiona enlaces con facilidad 🚀</h1>
            <p className="text-lg mt-2">Convierte tus enlaces largos en URLs cortas y personalizadas.</p>

            {isPromoActive ? (
                <a href="/registro" className="bg-blue-500 text-white px-6 py-3 rounded-xl mt-4 inline-block">
                    🎉 ¡Regístrate y obtén 7 días PRO gratis!
                </a>
            ) : (
                <a href="/registro" className="bg-blue-500 text-white px-6 py-3 rounded-xl mt-4 inline-block">
                    ¡Empieza gratis ahora!
                </a>
            )}
        </div>
    );
}

export default FinalCTA