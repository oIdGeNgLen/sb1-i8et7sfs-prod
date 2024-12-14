export const logger = {
  info: (message: string) => console.log(message),
  warn: (message: string) => console.warn('\x1b[33m%s\x1b[0m', message),
  error: (message: string, error?: unknown) => {
    console.error('\x1b[31m%s\x1b[0m', message);
    if (error) console.error(error);
  },
  success: (message: string) => console.log('\x1b[32m%s\x1b[0m', message)
};