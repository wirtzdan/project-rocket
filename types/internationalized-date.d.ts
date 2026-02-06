declare module "@internationalized/date" {
  // Minimal unsafe shim to silence type errors in this dependency.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dateModule: any;
  export = dateModule;
}
