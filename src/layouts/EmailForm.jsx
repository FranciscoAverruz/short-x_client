/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { IoIosPerson, IoIosPhonePortrait, IoIosAt } from "react-icons/io";
import Input from "@molecules/Input.jsx";
import useEmailForm from "@hooks/useEmailForm.jsx";
import SubmitButton from '@molecules/SubmitButton.jsx';

const EmailForm = ({ onSubmit }) => {
  const {
    name,
    phone,
    email,
    message,
    countryCode,
    countryName,
    flag,
    feedbackMessage,
    isSuccess,
    errors,
    handleChange,
    handleSubmit,
    inputRef,
    selectedPrefix,
    defaultCountryName,
    defaultCountryFlag,
    countryOptions
  } = useEmailForm(onSubmit);
 
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full h-full relative"
    >
      {/* ===================================== 1 ===================================== */}
      <section className="w-full flex flex-col md:flex-row gap-2">
        {/* Name  *********************************************************** */}
        <div className="md:w-[60%]">
          <Input
            label={"Nombre"}
            id="name"
            type="text"
            required
            name="name"
            onChange={handleChange}
            value={name}
            errorMessage={errors.name}
            icon={<IoIosPerson />}
          />
        </div>

        {/* Phone  *********************************************************** */}
        <div className="relative mb-2 md:w-[40%]">
          <select
            name="countryCode"
            value={countryCode}
            onChange={handleChange}
            className="absolute left-10 top-8 h-10 z-10 w-4 flex items-center justify-center bg-transparent"
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute subTitle1 flex items-end flex-row -right-2 text-xs top-1 gap-1 md:w-56 md:justify-end w-56 max-w-40" title={countryName}>
            <span className="flex justify-end max-h-4 overflow-hidden z-[1] cursor-default">
              {countryName || defaultCountryName}
            </span>
            <img
              src={flag || defaultCountryFlag}
              alt="flag"
              className="w-6 h-4 mr-2 aspect-[3/2]"
            />
          </div>
          <Input
            label={"Teléfono"}
            id="phone"
            type="tel"
            required
            name="phone"
            onChange={handleChange}
            value={phone || selectedPrefix}
            errorMessage={errors.phone}
            className="pl-14"
            icon={<IoIosPhonePortrait />}
            inputRef={inputRef}
            inputMode="tel"
            pattern="^\+?[0-9]*$"
          />
        </div>
      </section>

      {/* ===================================== 2 ===================================== */}
      <section className="mt-2 md:mt-auto">
        <Input
          label={"Email"}
          id="email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
          errorMessage={errors.email}
          className={""}
          icon={<IoIosAt />}
        />
      </section>

      {/* ===================================== 3 ===================================== */}
      <section className="mt-2 w-full">
        <Input
          label={"Mensaje"}
          id="message"
          required
          name="message"
          onChange={handleChange}
          value={message}
          className=""
          isTextarea
        />
        {feedbackMessage && (
          <div
            className={`absolute inset-0 flex items-center justify-center backdrop-blur-md font-bold rounded-md p-5 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedbackMessage}
          </div>
        )}
      </section>

      <SubmitButton label="Enviar" className="mt-3"/>
    </form>
  );
};

export default EmailForm;
