export class SecurityGuard{
    id:string;
    refCompany: string;
    refCampus: string;
    refZone: string;
    phoneNumber: Array<String>;
    name: string;
    lastName: string;
    email:string;
    password: string;
    refDevices: Array<String>;
    checkInTime: string;
    departureTime: string;
    dateCreated: Date;
    dateModified: Date;
    status: any;
    role: any;

    constructor(
        id:string,
        //refCompany: string,
        //phoneNumber: Array<String>,
        name: string,
        lastName: string,
        email:string,
        checkInTime: string,
        departureTime: string,
        //password: string,
        //refDevices: Array<String>,
        dateCreated: Date,
        dateModified: Date,
        //status: any,
        //role: any
    ){
        
    }
}