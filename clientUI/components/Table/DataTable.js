import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMemo, useState, useEffect } from "react";
import classes from "../../styles/DataTable.module.css";
import Button from "../UI/button";
import Link from "next/link";
import api from "../../pages/api/axios";

/*
 * @file InitialFilters.js
 * @author [Isaiah]
 * @desc This component renders a data grid with columns for id, name, date, value, and toggle button.
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.data - The data to be displayed in the grid.
 * @returns {React.Element} A React component that displays a data grid.
 * Testing a new merge
 */

export default function DataTable(props) {
  const pageSize = 5;

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: pageSize,
    filterActive: false,
  });

  // Define an array to store the rows data
  let rows = [];
  let id = 0;

  useEffect(() => {
    console.log("use effect entered");
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const response = await fetch(
        `http://localhost:3001/featureflags?limit=${pageSize}&offset=${
          (pageState.page - 1) * pageSize
        }`
      );
      const json = await response.json();
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: json,
      }));
    };
    if (pageState.filterActive === false) {
      console.log("data fetched");
      fetchData();
    } else {
      console.log("filterOn Rendering Filter Page Change");
      console.log(pageState.data);
    }
  }, [pageState.page, pageState.pageSize, pageState.filterActive]);

  // Use the useMemo hook to transform the props.data into the required format
  useMemo(() => {
    if (pageState.data.length !== 0) {
      console.log(pageState.data);
      pageState.data.map((feature) => {
        rows.push({
          id: +id, // Convert the key to a number
          key: feature.key,
          name: feature.name,
          date: feature.lastUpdatedDate,
          description: feature.description,
          value: feature.value ? "On" : "Off",
          buttonVal: +feature.key, // Convert the key to a number
        });
        id++;
      });
    }
  }, [pageState.data]);

  // Define the data for the grid
  const data = {
    columns: [
      { field: "id" },
      {
        field: "name",
        headerName: "Feature",
        flex: 1,
      },
      {
        field: "date",
        headerName: "Last Updated",
        type: "date",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "value",
        headerName: "State (On/Off)",
        flex: 1,
        // Render the cell with either a checkmark or an x based on the value
        renderCell: (params) => {
          return params.value === "On" ? (
            <div className={classes.check}>&#x2713;</div>
          ) : (
            <div className={classes.x}>&#10005;</div>
          );
        },
      },
      {
        field: "buttonVal",
        headerName: "Toggle",
        flex: 1,
        // Render the cell with a button
        renderCell: (params) => {
          // console.log(params.row.key);
          return (
            <Link
              className={classes.link}
              href={`feature-item/${params.row.key}`}
            >
              Update
            </Link>
          );
        },
      },
    ],
    rows: rows,
  };

  // Return the DataGrid component, with the given data and style
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
        {...data}
        pagination
        rowCount={pageState.filterActive ? 1 : 10}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        paginationMode="server"
        loading={pageState.isLoading}
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        onPageChange={(newPage) => {
          setPageState((old) => ({ ...old, page: newPage + 1 }));
        }}
        onFilterModelChange={(filter) => {
          const fetchData = async () => {
            setPageState((old) => ({ ...old, isLoading: true }));
            const response = await fetch(`http://localhost:3001/featureflags`);
            const json = await response.json();
            setPageState((old) => ({
              ...old,
              isLoading: false,
              data: json,
            }));
          };
          if (
            (filter.items.length === 1) &
            (filter.items[0].value !== undefined)
          ) {
            fetchData();
            setPageState((old) => ({ ...old, filterActive: true }));
          } else {
            setPageState((old) => ({ ...old, filterActive: false }));
          }
        }}
      />
    </div>
  );
}

// rowCount={pageState.total}
// loading={pageState.isLoading}
// rowsPerPageOptions={[10, 30, 50, 70, 100]}
// pagination
// page={pageState.page - 1}
// pageSize={pageState.pageSize}
// paginationMode="server"
// onPageChange={(newPage) => {
//   setPageState(old => ({ ...old, page: newPage + 1 }))
// }}
// onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
// columns={columns}
