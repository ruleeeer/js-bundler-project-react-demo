import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import server from 'rollup-plugin-server'
import {fileURLToPath, resolve} from "node:url";
import {dirname} from "node:path";
import {copyFileSync} from "node:fs";


let env = process.env.NODE_ENV;
const isProdMode = env === 'production';
const serverConfig = [];
if (!isProdMode) {
    serverConfig.push(server({
        open: true,
        contentBase: 'dist-rollup',
        port: 8080
    }));
//     copy index.html to dist
    const path = fileURLToPath(import.meta.url);
    const srcPath = resolve(path, "index.rollup.html");
    const distPath = resolve(dirname(path), 'dist-rollup/index.html');
    copyFileSync(srcPath, distPath)
}
export default {
    input: 'src/main.tsx',
    output: {
        file: 'dist-rollup/main.js',
        format: 'esm'
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        commonjs(),
        typescript({check: false}),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
            extensions: ['.js', '.jsx', '.ts', 'tsx']
        }),
        replace({
            preventAssignment: false,
            'process.env.NODE_ENV': `'${env}'`
        }),
        postcss({include: /(?<!&module=.*)\.css$/}),
        ...serverConfig
    ]
}