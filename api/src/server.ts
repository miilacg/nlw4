import express from 'express'; //o express ajuda a criar um servidor
const app = express();

/*
    GET => busca
    POST => salvar
    PUT => alterar
    DELETE => deletar
    PATCH => altaração especifica
*/

//http://localhost:3333/users
//pode ter o mesmo nome de rota desde que sejam metodos diferentes
//parametro 1 => rota (recurso API = 'users')
//parametro 2 => requist, response

app.get("/", (request, response) => { //request -> tudo que a gente recebe, reponse -> tudo que eu to enviando
    return response.json({ message: "Hello Worls - NLW#4" });
}); 

app.post("/", (request, response) => { //quando ta trabalhando com post, normalmente recebe uma informação
    // recebeu os dados para salvar
    return response.json({ message: "Os dados foram salvos com sucesso!" });
}); 

/*porta*/
app.listen(3333, () => console.log('Server is running!'));