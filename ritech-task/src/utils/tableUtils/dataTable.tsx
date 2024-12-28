import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { setBadge } from "../helperFunctions";
import { Badge } from "@/components/ui/badge";
import { GoalStatusType, RoleType } from "../types";
import { formatDate } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="table max-h-96 w-full font-primary text-card-foreground">
      <TableHeader className="top-0 font-bold tracking-wide">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const isFirst = index === 0;
              const isLast = index === headerGroup.headers.length - 1;
              return (
                <TableHead
                  key={header.id}
                  className={`${
                    isFirst ? "rounded-tl-lg" : ""
                  } ${isLast ? "rounded-tr-lg" : ""} bg-secondary text-foreground dark:border-b dark:border-primary`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className="border-muted"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="border-muted" key={cell.id}>
                  {cell.column.id === "role" ? (
                    <Badge
                      variant={setBadge(cell.getValue() as RoleType)}
                      className="text-center font-secondary capitalize tracking-wide"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Badge>
                  ) : cell.column.id === "createdAt" || cell.column.id === 'dueDate' ? (
                    formatDate(
                      new Date(cell.getValue() as number),
                      "iii, LLL dd yyyy",
                    )
                  ) : cell.column.id === "status" ? (
                    <Badge
                      variant={setBadge(cell.getValue() as GoalStatusType)}
                      className="text-center font-secondary capitalize tracking-wide"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Badge>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-16 text-center">
              No results!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
