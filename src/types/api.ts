export interface ApiErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    "errors" in data &&
    typeof (data as ApiErrorResponse).message === "string" &&
    typeof (data as ApiErrorResponse).errors === "object"
  );
}

export function getApiErrorMessages(data: ApiErrorResponse): string[] {
  return Object.values(data.errors).flat();
}

export function getApiErrorMessage(data: ApiErrorResponse): string {
  const messages = getApiErrorMessages(data);
  return messages.length > 0 ? messages.join(". ") : data.message;
}
