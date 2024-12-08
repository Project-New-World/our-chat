//Lidar com os dados da requisição; define status(ex:201,2004); lida com os dados externos da aplicação; 

import { CrudHandler } from "../../core/crud-handler";
import { Person } from "../../data/people-interface";
import { PeopleRepository } from "./people-repository";
import { PeopleService } from "./people-service";

export class PeopleHandler extends CrudHandler<Person,PeopleRepository,PeopleService>{
    constructor(){
        super (new PeopleService())
    }
    async login (request:any,response:any){
        const { body } = request
        const data = await this.service.login(body)

        return response.status(202).send(data)
    }
}