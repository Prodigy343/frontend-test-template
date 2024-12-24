export interface AppError {
  message: string;
  status?: number;
  details?: unknown;
}

export interface HttpClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  queryParams?: Record<string, string | number | boolean | undefined>;
}

export interface HttpClientError {
  message: string;
  status?: number;
  details?: unknown;
}