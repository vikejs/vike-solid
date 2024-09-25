import type { QueryClientConfig } from "@tanstack/solid-query";

declare global {
  namespace Vike {
    interface Config {
      queryClientConfig?: QueryClientConfig;
    }
  }
}
