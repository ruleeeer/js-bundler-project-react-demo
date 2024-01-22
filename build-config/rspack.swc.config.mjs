import {fileURLToPath, resolve} from "node:url";
import rspack from "@rspack/core";
import {dirname} from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const config = {
    entry: './src/main.tsx',
    output: {
        path: resolve(dir, 'dist-rspack-swc'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'swc-loader', // Switched to swc-loader
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                dynamicImport: true,
                                decoratorsTs: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        }
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new rspack.HtmlRspackPlugin({template: './index.webpack.html'}),
    ],
    watchOptions: {
        poll: 0,
        aggregateTimeout: 0
    },
    stats: {
        timings: true,
        all: false
    }
};

export default config;