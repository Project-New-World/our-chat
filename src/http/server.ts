import {PeopleHandler} from "../app/people/people-handler";
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

const peopleHandler = new PeopleHandler()

server.post("/people", (request,response)=>{
    return peopleHandler.insert(request,response)
})
server.get("/people", (request,response)=>{
    return peopleHandler.findAll(request,response)
})
server.get("/people/:id",(request:any,response)=>{
    return peopleHandler.findById(request,response)
})
server.delete("/people/:id",(request:any,response)=>{
    return peopleHandler.remove(request,response)
})
server.patch("/people/:id",(request:any,response)=>{
    return peopleHandler.update(request,response)
})
server.listen({
    host:"0.0.0.0",
    port: process.env.PORT ?? 3333,
}as any);