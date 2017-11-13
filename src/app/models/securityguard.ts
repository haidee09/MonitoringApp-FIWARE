export class SecurityGuard{
    idUser:string;
    refCompany: string;
    refCampus: string;
    refZone: string;
    phoneNumber: Array<String>;
    name: string;
    lastName: string;
    email:string;
    password: string;
    refDevices: Array<String>;
    dateCreated: Date;
    dateModified: Date;
    status: any;
    role: any;

    constructor(
        idUser:string,
        //refCompany: string,
        //phoneNumber: Array<String>,
        name: string,
        lastName: string,
        email:string,
        //password: string,
        //refDevices: Array<String>,
        dateCreated: Date,
        dateModified: Date,
        //status: any,
        //role: any
    ){
        
    }
}