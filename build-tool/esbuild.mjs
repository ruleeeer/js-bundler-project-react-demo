import esbuild from "esbuild";
import http from "http";
import path from "path";
import url from "url";
import fs from "fs";

const dirname = path.dirname(url.fileURLToPath(import.meta.url))
const args = process.argv.slice(2);
const watch = args.includes("--watch");
console.log(dirname)


const context = await esbuild.context({
    entryPoints: [path.resolve(dirname, "../src/main.tsx")],
    bundle: true,
    outfile: "esbuild-serve/main.js",
    sourcemap: true,
    banner: {
        js: "(() => { (new EventSource(\"/esbuild\")).addEventListener('change', () => location.reload()); })();",
    },
});

const serveDir = path.resolve(dirname, "../esbuild-serve");

if (!fs.existsSync(serveDir)) {
    fs.mkdirSync(serveDir)
}

fs.cpSync(path.resolve(dirname, "../build-config/index.esbuild.html"), path.resolve(serveDir, "index.html"));

if (watch) {
    await context.watch();
    let start = Date.now();
    const {host, port} = await context.serve({
        host: "localhost",
        port: 1235,
        servedir: "esbuild-serve",
    });
    let end = Date.now();
    const server = http.createServer((req, res) => {
        const {method, headers} = req;
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname === "/" ? "/index.html" : url.pathname;
        const proxyReq = http.request(
            {hostname: host, port: port, path, method, headers},
            function handler(proxyRes) {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, {end: true});
            }
        );
        req.pipe(proxyReq, {end: true});
    });
    server.listen(12345, () => {
        console.log(`esbuild serve cost ${end - start}ms: http://localhost:12345/`);
    });
} else {
    await context.rebuild();
    context.dispose();
}
