import { createServer } from "node:http";
import "dotenv/config";
import { EchoSchema, issues_to_list } from "./types.js";
const port = Number(process.env.PORT ?? 3333);
const server = createServer((req, res) => {
    const pathname = (req.url ?? '/').split('?')[0];
    function errorMessage(statusCode, error) {
        if (res.writableEnded)
            return;
        if (!res.headersSent)
            res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(error));
    }
    function ok(payload, status = 200) {
        if (res.writableEnded)
            return;
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(payload));
    }
    if (req.method === 'GET' && pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ "status": "ok" }));
        return;
    }
    else if (pathname === '/echo') {
        if (req.method === 'POST') {
            const header = req.headers['content-type'] ?? "";
            if (!header.toLowerCase().includes("application/json")) {
                errorMessage(415, { error: "unsupported_media_type" });
                return;
            }
            let body = '';
            req.setEncoding("utf8");
            req.on('data', (chunck) => {
                body += chunck;
            });
            req.on("error", () => {
                errorMessage(400, { error: "stream_error" });
                return;
            });
            req.on('end', () => {
                if (body === "") {
                    errorMessage(400, { error: "invalid_json" });
                    return;
                }
                try {
                    const payload = JSON.parse(body);
                    const result = EchoSchema.safeParse(payload);
                    if (!result.success) {
                        const issues = issues_to_list(result.error);
                        errorMessage(400, { error: 'validation_error', issues: issues });
                        return;
                    }
                    ok(payload, 200);
                    return;
                }
                catch {
                    errorMessage(400, { error: "invalid_json" });
                    return;
                }
            });
            return;
        }
        else {
            res.writeHead(405, {
                "Content-Type": "application/json; charset=utf-8",
                "Allow": "POST"
            });
            res.end(JSON.stringify({ error: "method_not_allowed" }));
            return;
        }
    }
    else {
        errorMessage(404, { error: "not_found" });
        return;
    }
});
server.listen(port, () => {
    console.log(`Rodando ${port}`);
});
