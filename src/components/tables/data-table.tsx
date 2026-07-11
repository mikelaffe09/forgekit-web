import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Columns3,
  Download,
  RotateCcw,
} from "lucide-react"

import { useLocalStorageState } from "../../hooks/use-local-storage-state"
import { EmptyState } from "../shared/empty-state"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  emptyTitle?: string
  emptyDescription?: string
  isLoading?: boolean
  enableExport?: boolean
  exportFileName?: string
  enableColumnVisibility?: boolean
  storageKey?: string
}

type DataTablePreferences = {
  columnVisibility: VisibilityState
  pageSize: number
}

const defaultPreferences: DataTablePreferences = {
  columnVisibility: {},
  pageSize: 5,
}

function formatCsvValue(value: unknown) {
  if (value === null || value === undefined) {
    return ""
  }

  const stringValue = String(value).replace(/"/g, '""')

  return `"${stringValue}"`
}

function downloadCsv(rows: Record<string, unknown>[], fileName: string) {
  if (rows.length === 0) {
    return
  }

  const headers = Object.keys(rows[0])
  const csvRows = [
    headers.map(formatCsvValue).join(","),
    ...rows.map((row) =>
      headers.map((header) => formatCsvValue(row[header])).join(","),
    ),
  ]

  const csvContent = csvRows.join("\n")
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`
  link.click()

  URL.revokeObjectURL(url)
}

function formatColumnLabel(columnId: string) {
  return columnId
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/^./, (char) => char.toUpperCase())
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  isLoading = false,
  enableExport = false,
  exportFileName = "table-export.csv",
  enableColumnVisibility = false,
  storageKey,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [preferences, setPreferences] =
    useLocalStorageState<DataTablePreferences>(
      storageKey ? `forgekit-table-${storageKey}` : "forgekit-table-default",
      defaultPreferences,
    )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility: storageKey
        ? preferences.columnVisibility
        : defaultPreferences.columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: storageKey ? preferences.pageSize : defaultPreferences.pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: (updater) => {
      const nextColumnVisibility =
        typeof updater === "function"
          ? updater(preferences.columnVisibility)
          : updater

      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        columnVisibility: nextColumnVisibility,
      }))
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const visibleColumnCount = table.getVisibleFlatColumns().length

  function handlePageSizeChange(pageSize: number) {
    table.setPageSize(pageSize)

    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      pageSize,
    }))
  }

  function handleResetView() {
    setSorting([])
    table.resetColumnFilters()
    table.setPageIndex(0)
    table.setPageSize(defaultPreferences.pageSize)
    setPreferences(defaultPreferences)
  }

  function handleExport() {
    const filteredRows = table
      .getFilteredRowModel()
      .rows.map((row) => row.original as Record<string, unknown>)

    downloadCsv(filteredRows, exportFileName)
  }

  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {searchKey ? (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            disabled={isLoading}
          />
        ) : (
          <div />
        )}

        <div className="flex flex-wrap gap-2">
          {enableColumnVisibility ? (
            <details className="relative">
              <summary className="inline-flex h-9 cursor-pointer list-none items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
                <Columns3 className="mr-2 size-4" />
                Columns
              </summary>

              <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
                <div className="space-y-1">
                  {hideableColumns.map((column) => (
                    <label
                      key={column.id}
                      className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={(event) =>
                          column.toggleVisibility(event.target.checked)
                        }
                        disabled={isLoading}
                        className="size-4"
                      />

                      <span>{formatColumnLabel(column.id)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </details>
          ) : null}

          <Button variant="outline" onClick={handleResetView} disabled={isLoading}>
            <RotateCcw className="mr-2 size-4" />
            Reset view
          </Button>

          {enableExport ? (
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isLoading || table.getFilteredRowModel().rows.length === 0}
            >
              <Download className="mr-2 size-4" />
              Export CSV
            </Button>
          ) : null}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted()

                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={isLoading}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {sortDirection === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : sortDirection === "desc" ? (
                            <ArrowDown className="size-3.5" />
                          ) : (
                            <ArrowUpDown className="size-3.5 text-muted-foreground" />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: visibleColumnCount }).map(
                    (__, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumnCount || columns.length}>
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} result(s)
        </p>

        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(event) => {
              handlePageSizeChange(Number(event.target.value))
            }}
            disabled={isLoading}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} / page
              </option>
            ))}
          </select>

          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={isLoading || !table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={isLoading || !table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}