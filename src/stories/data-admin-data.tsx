import { Badge, DataColumn, StatusDot, TableCellText } from "../components";

export interface ComponentRow {
  id: string;
  name: string;
  target: "desktop" | "mobile" | "admin" | "editorial";
  status: "stable" | "review" | "draft";
  stories: number;
  owner: string;
}

export const rows: ComponentRow[] = [
  { id: "cmp-001", name: "Button", target: "admin", status: "stable", stories: 8, owner: "Miskun" },
  { id: "cmp-002", name: "DataTable", target: "admin", status: "review", stories: 4, owner: "Miskun" },
  { id: "cmp-003", name: "Hero", target: "editorial", status: "draft", stories: 2, owner: "Brand" },
  { id: "cmp-004", name: "CommandPalette", target: "desktop", status: "review", stories: 5, owner: "Tools" },
  { id: "cmp-005", name: "BottomSheet", target: "mobile", status: "draft", stories: 3, owner: "Mobile" },
];

export const columns: Array<DataColumn<ComponentRow>> = [
  {
    id: "name",
    header: "Component",
    accessor: "name",
    sortable: true,
    grow: true,
    minWidth: 180,
    cell: (row) => <TableCellText secondary={row.id}>{row.name}</TableCellText>,
  },
  {
    id: "target",
    header: "Target",
    accessor: "target",
    sortable: true,
    defaultWidth: 140,
    minWidth: 110,
    resizable: false,
    cell: (row) => <Badge tone={row.target === "admin" ? "accent" : "neutral"}>{row.target}</Badge>,
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    sortable: true,
    defaultWidth: 130,
    minWidth: 110,
    cell: (row) => <StatusDot tone={row.status === "stable" ? "success" : row.status === "review" ? "warning" : "neutral"} label={row.status} />,
  },
  { id: "stories", header: "Stories", accessor: "stories", sortValue: "stories", sortable: true, numeric: true, defaultWidth: 96, minWidth: 80, maxWidth: 140 },
  { id: "owner", header: "Owner", accessor: "owner", sortable: true, defaultWidth: 140, minWidth: 110, hideable: true },
];
