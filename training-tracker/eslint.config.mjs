import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // TODO(tasks.md §3): pages fetch Firestore data in effects via async
    // callbacks. Revisit when the data-fetching bugs are fixed.
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  {
    // CommonJS config files
    files: ["*.config.js", "jest.setup.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
