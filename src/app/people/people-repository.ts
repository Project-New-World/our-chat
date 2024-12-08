//Lidar com o banco de dados, enviar dados e ações ao banco de dados;

import { CrudRepository } from "../../core/crud-repository"
import { Person } from "../../data/people-interface"
import { sql } from "../../db/connection"

export class PeopleRepository extends CrudRepository<Person>{
    constructor(){
        super ("people",["name","email","birth_date","password"])
    }
    async login(email:string,password:string){
        return await sql`SELECT * FROM ${sql(this.table)} WHERE email = ${email} AND password = ${password}`
    }
}