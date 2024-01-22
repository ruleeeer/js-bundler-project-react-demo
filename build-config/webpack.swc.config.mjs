import * as path from "path.js";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {fileURLToPath} from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const config = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(dirname, 'dist-webpack-swc'),
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
        new HtmlWebpackPlugin({
            template: './index.webpack.html'
        }),
    ],
};

export default config;