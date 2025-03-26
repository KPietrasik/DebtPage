import React, { useState } from "react";
import "./debts-filters.less";

interface DebtsFiltersProps {
  onFilterChange: (filter: string) => void;
  onFilterReset: () => void;
}

const DebtsFilters: React.FC<DebtsFiltersProps> = ({
  onFilterChange,
  onFilterReset,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0 && value.length < 3) {
      setValidationMessage("Wyszukiwany ciąg musi mieć co najmniej 3 znaki.");
    } else {
      setValidationMessage(undefined);
    }
  };

  const handleSearch = async () => {
    if (inputValue.length >= 3) {
      onFilterChange(inputValue);
    } else if (inputValue.length === 0) {
      onFilterReset();
    }
  };

  return (
    <div className="debts-filters">
      <div className="debts-filters__label">
        <p>PODAJ NIP LUB NAZWĘ DŁUŻNIKA</p>
      </div>
      <div className="debts-filters__input-container">
        <input
          type="text"
          id="filter"
          value={inputValue}
          onChange={handleChange}
          className="debts-filters__input"
          name="debtFilter"
        />

        <button className="debts-filters__button" onClick={handleSearch}>
          SZUKAJ
        </button>
      </div>

      <div className="debts-filters__validation">{validationMessage}</div>
    </div>
  );
};

export default DebtsFilters;
