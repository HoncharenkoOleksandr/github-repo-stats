import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

import { DeleteIcon, EditIcon } from "./icons";

import { RepoResponse } from "@/types";

interface RepoTableProps {
  actionId: string | null;
  rowsResponse: RepoResponse[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  isRefreshRepoPending: boolean;
  isDeleteRepoPending: boolean;
}

const columns = [
  { key: "name", label: "NAME" },
  { key: "owner", label: "OWNER" },
  { key: "url", label: "URL" },
  { key: "stars", label: "STARS" },
  { key: "forks", label: "FORKS" },
  { key: "openIssues", label: "OPEN ISSUES" },
  { key: "createdAt", label: "CREATED AT" },
  { key: "actions", label: "ACTIONS" },
];

const RepoTable: React.FC<RepoTableProps> = ({
  actionId,
  rowsResponse,
  onUpdate,
  onDelete,
  isRefreshRepoPending,
  isDeleteRepoPending,
}) => {
  const rows = rowsResponse.map((repo) => ({
    key: repo.id,
    name: repo.name,
    owner: repo.owner,
    url: repo.url,
    stars: repo.stars,
    forks: repo.forks,
    openIssues: repo.openIssues,
    createdAt: new Date(repo.createdAtUTC).toLocaleDateString(),
    actions: repo.id,
  }));

  return (
    <Table aria-label="Repository Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              switch (columnKey) {
                case "actions":
                  return (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          color="primary"
                          isLoading={
                            isRefreshRepoPending && item.actions === actionId
                          }
                          size="sm"
                          onClick={() => onUpdate(item.actions)}>
                          <EditIcon className="color-white" />
                        </Button>
                        <Button
                          color="danger"
                          isLoading={
                            isDeleteRepoPending && item.actions === actionId
                          }
                          size="sm"
                          onClick={() => onDelete(item.actions)}>
                          <DeleteIcon className="color-white" />
                        </Button>
                      </div>
                    </TableCell>
                  );
                case "url":
                  return (
                    <TableCell>
                      <Link color="foreground" href={item.url} target="_blank">
                        {item.name}
                      </Link>
                    </TableCell>
                  );
                default:
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RepoTable;
