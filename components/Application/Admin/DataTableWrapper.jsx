"use client";
import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "./Datatable";
import { useTheme } from "next-themes";
import { resolve } from "styled-jsx/css";
import { darkTheme, lightTheme } from "@/lib/materialTheme";

const DataTableWrapper = ({
  queryKey,
  fetchUrl,
  columnsConfig,
  initialPageSize = 10,
  exportEndPoint,
  deleteEndPoint,
  deleteType,
  trashView,
  createAction,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={resolvedTheme === "dark" ? darkTheme : lightTheme}>
      <Datatable
        queryKey={queryKey}
        fetchUrl={fetchUrl}
        columnsConfig={columnsConfig}
        initialPageSize={initialPageSize}
        exportEndPoint={exportEndPoint}
        deleteEndPoint={deleteEndPoint}
        deleteType={deleteType}
        trashView={trashView}
        createAction={createAction}
      />
    </ThemeProvider>
  );
};

export default DataTableWrapper;
