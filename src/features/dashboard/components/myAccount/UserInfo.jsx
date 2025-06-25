/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Medal from "@dashCommon/Medal.jsx";
import Input from "@molecules/Input";
import Button from "@atoms/Button";
import PlanLabel from "@dashCommon/PlanLabel.jsx";
import FormatDate from "@dashCommon/FormatDate";
import SubmitButton from "@molecules/SubmitButton";
import useAuthAxios from "@hooks/useAuthAxios";
import { Loader } from "@common/Loader.jsx";
import { API_URL } from "@src/Env.jsx";
import { TbCancel } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { log, logError } from "@utils/logger";
import { MdOutlineModeEdit, MdAlternateEmail } from "react-icons/md";

const UserInfo = ({ user, setUser, isCancellationPending }) => {
  const navigate = useNavigate();
  const { userId, plan, subscription, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localSubscription, setLocalSubscription] = useState(
    subscription || null
  );
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });
  const authAxios = useAuthAxios();
  const createdAt = FormatDate(user.createdAt);
  const updatedAt = FormatDate(user.updatedAt);

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const response = await authAxios.get(
          `${API_URL}/subscription/${userId}/info`
        );
        log("Datos de la suscripción recibidos:", response.data);

        dispatch({
          type: "SET_SUBSCRIPTION",
          payload: response.data.subscription,
        });
        setLocalSubscription(response.data.subscription);
      } catch (error) {
        logError("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    if (plan && !plan.startsWith("free") && !localSubscription) {
      fetchSubscription();
    }
  }, [localSubscription, userId, plan, dispatch, authAxios]);
  

  if ((loading || !localSubscription) && !plan.startsWith("free")) {
    return <Loader type="spinner" className="w-full" />;
  }

  const isPending = localSubscription?.status === "pending";
  const isPendingToFree = localSubscription?.status === "pendingToFree";

  return (
    <main className="py-0 px-3 w-full">
      <section>
        <Input
          label="Username"
          name="username"
          icon={<FaRegUser />}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          disabled={!isEditing}
        />
        <Input
          label="Email"
          name="email"
          icon={<MdAlternateEmail />}
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          disabled={!isEditing}
        />
      </section>

      <section className="flex justify-end itmes-center h-11 my-2">
        {isEditing ? (
          <span className="flex gap-3">
            <SubmitButton
              label="Guardar"
              loading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await authAxios.put(
                    `${API_URL}/user/${userId}`,
                    formData
                  );
                  setUser(response.data);
                  dispatch({ type: "UPDATE_USER", payload: response.data });
                  setIsEditing(false);
                } catch (error) {
                  logError("Error updating user:", error);
                } finally {
                  setLoading(false);
                }
              }}
            />
            <Button
              label="Cancelar"
              icon={TbCancel}
              variant="secondary"
              onClick={() => setIsEditing(false)}
            />
          </span>
        ) : (
          <span className="flex self-end">
            <Button
              label="Editar"
              variant={isCancellationPending ? "secondary" : "primary"}
              onClick={() => setIsEditing(true)}
              className="px-4 py-2"
              icon={MdOutlineModeEdit}
            />
          </span>
        )}
      </section>

      <hr className="divider" />
      <section className="flex flex-col md:flex-row gap-5 mb-3">
        <aside className="flex flex-row md:flex-col items-center justify-center gap-3 w-full md:w-1/3">
          <Medal plan={plan} classNameIcon="text-5xl" />
          <span className="flex grlTxt w-full justify-center items-center text-center">
            <PlanLabel plan={plan} />
          </span>
          {/* { !plan.startsWith("free") &&  */}
          <Button
            label="ver Suscripión"
            variant="link"
            className="w-full md:w-auto flex justify-center"
            onClick={() => navigate("/dashboard/subscription")}
          />
         {/* } */}
        </aside>

        <ul className="flex flex-col gap-2 list-disc w-full ml-5 mt-5">
          <li>
            <strong className="mr-5 subTitle2 text-base">
              Fecha de Creación
            </strong>
            <span className="paragraphText my-0 opacity-50">{createdAt}</span>
          </li>
          <li>
            <strong className="mr-5 subTitle2 text-base">
              Última Actualización de datos:
            </strong>
            <span className="paragraphText my-0 opacity-50">{updatedAt}</span>
          </li>
        </ul>
      </section>

      {/* Shows subscription data */}
      {localSubscription && isPending && !plan.startsWith("free") (
        <>
          <hr className="divider" />
          <p className="flex text-md text-amber-500 dark:text-dark-accent drop-shadow-sm font-semibold w-full justify-center items-center">
            Tu suscripción se cancelará el{" "}
            {FormatDate(localSubscription.renewalDate)}.
          </p>
        </>
      )}

      {localSubscription && isPendingToFree && !plan.startsWith("free") (
        <p className="flex text-md text-amber-500 dark:text-dark-accent drop-shadow-sm font-semibold w-full justify-center items-baseline">
          Tu suscripción cambiará a{" "}
          <strong className="text-xl mx-2">Free</strong> el{" "}
          {FormatDate(localSubscription.renewalDate)}.
        </p>
      )}
    </main>
  );
};

export default UserInfo;
