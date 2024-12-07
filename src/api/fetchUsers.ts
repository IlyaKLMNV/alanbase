import { ApiResponse } from "../types/api";

export async function fetchUsers(page: number, limit: number): Promise<ApiResponse> {
  const response = await fetch(
    `https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
