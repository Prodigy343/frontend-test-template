import { HttpClientError, HttpClientOptions } from "@/types/common";

export const httpClient = async <T>(endpoint: string, options: HttpClientOptions = {}): Promise<T> => {
  const { method = "GET", headers = {}, body, queryParams } = options;

  const queryString = queryParams
    ? "?" +
      Object.entries(queryParams)
        .filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&")
    : "";

  const url = `${endpoint}${queryString}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message || "Request failed",
        status: response.status,
        details: errorData,
      } as HttpClientError;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw { message: "Failed to parse response", details: error } as HttpClientError;
    }
    throw error;
  }
};