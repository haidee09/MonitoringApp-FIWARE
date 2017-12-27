export class User{
    id:string;
    refCompany: string;
    phoneNumber: Array<String>;
    name: string;
    lastName: string;
    email:string;
    userName: string;
    aliasUser: string;
    password: string;
    dateCreated: Date;
    dateModified: Date;
    refUserContact: string;
    refDevices: Array<String>;
    refVehicles: Array<String>;
    status: any;
    role: any;

    constructor(
        id:string,
        refCompany: string,
        phoneNumber: Array<String>,
        name: string,
        lastName: string,
        email:string,
        userName: string,
        aliasUser: string,
        password: string,
        dateCreated: Date,
        dateModified: Date,
        refUserContact: string,
        refDevices: Array<String>,
        refVehicles: Array<String>,
        status: any,
        role: any
    ){
        
    }
}