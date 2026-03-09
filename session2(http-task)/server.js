const http = require("http");
const fs = require("fs")
const path = require("path")

const DB_FILE = path.join(__dirname, "db.json")
const PORT = 3000;


if (!fs.existsSync(DB_FILE)){
    fs.writeFileSync(DB_FILE, JSON.stringify({items: []}, null, 2));
}
// DB
function readDB(){
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data){
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function generateId(){
    return Math.random().toString(36).slice(2, 7);
}

// Req helper
function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {})
            } catch{
                reject(new Error("Invalid JSON"))
            }
        });
        req.on("error", reject)
    });
}

function send(res, statusCode, data){
    res.writeHead(statusCode, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data, null, 2))
}

// route
function getAll(res){
    const{items} = readDB()
    send(res, 200, {
        success: true, 
        count: items.length, 
        data:items
    })
}

function getItemById(res, id){
    const {items} = readDB()
    const item = items.find((i) => i.id === id)
    if (!item) return send(res, 404, {success: false, message:"Item not Found"});
    send(res, 200, {success:true, data: item});  
}

async function createItem(req, res){
    const body = await parseBody(req)
    const {name, description} = body;

    if (!name || typeof name !== "string" || !name.trim()){
        return send(res, 400, {success: false, message: "'name' field is required"})
    }

    const db = readDB();
    const newItem = {
        id:generateId(),
        name: name.trim(),
        description: description ? String(description).trim() : "",
        createdAt: new Date().toISOString()
    }

    db.items.push(newItem);
    writeDB(db)
    send(res, 201, {success: true, data: newItem})
}

async function updateItem(req, res, id){
    const body = await parseBody(req);
    const {name, description} = body;

    if (!name || typeof name !== "string" || !name.trim()){
        return send(res, 400, {success: false, message: "'name' field is required"})
    }

    const db = readDB();
    const index = db.items.findIndex((i) => i.id === id);
    if (index === -1) return send(res, 404, {success: false, message: "Item not found"});

    db.items[index] = {
        ...db.items[index],
        name: name.trim(),
        description: description ? String(description).trim(): "",
        
    };

    writeDB(db);
    send(res, 200, {success: true, data: db.items[index]});
}

function deleteItem(res, id){
    const db = readDB();
    const index = db.items.findIndex((i) => i.id === id)
    if(index === -1) return send(res, 404, {success: false, message: "Item not found"});
    const [deleted] = db.items.splice(index, 1);
    writeDB(db);
    send(res, 200, {success: true, message: "Item Deleted", data: deleted});

}


const ITEM_RE = /^\/items\/([^/]+)\/?$/;
const LIST_RE = /^\/items\/?$/;

const server = http.createServer(async(req, res) => {
    const {method, url} = req;

    try{
        if(LIST_RE.test(url)){
            if (method === "GET") return getAll(res);
            if (method === "POST") return await createItem(req, res);
        }

        const match = url.match(ITEM_RE)
        if (match){
            const id = match[1];
            if (method === "GET") return getItemById(res,id);
            if (method === "PUT") return await updateItem(req, res, id);
            if (method === "DELETE") return deleteItem(res, id)
        }

        send (res, 404, {success: false, message: "Route Not Found"})
    } catch(err){
        const msg = err.message === "Invalid JSON" ? "Invalid JSON Body": "Internal server error";
        send(res, err.message === "Invalid JSON" ? 400 : 500, {success: false, message: msg})
    }
});

server.listen(PORT, () => {
    console.log(`\n Server running at https://localhost:${PORT}`);
    console.log("Endpoints");
    console.log("GET /items");
    console.log("GET /items/:id");
    console.log("POST /items");
    console.log("PUT /items/:id");
    console.log("DELETE /items/:id");
});
