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

const ChangePassword = () => {
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const authAxios = useAuthAxios();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    if (formData.newPassword.length > 0) {
      setPasswordChecked(true);
    }
  }, [formData.newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    if (!passwordRegex.test(formData.newPassword || formData.confirmPassword)) {
      toast.warning("La contraseña no cumple con los requisitos.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await authAxios.put(
        `${API_URL}/user/${userId}/change-password`,
        formData
      );
      toast.success(response.data.message);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordChecked(false);
      setTimeout(() => {
        navigate("/dashboard/myaccount");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error cambiando la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-8 grlContainer shadow-lg rounded-lg">
      <h2 className="title text-xl font-semibold text-center mb-4">
        Cambiar Contraseña
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          label="Contraseña actual"
          id="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña actual"
          required
        />
        <PasswordValidation
          newPassword={formData.newPassword}
          confirmPassword={formData.confirmPassword}
          onPasswordChange={handleChange}
          onConfirmPasswordChange={handleChange}
          passwordChecked={passwordChecked}
        />
        <aside className="flex flex-row justify-between">
          <Button
            label="Cancelar"
            variant="secondary"
            icon={TbCancel}
            onClick={() => navigate("/dashboard/myaccount")}
          />
          <SubmitButton
            type="submit"
            disabled={loading}
            label={loading ? "Cambiando..." : "Cambiar Contraseña"}
          />
        </aside>
      </form>
    </section>
  );
};

export default ChangePassword;
