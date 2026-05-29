import React from 'react';

const FormError = ({ error }) => {
  if (!error) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {error}
    </p>
  );
};

export default FormError;