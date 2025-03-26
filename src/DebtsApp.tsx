import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DebtsPage from "./components/DebtPage/DebtsPage";

const DebtsApp: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DebtsPage/>
    </QueryClientProvider>
  );
};

export default DebtsApp;
