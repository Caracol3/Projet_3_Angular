export class User {

  constructor(
    public id : number,
    public name : string,
    public firstname : string,
    public username : string,
    public email : string,
    public birthday : Date,
    public password : string,
    public avatar : string,
    public is_available : boolean,
    public role :{id:number, type:string},


  ){}

}
