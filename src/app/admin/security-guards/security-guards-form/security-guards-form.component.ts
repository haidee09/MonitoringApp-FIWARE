import { Component, OnInit } from '@angular/core';
import { Campus } from '../../../models/campus';
import { Zone } from '../../../models/zone';
import { SecurityGuard } from '../../../models/securityguard';
import { SecurityguardService } from '../../../services/securityguard.service';
import { CampusService } from '../../../services/campus.service';
import { ZoneService } from '../../../services/zone.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security-guards-form',
  templateUrl: './security-guards-form.component.html',
  styleUrls: ['./security-guards-form.component.css'],
  host: {'class':'col-xl-10'}
})
export class SecurityGuardsFormComponent implements OnInit {

  collectionSG: SecurityGuard[];
  sg: SecurityGuard;
  selectedCampus: string = null;
  selectedZone: string = null;
  listZones: Zone[];
  listZonesCampusSelected: Zone[] = [];
  listCampus: Campus[];
  //campusSelected: string;
  message: string;
  checkinhour: string;
  checkinminute: string;
  departurehour: string;
  departureminute: string;

  constructor(
    private sgService: SecurityguardService,
    private campusService: CampusService,
    private zoneService:ZoneService, 
    private toastr: ToastrService
  )
  {
    this.sg = new SecurityGuard('','','','','','',new Date, new Date());
  }
  ngOnInit(){
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus);
      },
      (error) => {
        console.log(error);        
      }
    )
  }
  onChangeValueCampus(newValue: string){
    //console.log("NUevo valor "+newValue);
    console.log("Valor de la variable this.selectedCampus "+this.selectedCampus)

    this.listZonesCampusSelected = [];
    return this.zoneService.listZones().subscribe(
      (res) => {
        this.listZones = res;
        console.log(this.listZones);
        this.analizeZones(this.listZones);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  analizeZones(zones: Zone[]){
    console.log(zones);
    console.log("Valor de la variable this.selectedCampus en el método analizeZones() "+this.selectedCampus);
    for(let i=0; i<zones.length;i++){
      if(zones[i]['refCampus'] === this.selectedCampus){
        console.log(zones[i]['refCampus']);
        this.listZonesCampusSelected.push(zones[i]);
      }
    }
    if(this.listZonesCampusSelected===null){
      this.message = "Not exist zones registered of this campus yet";
      console.log("No existen zonas registradas de este campus");
    }
  }
  clearInputs(){
    this.sg.id = '';
    this.sg.name = '';
    this.sg.lastName = '';
    this.checkinhour = '';
    this.checkinminute = '';
    this.departurehour = '';
    this.departureminute = '';
    this.sg.email = '';
    this.sg.checkInTime = '';
    this.sg.departureTime = '';
    this.selectedCampus = null;
    this.selectedZone = null;
  }
  registerSG(){
    this.sg.refCampus = this.selectedCampus;
    this.sg.refZone = this.selectedZone;
    this.sg.checkInTime = this.checkinhour+":"+this.checkinminute;
    this.sg.departureTime = this.departurehour+":"+this.departureminute;
    this.sgService.createSecurityGuard(this.sg).subscribe(
      (res) => {
        console.log(res);
        this.clearInputs();
        this.toastr.success('','Security Guard successfully registered', { positionClass: 'toast-bottom-full-width' });
        console.log("Guardia de seguridad registrado con exito");
      },
      (error) =>{
        console.log("Hubo un error al guardar los datos del guardia de seguridad");
        this.toastr.error('', 'An error has occurred to save the security guard data', { positionClass: 'toast-bottom-full-width' });
      }
    )
  }
}
