
interface Pokemon {
    id: number;
    name: string;
    type: string;
}
const pokemon = {
    id: 1,
    name: "Pikachu",
    type: "fire"
} as Pokemon;
const party: Pokemon[] = [
    pokemon
    // Add one Pokemon object here with ID 1.
];import http, { IncomingMessage, ServerResponse } from 'http'; // The core Node module we're using to build our server.
const hostname = '127.0.0.1'; // or 'localhost'
const port = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // Request handling will come later!
    if(req.method === 'GET' && req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({message: 'Hello from the Pokemon Server!' }, null, 2))
    }
    else if(req.method === 'PUT' && req.url?.startsWith('/pokemon/')){
        const urlParts = req.url.split('/');
        const pokemonId = parseInt(urlParts[2]);
        const foundPokemon = party.find(pokemon => pokemon.id === pokemonId);
        if (foundPokemon){
        let body = ''; // To store incoming data
        req.on('data', (chunk) => {
        body += chunk.toString();
        });
        
        req.on('end', () => {
        const newPokemon = JSON.parse(body); //{} "{}"
        // do if statements for name and type
        res.statusCode = 201; // 'Created'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Pokemon updated!', payload: newPokemon }, null, 2));
        })
        }
        else{
            res.statusCode = 201; // 'Created'
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Pokemon not found.'}));
        }
    
    }
    else if (req.method === 'POST' && req.url === '/pokemon') {
        let body = ''; // To store incoming data
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const newPokemon = JSON.parse(body);
    
            // Add basic data logic (you'd likely use a database in a real application)
            newPokemon.id = party.length + 1; // Simple ID assignment
            party.push(newPokemon);
    
            res.statusCode = 201; // 'Created'
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Pokemon created!', payload: newPokemon }, null, 2));
        });
    }
    else if(req.method === 'GET' && req.url?.startsWith('/pokemon/')){
        const urlParts = req.url.split('/');
        const pokemonId = parseInt(urlParts[2]);

        const foundPokemon = party.find(pokemon => pokemon.id === pokemonId);
        if (foundPokemon){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({message: 'Pokemon found', payload: foundPokemon},null, 2));
        }
}
    else if (req.method === 'GET' && req.url === '/pokemon') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'All Pokemon', payload: party }, null, 2));
    }
   });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});