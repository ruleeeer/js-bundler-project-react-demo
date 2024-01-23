import HtmlWebpackPlugin from 'html-webpack-plugin'
import {fileURLToPath, resolve} from "node:url";
import {dirname} from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const config = {
    entry: './src/main.tsx',
    output: {
        path: resolve(dir, 'dist-webpack-swc'),
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
            template: './build-config/index.webpack.html'
        }),
    ],
};

export default config;