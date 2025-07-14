/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Button from "@atoms/Button.jsx";
import useAuthAxios from "@hooks/useAuthAxios.jsx";
import SubmitButton from "@molecules/SubmitButton.jsx";
import PasswordInput from "@molecules/PasswordInput.jsx";
import PasswordValidation from "@dashCommon/PasswordValidation.jsx";
import { toast } from "sonner";
import { API_URL } from "@src/Env.jsx";
import { TbCancel } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const isResetMode = Boolean(token);
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { currentPassword, newPassword, confirmPassword } = passwords;
  const passwordInfo = {
    length: newPassword.length,
    match: newPassword.length > 0 && newPassword === confirmPassword,
  };
  const navigate = useNavigate();
  const authAxios = useAuthAxios();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPasswords({
      ...passwords,
      [id]: value,
    });
  };

  useEffect(() => {
    if (newPassword.length > 0) {
      setPasswordChecked(true);
    }
  }, [newPassword]);

  // ************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    if (!passwordRegex.test(newPassword || confirmPassword)) {
      toast.warning("La contraseña no cumple con los requisitos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    if (
      (!isResetMode && !currentPassword) ||
      !newPassword ||
      !confirmPassword
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let response;

      if (isResetMode) {
        response = await axios.post(`${API_URL}/reset-password`, {
          token,
          newPassword,
        });
      } else {
        response = await authAxios.put(
          `${API_URL}/user/${userId}/change-password`,
          passwords
        );
      }
      toast.success(
        response.data.message || "Contraseña cambiada correctamente"
      );
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordChecked(false);
      setTimeout(() => {
        navigate(isResetMode ? "/login" : "/dashboard/myaccount");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error cambiando la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };
  // ************************************
  return (
    <section className="flex w-full h-[80dvh] items-center justify-center">
      <aside className="max-w-md mx-auto mt-10 p-8 grlContainer shadow-lg rounded-lg w-full">
        <h2 className="title text-xl font-semibold text-center mb-4">
          Cambiar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isResetMode && (
            <PasswordInput
              label="Contraseña actual"
              id="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña actual"
              required
            />
          )}

          <PasswordValidation
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onPasswordChange={handleChange}
            onConfirmPasswordChange={handleChange}
            passwordChecked={passwordChecked}
            passwordInfo={passwordInfo}
          />

          <aside className="flex flex-row justify-between">
            <Button
              label="Cancelar"
              variant="secondary"
              icon={TbCancel}
              onClick={() =>
                navigate(isResetMode ? "/login" : "/dashboard/myaccount")
              }
            />
            <SubmitButton
              type="submit"
              disabled={loading}
              label={loading ? "Cambiando..." : "Cambiar Contraseña"}
            />
          </aside>
        </form>
      </aside>
    </section>
  );
};

export default ChangePassword;
