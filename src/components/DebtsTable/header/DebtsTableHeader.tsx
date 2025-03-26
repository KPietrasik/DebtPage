import React from "react";
import "../debts-table.less";
import ArrowIcon from "./ArrowIcon";

interface DebtsTableHeaderProps {
  name: string;
  order: "asc" | "desc" | undefined;
  onClick: () => void;
}

const DebtsTableHeader: React.FC<DebtsTableHeaderProps> = ({
  name,
  order,
  onClick,
}) => {
  return (
    <div
      className={`debts-table__grid-header ${order ? (order === "asc" ? "asc" : "desc") : ""}`}
      onClick={onClick}
    >
      <p> {name}
      {order && <ArrowIcon order={order} />}
      </p>
    </div>
  );
};

export default DebtsTableHeader;
