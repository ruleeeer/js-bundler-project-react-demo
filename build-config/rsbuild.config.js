import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {fileURLToPath, resolve} from "node:url";
import {dirname} from "node:path";

let dir = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    server: {
        port: 1238
    },
    source: {
        entry: {
            index: resolve(dir, "src/main.tsx")
        }
    },
    output: {
        distPath: {
            root: 'dist-rsbuild'
        },
    },
    plugins: [pluginReact()],
});