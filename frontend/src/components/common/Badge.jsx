import React from 'react';
import { STATUS_COLORS, EXPERIENCE_COLORS } from '../../utils/constants';

const Badge = ({ type, value, size = 'sm' }) => {
  const sizes = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1'
  };

  let colorClass = 'bg-gray-100 text-gray-700';

  if (type === 'status' || type === 'jobType') {
    colorClass = STATUS_COLORS[value] || colorClass;
  } else if (type === 'experience') {
    colorClass = EXPERIENCE_COLORS[value] || colorClass;
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizes[size]} ${colorClass}`}>
      {value?.replace(/-/g, ' ')}
    </span>
  );
};

export default Badge;