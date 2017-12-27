export class Alerts{
    
    id: string;
    type: string;
    category: string;
    subCategory: string;
    location: string;
    address: string;
    dateObserved: Date;
    validFrom: Date;
    validTo: Date;
    description: string;
    alertSource: string;
    data: string;
    severity: string;

    constructor( 
        id: string,
        type: string,
        category: string, //
        subCategory: string, //
        location: string, //
        address: string,
        dateObserved: Date,
        validFrom: Date,
        validTo: Date,
        description: string,
        alertSource: string, //
        data: string,
        severity: string //
        /*status: any*/)
    {
        /*this.idAdministrator = idAdministrator
        this.refCompany = refCompany
        this.name = name
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.status = status;*/
        /*
        this.idAdministrator = '';
        this.refCompany = '';
        this.name = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.dateCreated = null
        this.dateModified = null
        //this.status = '';*/
    }
  
}