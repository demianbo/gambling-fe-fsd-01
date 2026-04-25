import { createServerFetcher, clientFetcher } from "@/shared/api";
import type { UserDto } from "../model";

export async function getUserServer(userId: string): Promise<UserDto> {
  const fetcher = await createServerFetcher();
  return fetcher.get<UserDto>(`/users/${userId}`);
}

export function getUser(userId: string): Promise<UserDto> {
  return clientFetcher.get<UserDto>(`/users/${userId}`);
}
