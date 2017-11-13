export class CommonData{
    
    idUser : string
    name: string;
    lastName: string;
    email: string;

    constructor(id: string, firstName: string, lastName:string, email: string){
        this.idUser = id;
        this.name = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}