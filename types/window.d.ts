import type { OutsetaSDK } from "./outseta";

declare global {
  interface Window {
    Outseta?: OutsetaSDK;
  }
}
