import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";

import { title } from "@/components/primitives";
import RepoTable from "@/components/table";
import {
  useAddRepo,
  useDeleteRepo,
  useRefreshRepo,
  useRepos,
} from "@/hooks/repoHooks";
import DefaultLayout from "@/layouts/default";

export default function DashboardPage() {
  const [repoPath, setRepoPath] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const { data: repos, isLoading, refetch } = useRepos();

  const { mutate: addRepoMutation, isPending: isAddRepoPending } = useAddRepo();

  const { mutate: deleteRepoMutation, isPending: isDeleteRepoPending } =
    useDeleteRepo();

  const { mutate: refreshRepoMutation, isPending: isRefreshRepoPending } =
    useRefreshRepo();

  const handleAddRepo = () => {
    if (!repoPath.trim()) return;
    addRepoMutation(repoPath, {
      onSuccess: () => {
        setRepoPath("");
        setAlertMessage("Repository added successfully");
        setAlertType("success");
        refetch();
      },
      onError: (error) => {
        setAlertMessage(
          `Error adding repository: ${error.toString().split(":")[1]}`
        );
        setAlertType("error");
      },
    });
  };

  const handleDelete = (id: string) => {
    setActionId(id);
    deleteRepoMutation(id, {
      onSuccess: () => {
        setAlertMessage("Repository has been deleted");
        setAlertType("success");
        refetch();
      },
      onError: (error) => {
        setAlertMessage(
          `Error during deletion: ${error.toString().split(":")[1]}`
        );
        setAlertType("error");
      },
    });
  };

  const handleRefresh = (id: string) => {
    setActionId(id);
    refreshRepoMutation(id, {
      onSuccess: () => {
        setAlertMessage("Repository updated");
        setAlertType("success");
        refetch();
      },
      onError: (error) => {
        setAlertMessage(
          `Error during update: ${error.toString().split(":")[1]}`
        );
        setAlertType("error");
      },
    });
  };

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage("");
        setAlertType(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-full text-center justify-center">
          <h1 className={title()}>Dashboard</h1>
          <div className="flex gap-2 w-full mt-4">
            <Input
              className="w-full"
              placeholder="Enter a repo path"
              value={repoPath}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRepoPath(e.target.value)
              }
            />
            <Button isLoading={isAddRepoPending} onClick={handleAddRepo}>
              Add
            </Button>
          </div>

          <div className="w-full mt-8">
            {isLoading ? (
              <Spinner />
            ) : (
              <RepoTable
                actionId={actionId}
                isDeleteRepoPending={isDeleteRepoPending}
                isRefreshRepoPending={isRefreshRepoPending}
                rowsResponse={repos || []}
                onDelete={handleDelete}
                onUpdate={handleRefresh}
              />
            )}
          </div>

          {alertMessage && (
            <div className="w-full mt-8">
              <Alert color={alertType === "success" ? "success" : "danger"}>
                {alertMessage}
              </Alert>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
