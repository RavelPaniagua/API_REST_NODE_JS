//const http = require('http');// forma coomn js
//import http from 'http';//module js dos formas de llamar modulos en node js

const express = require('express');



let notas = [
    {
    "id":1,
    "nombre":"Ravel",
    "Apellido":"Paniagua",
    "nota":80,
    "materia":"API REST con nodejs "
},
{
    "id":2,
    "nombre":"Andres",
    "Apellido":"Guerrero",
    "nota":80,
    "materia":"API REST con nodejs "
},
{
    "id":3,
    "nombre":"Feliz",
    "Apellido":"Beltre",
    "nota":80,
    "materia":"API REST con nodejs "
}
]



/*const app = http.createServer((request, response)=>{
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.end(JSON.stringify(notas));
})*/

app = express();
app.use(express.json());

app.get('/',(request,response)=>{
    response.send('<h1>Express</h1>');
});

app.get('/api/notas',(request,response)=>{
    response.json(notas)
});
app.get('/api/notas/:id',(request,response)=>{
    const id = Number(request.params.id);
    const nota = notas.find(nota=>nota.id===id) 

    if(nota){
        response.json(nota)
    }else{
        response.status(404).end();
    }  
});

app.delete('/api/notas/:id',(request,response)=>{
    const id = Number(request.params.id);
    notas = notas.filter(nota=>nota.id !== id);
    response.status(204).end();
});

app.post('/api/notas',(request,response)=>{
    const nota = request.body;
    //conseguir todas las ids que tenemos en nuestra notas para buscar el id mas alto y sumarle uno
    const ids = notas.map(nota=>nota.id);
    const maxId = Math.max(...ids);// esta linea significa escojera el mayo de todos los ids (...ids) todos los id de la variable ids

    //luego creamos la nueva nota
    const newNota = {
        id:maxId+1,
        nombre:nota.nombre,
        Apellido:nota.apellido,
        nota:nota.nota,
        materia:nota.materia
    }
    // luego vamos añadir nuestra nueva nota a la lista de notas esta puede ser una forma
    notas = [...notas,newNota]
    response.json(notas);
});

const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
