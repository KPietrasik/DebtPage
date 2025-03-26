import React, { useState } from "react";
import { useQuery } from "react-query";
import { getFilteredDebts } from "../../services/getFilteredDebts";
import { getTopDebts } from "../../services/getTopDebts";
import { Debt } from "../../types";
import Loader from "../Loader/Loader";
import DebtsFilters from "../DebtsFilters/DebtsFilters";
import DebtsTable from "../DebtsTable/DebtsTable";
import Toast from "../Toast/Toast";
import "./debts-page.less";

const DebtsPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: topDebts,
    isLoading: isLoadingTopDebts,
    refetch: refetchTopDebts,
  } = useQuery<Debt[]>("topDebts", getTopDebts, {
    onError: () =>
      setErrorMessage("Niespodziewany błąd podczas pobierania danych."),
  });

  const {
    data: filteredDebts,
    isLoading: isLoadingFilteredDebts,
  } = useQuery<Debt[]>(
    ["filteredDebts", filterValue],
    () => getFilteredDebts(filterValue),
    {
      enabled: filterValue.length >= 3,
      onError: () =>
        setErrorMessage("Błąd podczas filtrowania danych. Spróbuj ponownie."),
    }
  );

  const handleFilterChange = (newFilter: string) => {
    setFilterValue(newFilter);
  };

  const handleFilterReset = () => {
    setFilterValue("");
    refetchTopDebts();
  };

  const isLoading = isLoadingTopDebts || isLoadingFilteredDebts;

  const tableData = () => filterValue === "" ? topDebts : filteredDebts;

  return (
    <div className="debts-page">
      <div className="debts-page__header">
        <DebtsFilters
          onFilterChange={handleFilterChange}
          onFilterReset={handleFilterReset}
        />
        {errorMessage && <Toast message={errorMessage} type="error" />}
      </div>
      <div className="debts-page__content">
      {isLoading ? (
          <Loader />
        ) : (
          <DebtsTable
            debts={tableData() || []}
            filter={filterValue}
          />
        )}
      </div>
    </div>
  );
};

export default DebtsPage;
