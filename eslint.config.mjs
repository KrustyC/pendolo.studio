import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const config = [
  {
    ignores: ["./node_modules/**", ".next/**", "dist/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        // Explicit version avoids eslint-plugin-react calling context.getFilename()
        // during "detect", which breaks on ESLint 10.
        version: "19.2",
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    files: ["src/types/generated/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    // R3F extends JSX.IntrinsicElements with Three.js elements (meshStandardMaterial, group, etc.)
    // whose props are already type-checked by TypeScript — the React ESLint plugin doesn't understand them
    files: [
      "src/app/_components/HeroPendulum3D/**/*.{tsx,jsx}",
    ],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;