import HtmlWebpackPlugin from 'html-webpack-plugin'
import {fileURLToPath, resolve} from "node:url";
import {dirname} from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const config = {
    entry: './src/main.tsx',
    output: {
        path: resolve(dir, 'dist-webpack'),
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
        new HtmlWebpackPlugin({
            template: './build-config/index.webpack.html'
        }),
    ],
};
export default config;