import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import perfectionist from "eslint-plugin-perfectionist";
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    languageOptions: { globals: globals.browser },
    plugins: {
      perfectionist,
    },
    rules: {
      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // ES6+ rules
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      quotes: ["error", "double"],
      "no-trailing-spaces": "error",

      // Perfectionist rules for sorting
      "perfectionist/sort-jsx-props": "error",
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-modules": "error",

      // Code style rules
      camelcase: ["error", { properties: "never" }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-in-parens": ["error", "never"],
      semi: ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-const-assign": "error",
      "no-duplicate-imports": "error",
      "function-paren-newline": ["error", "consistent"],
      "generator-star-spacing": ["error", { before: false, after: true }],
      "implicit-arrow-linebreak": ["error", "beside"],
      "spaced-comment": [
        "error",
        "always",
        { exceptions: ["-", "+"], markers: ["/"] },
      ],

      // Additional rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "multi-line"],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends(
    "plugin:react/jsx-runtime",
    "plugin:@next/next/recommended"
  ),
];
