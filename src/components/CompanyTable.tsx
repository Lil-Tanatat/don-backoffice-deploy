import React, { useMemo, useState, useEffect } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import { Pagination } from "@/components/global/Pagination";
import { StatusDot } from "@/components/global/StatusDot";
import { useIsMobile } from "@/hooks/use-mobile";

interface CompanyData {
  id: number;
  healthZone: number;
  name: string;
  totalEmployees: number;
  male: number;
  female: number;
  bmi: "bad" | "warning" | "good";
  cholesterol: "bad" | "warning" | "good";
  triglyceride: "bad" | "warning" | "good";
  diabetes: "bad" | "warning" | "good";
  bloodPressure: "bad" | "warning" | "good";
  waist: "bad" | "warning" | "good";
  packages?: string;
  projects?: string;
}

interface CompanyTableProps {
  data: CompanyData[];
  itemsPerPage?: number;
}

export default function CompanyTable({
  data,
  itemsPerPage = 15,
}: CompanyTableProps) {

  const router = useRouter();
  const isMobile = useIsMobile();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleEditCompany = (companyId: number) => {
    console.log("handleEditCompany called");
    router.push(`/company/edit/${companyId}`);
  };

  const handleViewCompany = (companyId: number) => {
    console.log("handleViewCompany called");
    router.push(`/company/info/${companyId}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const total = data.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const getFontSize = () => (windowWidth < 640 ? "12px" : "14px");
  const getHeaderPadding = () => (windowWidth < 640 ? "8px 4px" : "12px 8px");
  const getCellPadding = () => {
    if (windowWidth < 640) return "6px 4px";
    if (windowWidth < 1024) return "8px 6px";
    return "10px 8px";
  };

  // ปรับ column size ให้เหมาะสมกับหน้าจอ
  const getColumnSize = (baseSize: number) => {
    if (windowWidth < 640) return Math.max(baseSize * 0.6, 50);
    if (windowWidth < 1024) return Math.max(baseSize * 0.8, 60);
    return baseSize;
  };

  const columns = useMemo<MRT_ColumnDef<CompanyData>[]>(
    () => [
      {
        accessorKey: "healthZone",
        header: "เขต",
        size: getColumnSize(50),
      },
      {
        accessorKey: "name",
        header: "ชื่อสถานประกอบการ",
        size: getColumnSize(150),
        Cell: ({ row }) => (
          <button
            className="text-left hover:text-blue-600 hover:underline transition-colors w-full text-xs sm:text-sm"
            onClick={() => handleViewCompany(row.original.id)}
            style={{ 
              whiteSpace: windowWidth < 640 ? "normal" : "nowrap",
              wordBreak: windowWidth < 640 ? "break-word" : "normal"
            }}
          >
            {row.original.name}
          </button>
        ),
      },
      {
        accessorKey: "totalEmployees",
        header: "รวม",
        size: getColumnSize(60),
      },
      {
        accessorKey: "male",
        header: "ชาย",
        size: getColumnSize(50),
      },
      {
        accessorKey: "female",
        header: "หญิง",
        size: getColumnSize(50),
      },
      {
        accessorKey: "bmi",
        header: "BMI",
        size: getColumnSize(60),
        Cell: ({ row }) => <StatusDot status={row.original.bmi} />,
      },
      {
        accessorKey: "cholesterol",
        header: "คอเลฯ",
        size: getColumnSize(60),
        Cell: ({ row }) => <StatusDot status={row.original.cholesterol} />,
      },
      {
        accessorKey: "triglyceride",
        header: "ไขมัน",
        size: getColumnSize(60),
        Cell: ({ row }) => <StatusDot status={row.original.triglyceride} />,
      },
      {
        accessorKey: "diabetes",
        header: "น้ำตาล",
        size: getColumnSize(60),
        Cell: ({ row }) => <StatusDot status={row.original.diabetes} />,
      },
      {
        accessorKey: "bloodPressure",
        header: "ความดัน",
        size: getColumnSize(70),
        Cell: ({ row }) => <StatusDot status={row.original.bloodPressure} />,
      },
      {
        accessorKey: "waist",
        header: "รอบเอว",
        size: getColumnSize(60),
        Cell: ({ row }) => <StatusDot status={row.original.waist} />,
      },
      {
        accessorKey: "packages",
        header: "Packages",
        size: getColumnSize(80),
        Cell: ({ row }) => (
          <span className="text-xs sm:text-sm">
            {row.original.packages || "-"}
          </span>
        ),
      },
      {
        accessorKey: "projects",
        header: "โครงการ",
        size: getColumnSize(80),
        Cell: ({ row }) => (
          <span className="text-xs sm:text-sm">
            {row.original.projects || "-"}
          </span>
        ),
      },
      {
        accessorKey: "Action",
        header: "จัดการ",
        size: getColumnSize(80),
        Cell: ({ row }) => (
          <div className="flex gap-1 items-center justify-center">
            <button
              className="p-1 text-gray-500 hover:text-green-600 transition-colors"
              onClick={() => handleEditCompany(row.original.id)}
            >
              <IconEdit className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="flex items-center gap-1 px-1 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
              <IconTrash className="w-3 h-3" />
              {windowWidth >= 1024 && <span>ลบ</span>}
            </button>
          </div>
        ),
      },
    ],
    [router, windowWidth]
  );

  // Create responsive styles that work with SSR
  const responsiveStyles = useMemo(
    () => ({
      headCell: {
        fontSize: isMobile ? "12px" : "14px",
        padding: isMobile ? "12px 4px" : "20px 7px",
      },
      bodyCell: {
        fontSize: isMobile ? "12px" : "14px",
        paddingMobile: "8px 4px",
        paddingTablet: "12px 8px",
        paddingDesktop: "16px",
      },
    }),
    [isMobile]
  );

  return (
    <MantineProvider theme={{ fontFamily: "Noto Sans Thai" }}>
      <div className="bg-white w-full max-w-full">
        <div className="w-full overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            <MantineReactTable
              columns={columns}
              data={pagedData || []}
              mantineTableProps={{
                highlightOnHover: true,
                withTableBorder: false,
                withColumnBorders: false,
                className: "w-full",
                style: {
                  width: "100%",
                  minWidth:
                    windowWidth < 640
                      ? "600px"
                      : windowWidth < 1024
                      ? "800px"
                      : "1000px",
                  borderRadius: "0",
                  overflow: "visible",
                  boxShadow: "none",
                },
              }}
              mantineTableHeadProps={{
                style: {
                  backgroundColor: "#2D5F4E",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  position: "sticky",
                  top: 0,
                  zIndex: 9999,
                },
              }}
              mantineTableHeadCellProps={{
                style: {
                  backgroundColor: "#0F5F4D",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  fontSize: responsiveStyles.headCell.fontSize,
                  padding: responsiveStyles.headCell.padding,

                  textAlign: "center",
                  verticalAlign: "middle",
                  whiteSpace: windowWidth < 1024 ? "normal" : "nowrap",
                  borderBottom: "none",
                  wordBreak: windowWidth < 1024 ? "break-word" : "normal",
                },
              }}
              mantineTableBodyProps={{
                style: {
                  backgroundColor: "#FFFFFF",
                },
              }}
              mantineTableBodyCellProps={({ column }) => ({
                style: {
                  padding: isMobile
                    ? responsiveStyles.bodyCell.paddingMobile
                    : responsiveStyles.bodyCell.paddingDesktop,
                  fontSize: responsiveStyles.bodyCell.fontSize,
                  textAlign: column.id === "name" ? "left" : "center",
                  borderBottom: "1px solid #F3F4F6",
                  backgroundColor: "#FFFFFF",
                  whiteSpace: windowWidth < 1024 ? "normal" : "nowrap",
                  wordBreak: windowWidth < 1024 ? "break-word" : "normal",
                },
              })}
              mantineTableBodyRowProps={({ renderedRowIndex }) => ({
                style: {
                  backgroundColor:
                    (renderedRowIndex ?? 0) % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                },
              })}
              initialState={{
                pagination: { pageSize, pageIndex: page - 1 },
              }}
              enableSorting={false}
              enableColumnFilters={false}
              enableGlobalFilter={false}
              enablePagination={false}
              enableRowSelection={false}
              enableColumnActions={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              enableTopToolbar={false}
              enableBottomToolbar={false}
              renderEmptyRowsFallback={() => (
                <div className="flex justify-center items-center py-8 sm:py-12 lg:py-16 w-full">
                  <Image
                    src="/backoffice/images/no-data.png"
                    alt="No data available"
                    width={300}
                    height={225}
                    className="max-w-xs sm:max-w-sm lg:max-w-md w-auto h-auto opacity-80 mx-auto"
                  />
                </div>
              )}
            />
          </div>
          <div className="mt-2 sm:mt-4 px-2 sm:px-4">
            <Pagination
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}