/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import Input from "@molecules/Input";
import SubmitButton from "@molecules/SubmitButton";
import useAuthAxios from "@hooks/useAuthAxios";
import Button from "@atoms/Button";
import FormatDate from "@dashCommon/FormatDate";
import PlanLabel from "@dashCommon/PlanLabel.jsx";
import { API_URL } from "@src/Env.jsx";
import { AuthContext } from "@context/AuthContext";
import { Loader } from "@common/Loader.jsx";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";

const UserInfo = ({ user, setUser, isCancellationPending }) => {
  const { plan } = useContext(AuthContext);
  const createdAt = FormatDate(user.createdAt);
  const updatedAt = FormatDate(user.updatedAt);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);
  const authAxios = useAuthAxios();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await authAxios.put(
        `${API_URL}/user/${user._id}`,
        formData
      );
      setUser(response.data);
      dispatch({ type: "UPDATE_USER", payload: response.data });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader type="spinner" className="w-full" />;
  }

  return (
    <main className="py-2 px-3 w-full">
      <section>
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </section>
      <section className="flex justify-end itmes-center h-11 my-5">
        {isEditing ? (
          <span className="flex gap-3">
            <SubmitButton
              label="Guardar"
              loading={loading}
              onClick={handleSave}
            />
            <Button
              label="Cancelar"
              variant="secondary"
              onClick={() => setIsEditing(false)}
              icon={MdOutlineCancel}
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
      <hr />
      <section className="flex flex-col md:flex-row gap-5">
        <aside className="flex flex-row md:flex-col items-center justify-center gap-3 w-full md:w-1/3">
          <span
            className={`dropshadow-lg text-5xl ${
              plan === "free"
                ? "text-[#28A745]"
                : plan === "pro"
                ? "text-[#C0C0C0]"
                : "text-[#DAA520]"
            }`}
          >
            <FaMedal />
          </span>
          <span className="flex grlTxt w-full justify-center items-center text-center">
            <PlanLabel plan={plan} />
          </span>
          <Button
            label="ver Suscripión"
            variant="link"
            className="w-full md:w-auto flex justify-center"
          />
        </aside>

        <ul className="flex flex-col gap-2 list-disc w-full ml-5 mt-5">
          <li className="">
            <strong className="mr-5 subTitle2 text-base">
              Fecha de Creación
            </strong>
            <span className="paragraphText my-0 opacity-50">{createdAt}</span>
          </li>
          <li className="">
            <strong className="mr-5 subTitle2 text-base">
              Ultima Actualización de datos:
            </strong>
            <span className="paragraphText my-0 opacity-50">{updatedAt}</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default UserInfo;
