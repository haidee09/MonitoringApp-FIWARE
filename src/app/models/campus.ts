export class Campus{
    idCampus: string;
    type:string;
    refOwner: string;
    name: string;
    address: string;
    category: string;
    location: any[];
    dateCreated: Date;
    dateModified: Date;
    status: any;

    constructor(
        idCampus: string,
        //type:string,
        refOwner: string,
        name: string,
        address: string,
        category: string,
        location: any[],
        dateCreated: Date,
        dateModified: Date,
        //status: any,
    ){}
}