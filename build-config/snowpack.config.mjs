export default {
    mode: 'production',
    mount: {
        'snowpack-public':'/',
        '../src':'/src'
    },
    plugins: [
        '@snowpack/plugin-react-refresh'
    ],
    devOptions: {
        port: 1236,
        hmr: true
    },
    buildOptions: {
        out: '../dist-snowpack',
        sourcemap: false
    },
};