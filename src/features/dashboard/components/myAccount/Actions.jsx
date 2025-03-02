/* eslint-disable react/prop-types */
// import { useState } from "react";
import axios from "axios";
import FormatDate from "@dashCommon/FormatDate.jsx";
import { Loader } from "@common/Loader.jsx";
import { lazy, Suspense } from "react";
const Button = lazy(() => import("@atoms/Button"));

const Actions = ({ user, totalUrls, handleRedirectToMyUrls }) => {
  const isCancellationPending = user.isCancellationPending;
  const cancelDate = FormatDate(user.scheduledForDeletion);
  console.log("user.scheduledForDeletion === ", user.scheduledForDeletion)

  const handleCancelAccount = async () => {
    try {
      await axios.post(`/api/user/${user._id}/cancel`);
      alert("Account cancellation requested.");
    } catch (error) {
      console.error("Error canceling account:", error);
    }
  };

  const handleSuspendCancellation = async () => {
    try {
      await axios.post(`/api/user/${user._id}/suspend-cancel`);
      alert("Account cancellation suspended.");
    } catch (error) {
      console.error("Error suspending cancellation:", error);
    }
  };

  const handleChangePassword = () => {
    alert("Redirect to change password");
  };

  return (
    <div className={`flex gap-4 md:gap-6 w-full ${isCancellationPending ? "flex-col-reverse" : "flex-col"} `}>

      <section className="grlContainer row-span-1 col-span-1 flex items-center lg:flex-col h-fit justify-center md:p-8 gap-3">
        <article className="flex flex-row space-x-2 w-full h-full items-center">
          <h2 className="subTitle2 text-xl">URLs:</h2>
          <p className=" inputStyle w-full">{totalUrls}</p>
        </article>
        <article className="lg:mt-4 w-full">
        <Suspense fallback={<Loader type="spinner" />}>
          <Button
            onClick={handleRedirectToMyUrls}
            className="px-4 py-2 w-full justify-center border border-light-btnSecBorder dark:border-dark-btnSecBorder shadow-md hover:bg-light-accent/20"
            label="Ver Mis URLs"
            variant="link"
          />
        </Suspense>
        </article>
      </section>

      <section className="grlContainer md:p-8">
        <Suspense fallback={<Loader type="spinner" />}> 
          <Button
            label="Change Password"
            variant="secondary"
            onClick={handleChangePassword}
            className="w-full px-4 py-2"
          />
        </Suspense>
      </section>

      <section className="flex flex-col w-full grlContainer md:p-8">
        {!isCancellationPending && (
          <Suspense fallback={<Loader type="spinner" />}>
            <Button
              label="Eliminar Cuenta"
              variant="danger"
              onClick={handleCancelAccount}
              className="w-full px-4 py-2 "
            />
          </Suspense>
        )}
        {isCancellationPending && (
          <article>
            <div className="text-center mb-2">
              <p className="subTitle1 text-base">
                Cancelación programada:
              </p>
              <span className="title text-base">{cancelDate}</span>
            </div>
            <Suspense fallback={<Loader type="spinner" />}>
              <Button
                label="Suspender Cancelacion"
                variant="primary"
                onClick={handleSuspendCancellation}
                className="w-full px-4 py-2"
              />
            </Suspense>
          </article>
        )}
      </section>
    </div>
  );
};

export default Actions;
