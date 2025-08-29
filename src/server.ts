import { createServer } from "node:http";
import "dotenv/config";
import { type EchoBody, type ErrorBody, EchoSchema,  issues_to_list} from "./types.js";

const port = Number(process.env.PORT ?? 3333);

const server = createServer((req, res) => {
    const pathname = (req.url ?? '/').split('?')[0];

    function errorMessage(statusCode:number, error:ErrorBody):void{
        res.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(error));
    }
    
    if (req.method === 'GET' && pathname === '/health'){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify({"status":"ok"}));
        return;
    } else if (pathname === '/echo'){
        if (req.method === 'POST'){
            const header = req.headers['content-type'] ?? "";
            if (!header.toLowerCase().includes("application/json")){
                errorMessage(415, {error:"unsupported_media_type"})
                return;
            }

            let body = '';
            req.setEncoding("utf8");
            
            req.on('data', (chunck) => {
                body += chunck;
            })
        
            req.on("error", () => {
                errorMessage(400, {error: "stream_error"})
                return;
            })

            req.on('end', () => {
                if (body === "") {
                    errorMessage(400, {error: "invalid_json"});
                    return;
                }
                try {
                    const payload:EchoBody = JSON.parse(body);
                    const result = EchoSchema.safeParse(payload);
                    if (!result.success){
                        const issues = issues_to_list(result.error);
                        errorMessage(400, {error:'validation_error', issues: issues})
                        return
                    }
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(payload);
                } catch {
                    errorMessage(400, {error:"invalid_json"});
                    return;
                }
            })
            return;
        }else{
            res.writeHead(405, {
                "Content-Type": "application/json; charset=utf-8",
                "Allow":"POST"
            });
            res.end(JSON.stringify({error:"method_not_allowed"}));
            return;
        }
    } else {
        return errorMessage(404, {error: "not_found"});
    }
});

server.listen(port, () => {
    console.log(`Rodando ${port}`);
})