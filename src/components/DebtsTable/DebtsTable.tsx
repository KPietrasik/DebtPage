import React, { useMemo, useState } from "react";
import "./debts-table.less";
import { Debt } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import DebtsTableHeader from "./header/DebtsTableHeader";

interface DebtsTableProps {
  debts: Debt[];
  filter: string;
}

const DebtsTable: React.FC<DebtsTableProps> = ({ debts, filter }) => {
  const [sortKey, setSortKey] = useState<keyof Debt>("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const headers: { key: keyof Debt; label: string }[] = [
    { key: "Name", label: "DŁUŻNIK" },
    { key: "NIP", label: "NIP" },
    { key: "Value", label: "KWOTA ZADŁUŻENIA" },
    { key: "Date", label: "DATA POWSTANIA ZOBOWIĄZANIA" },
  ];

  const sortedDebts = useMemo(() => {
    const filteredDebts = filter
      ? debts.filter(debt =>
          debt.Name.toLowerCase().includes(filter.toLowerCase()) ||
          debt.NIP.includes(filter) ||
          debt.Id.toString().includes(filter)
        )
      : debts;

    return [...filteredDebts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      }
      return a[sortKey] < b[sortKey] ? 1 : -1;
    });
  }, [debts, sortKey, sortOrder, filter]);

  const handleSort = (key: keyof Debt) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(newOrder);
  };

  return (
    <div className="debts-table">
      <div className="debts-table__grid-header">
        {headers.map(({ key, label }) => (
          <DebtsTableHeader
            key={key}
            name={label}
            order={sortKey === key ? sortOrder : undefined}
            onClick={() => handleSort(key)}
          />
        ))}
      </div>
      {sortedDebts.map((debt) => (
        <div key={debt.Id} className="debts-table__row">
          <div className="debts-table__cell">{debt.Name}</div>
          <div className="debts-table__cell">{debt.NIP}</div>
          <div className="debts-table__cell">{formatAmount(debt.Value)}</div>
          <div className="debts-table__cell">{formatDate(debt.Date)}</div>
        </div>
      ))}
    </div>
  );
};

export default DebtsTable;
