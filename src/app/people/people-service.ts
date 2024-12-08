//Lidar com as regras de negócio, validações necessárias, como maioridade.

import { CrudService } from "../../core/crud-services";
import { UnauthorizedError } from "../../core/errors";
import { Person, PersonLoginBodyDTO } from "../../data";
import { PeopleRepository } from "./people-repository";

export class PeopleService extends CrudService<Person,PeopleRepository>{
    constructor(){
        super (new PeopleRepository())
    }
    async login(body:PersonLoginBodyDTO){
        const { email,password } = body
        const data = await this.repository.login(email,password)
        if(!data.length){
            throw new UnauthorizedError("Usuário ou senha inválidos")
        }
        return data
    }
}