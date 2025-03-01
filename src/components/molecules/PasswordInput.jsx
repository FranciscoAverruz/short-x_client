
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, forwardRef } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { GoKey } from "react-icons/go";
import Input from '@molecules/Input.jsx'; 
import Button from '@atoms/Button.jsx';

  const PasswordInput = forwardRef(({id, label, value, placeholder, className, onClick, onChange, onFocus, onBlur, required }, ref) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        label={label}
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        icon={<GoKey />}
        ref={ref}
      />
      <Button
        type="button"
        onClick={togglePasswordVisibility}
        variant="toggle"
        icon={showPassword ? RiEyeOffLine : RiEyeLine}
        className="absolute right-1 transform -translate-y-[2.2rem] bg-transparent text-xl cursor-pointer mr-0"
      />
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
