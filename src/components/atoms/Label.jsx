/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Label = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor} className="labelInput">
    {children} {required && <span className='ml-1'>*</span>}
  </label> 
);

export default Label;
