import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const compat = new FlatCompat({
  baseDirectory: _dirname,
});

export default compat.config({
  extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  rules: {
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
});
