// @ts-check

import js from "@eslint/js";
import * as importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks/cjs/eslint-plugin-react-hooks.development.js";
import * as reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: "readonly",
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // Import rules
      "import/no-unresolved": "error",
      "import/named": "off",
      "import/default": "warn",
      "import/export": "error",
      "import/no-duplicates": "warn",

      // React Refresh - modified to be less strict for component files
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],

      // TypeScript
      "@typescript-eslint/no-unused-vars": "off",

      // Tailwind-friendly rules
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "class",
            "css",
            "tw",
            "args",
            "position",
            "intensity",
            "rotation",
            "vertexShader",
            "fragmentShader",
            "uniforms",
            "side",
            "cmdk-input-wrapper",
          ],
        },
      ],

      // Turn off rules that are too strict
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/require-await": "warn",

      // React specific
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-key": ["warn", { checkFragmentShorthand: true }],
      "react/no-unescaped-entities": "off",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
);
