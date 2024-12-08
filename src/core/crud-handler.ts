//Lidar com os dados da requisição; define status(ex:201,2004); lida com os dados externos da aplicação; 

import { CrudRepository } from "./crud-repository"
import { CrudService } from "./crud-services"
import { NotFoundError , BadRequestError} from "./errors"

export class CrudHandler<T,R extends CrudRepository<T>,S extends CrudService<T,R>>{
    service:S
    constructor(service:S){
        this.service = service
    }
    async insert(request:any,response:any){
        const { body } = request
        const data = await this.service.insert(body)
        
        return response.status(201).send(data) 
    }
    async findById(request:any,response:any){
        const id:number = request.params.id
        if (!id){
            throw new BadRequestError(id)
        }
        const data = await this.service.findById(id)
        return response.status(200).send(data)
    }
    async findAll(request:any,response:any){
        const data = await this.service.findAll()

        return response.status(200).send(data)
    }
    async update(request:any,response:any){
        const { body } = request
        if (!body || Object.keys(body).length == 0){
            throw new NotFoundError("No body")
        } 
        const id:number = request.params.id
        const update = await this.service.update(body, id)

        return response.status(200).send(update)
    }
    async remove(request:any,response:any){
        const id:number = request.params.id
        this.service.remove(id)

        return await response.status(200).send("Dado Deletado")
    }
}   