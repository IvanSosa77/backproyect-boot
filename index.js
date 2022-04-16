const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let notes = [
    {
        id:1,
        name:"7up"
    },
    {
        id:2,
        name:"pepsi"
    },
    {
        id:3,
        name:"coca-cola"
    },
    {
        id:4,
        name:"sprite"
    }
]

app.get('/api/notes',(request,response)=>{
    response.json(notes);
})

app.get('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id);
    const buscar = notes.find(note => note.id === id);
    if(buscar !== undefined){
        response.json(buscar).status(200)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end()
})

app.post('/api/notes',(request,response)=>{
    console.log(request.body)
    let body = request.body;

    if(!body || !body.name){
        return response.status(400).json({
            error:"error name is required"
        })
    }

    const newNote = {
        id:notes.length + 1,
        name:body.name
    }

    notes = [...notes,newNote];
    response.json(newNote).status(201);

})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server is run on port ${PORT}`)
})