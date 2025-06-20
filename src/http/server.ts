import {PeopleController} from "../app/people/people-controller";
import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()
server.register(cors, {
    origin: true
})

// Middleware para configurar CSP
server.addHook('onSend', async (request, reply, payload) => {
    reply.header('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://ourchat-ii0z.onrender.com"); 
    return payload;
});

const peopleController = new PeopleController()

server.post("/people", (request,response)=>{
    return peopleController.insert(request,response)
})
server.get("/people", (request,response)=>{
    return peopleController.findAll(request,response)
})
server.get("/people/:id",(request:any,response)=>{
    return peopleController.findById(request,response)
})
server.post("/people/login",(request:any,response)=>{
    return peopleController.login(request,response)
})
server.delete("/people/:id",(request:any,response)=>{
    return peopleController.remove(request,response)
})
server.patch("/people/:id",(request:any,response)=>{
    return peopleController.update(request,response)
})
server.listen({
    host:"0.0.0.0",
    port: process.env.PORT ?? 3333,
}as any);