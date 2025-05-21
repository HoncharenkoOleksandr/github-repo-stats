import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addRepo, deleteRepo, fetchRepos, refreshRepo } from "@/api/repoApi";
import { RepoResponse } from "@/types";

export function useRepos() {
  return useQuery<RepoResponse[], Error>({
    queryKey: ["repos"],
    queryFn: fetchRepos,
  });
}

export function useAddRepo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repos"] });
    },
  });
}

export function useDeleteRepo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repos"] });
    },
  });
}

export function useRefreshRepo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repos"] });
    },
  });
}
