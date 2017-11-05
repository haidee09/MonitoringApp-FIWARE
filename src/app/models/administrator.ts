export class Admin{
    
    idAdministrator: string;
    refCompany: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateCreated: Date;
    dateModified: Date;
    status: any;

    constructor( 
        idAdministrator: string,
        refCompany: string,
        name: string,
        lastName: string,
        email: string,
        password: string,
        dateCreated: Date,
        dateModified: Date,
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