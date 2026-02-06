declare module "@internationalized/number" {
  // Minimal unsafe shim to silence type errors in this dependency.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberModule: any;
  export = numberModule;
}
