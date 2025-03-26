import React from 'react';

interface ArrowIconProps {
  order?: "asc" | "desc";
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ order }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      className={`debts-table__arrow ${order ? (order === "asc" ? "asc" : "desc") : ""}`}
    >
      <polygon points="0,0 12,0 6,6" />
    </svg>
  );
};

export default ArrowIcon;
