export const isNodeError = (error: Error): error is NodeJS.ErrnoException =>
	error instanceof Error;
