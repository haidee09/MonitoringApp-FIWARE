export class CommonData{
    
    id : string
    name: string;
    lastName: string;
    email: string;
    password: string;

    constructor(id: string, firstName: string, lastName:string, email: string, password:string){
        this.id = id;
        this.name = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}