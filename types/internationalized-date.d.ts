declare module "@internationalized/date" {
  // Minimal unsafe shim to silence type errors in this dependency.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // biome-ignore lint/suspicious/noExplicitAny: Intentional type shim for missing type definitions
  const dateModule: any;
  export = dateModule;
}
