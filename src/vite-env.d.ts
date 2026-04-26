/// <reference types="vite/client" />

declare const __APP_COMMIT_VERSION__: string;

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
