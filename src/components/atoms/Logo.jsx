/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {lazy} from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ link = "/", imageSrc, altText = "LinkShortener", extraClass = ""}) => {
  return (
    <Link to={link} className={`flex items-center ${extraClass}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={altText} loading="lazy" className="" />
      ) : (
        <span className="text-2xl font-bold text-light-Title dark:text-dark-Title">{altText}</span>
      )}
    </Link>
  );
};

export default Logo;
