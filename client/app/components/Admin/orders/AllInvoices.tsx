"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme as NextTheme } from "next-themes";
import { format } from "timeago.js";

import AdminHeader from "../topbar/AdminHeader";
import Loader from "../../Loader/Loader";
import { tokens } from "../sidebar/Theme";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  isDashboard: boolean;
  open: boolean;
};

const AllInvoices: React.FC<Props> = ({ isDashboard, open }) => {
  const { theme: themes, setTheme } = NextTheme();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: userData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = userData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses?.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "रु." + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "Id", flex: 0.3 },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.6 : 0.5,
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "userEmail",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "title",
            headerName: "course title",
            flex: 1,
          },
        ]),
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    ...(isDashboard
      ? [
          {
            field: "createdAt",
            headerName: "Created At",
            flex: 0.5,
          },
        ]
      : [
          {
            field: "",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <>
                  <a href={`mailto:${params.row.userEmail}`}>
                    <AiOutlineMail
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </a>
                </>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        createdAt: format(item.createdAt),
      });
    });

  return (
    <div
      className={`${
        isDashboard ? "mt-0" : "mt-[20px] ml-12 w-full relative h-screen"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "20px"}>
          {isDashboard ? (
            ""
          ) : (
            <AdminHeader title="INVOICE" subtitle="List of invoices" />
          )}
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "40vh" : "75vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                ouline: "none",
                color: `${themes === "dark" ? "#fff !important" : ""}`,
                zIndex: open ? -1 : 1,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                color: `${themes === "dark" ? "#000 !important" : ""}`,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: `${
                  themes === "dark"
                    ? "#111C43 !important"
                    : `${colors.primary[400]} !important`
                }`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              slots={isDashboard ? {} : { toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
