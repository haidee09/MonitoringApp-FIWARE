export class User{
    idUser:string;
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

    constructor(
        idUser:string,
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
        status: any
    ){
        
    }
}