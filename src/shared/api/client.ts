import { BASE_URL, createFetcherInstance } from "./fetcher";
import type {
  ClientFetcherOptions,
  FetcherConfig,
  FetcherInstance,
  NextRequestInit,
  RequestInterceptor,
  ServerFetcherOptions,
} from "./types";

const AUTH_COOKIE_NAME = "auth-token";

function makeAuthInterceptor(token: string): RequestInterceptor {
  return (init: NextRequestInit): NextRequestInit => ({
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init.headers },
  });
}

export async function createServerFetcher(
  options: ServerFetcherOptions = {}
): Promise<FetcherInstance> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const config: FetcherConfig = {
    baseUrl: options.baseUrl ?? BASE_URL,
    requestInterceptors: [
      ...(token ? [makeAuthInterceptor(token)] : []),
      ...(options.requestInterceptors ?? []),
    ],
    responseInterceptors: options.responseInterceptors ?? [],
  };
  return createFetcherInstance(config);
}

function readTokenFromCookie(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${AUTH_COOKIE_NAME}=`));
  return match?.split("=")[1];
}

export function createClientFetcher(
  options: ClientFetcherOptions = {}
): FetcherInstance {
  const token = options.token ?? readTokenFromCookie();

  const config: FetcherConfig = {
    baseUrl: options.baseUrl ?? BASE_URL,
    requestInterceptors: [
      ...(token ? [makeAuthInterceptor(token)] : []),
      ...(options.requestInterceptors ?? []),
    ],
    responseInterceptors: options.responseInterceptors ?? [],
  };
  return createFetcherInstance(config);
}

export const clientFetcher: FetcherInstance = createClientFetcher();
