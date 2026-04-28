export interface AppError extends Error {
  statusCode?: number;
  message: string;
  slack?: string;
}
