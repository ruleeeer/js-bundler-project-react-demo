import {fileURLToPath, resolve} from "node:url";
import {dirname} from 'node:path'
import rspack from "@rspack/core";

const dir = dirname(fileURLToPath(import.meta.url));
const config = {
    entry: './src/main.tsx',
    output: {
        path: resolve(dir, 'dist-rspack'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {runtime: "automatic"}],
                            '@babel/preset-typescript'
                        ],
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