// The app is written in plain JavaScript; let TypeScript entry files import it.
declare module "*.jsx" {
  const anyExport: any;
  export = anyExport;
}
declare module "*.js" {
  const anyExport: any;
  export = anyExport;
}
