const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

export async function fetchRepos() {
  const res = await fetch(`${BASE_URL}/repo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();

    if (err.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    throw new Error("Failed to fetch repositories");
  }

  return res.json();
}

export async function addRepo(path: string) {
  const res = await fetch(`${BASE_URL}/repo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ path }),
  });

  if (!res.ok) {
    const err = await res.json();

    if (err.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    throw new Error(err.message || "Failed to add repo");
  }

  return res.json();
}

export async function deleteRepo(id: string) {
  const res = await fetch(`${BASE_URL}/repo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();

    if (err.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    throw new Error("Failed to delete repo");
  }

  return true;
}

export async function refreshRepo(id: string) {
  const res = await fetch(`${BASE_URL}/repo/${id}/refresh`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();

    if (err.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    throw new Error("Failed to refresh repo");
  }

  return res.json();
}
