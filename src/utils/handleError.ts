import { REQUEST_DEFAULT_ERROR_MESSAGE, UNEXPECTED_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from "@/static/messages";
import { AppError, HttpClientError } from "@/types/common";

export const handleError = (error: unknown): AppError => {
  if (isHttpClientError(error)) {
    return {
      message: error.message || REQUEST_DEFAULT_ERROR_MESSAGE,
      status: error.status,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || UNEXPECTED_ERROR_MESSAGE,
    };
  }

  return {
    message: UNKNOWN_ERROR_MESSAGE,
  };
};

const isHttpClientError = (error: unknown): error is HttpClientError => {
  return typeof error === "object" && error !== null && "message" in error && "status" in error;
};