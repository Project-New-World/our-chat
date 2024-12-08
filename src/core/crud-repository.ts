//Lidar com o banco de dados, enviar dados e ações ao banco de dados;

import { sql } from "../db/connection"

export class CrudRepository<T>{
    table:string
    columns:Array<string>
    constructor(table:string,columns:Array<string>){
        this.table = table
        this.columns = columns
    }
    async insert(body:any):Promise<any>{
        const data = await sql`insert into ${sql(this.table)} ${sql(body,this.columns)}`
        
        return data
    }
    async findById(id:number){
        const data = await sql`SELECT * FROM ${sql(this.table)} WHERE id = ${id}`

        return data
    }
    async findAll():Promise<any>{
        return await sql`select * from ${sql(this.table)}`
    }
    async update(body:any,id:number){
        const personUpdate = await sql `UPDATE ${sql(this.table)} SET ${sql(this.fromDTO(body),this.toDTO(body))} WHERE id = ${id} RETURNING *`

        return personUpdate
    }
    async remove(id:number){
        return await sql`DELETE FROM ${sql(this.table)} WHERE id = ${id}`
    }    
    toCamelCase(string:string){        
        return string.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    }
    toSnakeCase(string:string){
        return string.replace(/([A-Z])/g,"_$1").toLowerCase() 
    }
    toDTO(body:Partial<T>):Array<string>{
        // Quando retornamos o objeto para o front
        const data = Object.entries(body)
        .map(([key])=>key)
        const a = data.map(key => this.toSnakeCase(key))
        console.log(a)
        return a
    }
    fromDTO(object:Object){
        // Quando recebemos o objeto do front
        const newObject:any = {}
        Object.entries(object)
        .map(([key,value]) => {
            const newKey = this.toSnakeCase(key)
            newObject[newKey] = value
        })
        console.log(newObject)
        return newObject
    }
}