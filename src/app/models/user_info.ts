export class User_info {


    constructor(
        
       public user : {
            id : number,
            name : string,
            firstname : string,
            pseudo : string,
            email : string,
            birthday : Date,
            password : string,
            avatar : string,
            is_available : boolean,
            role :{id:number, type:string},
        }



    ){}





    // constructor(
    //   public id : number,
    //   public name : string,
    //   public firstname : string,
    //   public pseudo : string,
    //   public email : string,
    //   public birthday : Date,
    //   public password : string,
    //   public avatar : string,
    //   public is_available : boolean,
    //   public role :{id:number, type:string},
  
  
    // ){}
  
  }
  