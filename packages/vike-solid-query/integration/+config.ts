import type { Config } from "vike/types";
import type { QueryClientConfig } from "@tanstack/solid-query";
import "vike-solid/config"; // Needed for declaration merging of Config

export default {
  name: "vike-solid-query",
  require: {
    "vike-solid": ">=0.7.3",
  },
  Wrapper: "import:vike-solid-query/__internal/integration/Wrapper:default",
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  },
  meta: {
    queryClientConfig: {
      env: {
        server: true,
        client: true,
      },
    },
  },
} satisfies Config;

declare global {
  namespace Vike {
    interface Config {
      queryClientConfig?: QueryClientConfig;
    }
  }
}
