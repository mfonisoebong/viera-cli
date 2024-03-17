import { AxiosError } from "axios";

export const errorParser = (error: unknown): string => {
  const DEFAULT_ERROR = "An error occured";
  if (error instanceof AxiosError) {
    const errorData = error.response?.data;
    const err: string =
      "message" in errorData ? errorData.message : DEFAULT_ERROR;
    return err;
  }
  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_ERROR;
};
