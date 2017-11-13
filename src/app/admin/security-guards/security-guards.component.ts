import { Component, OnInit } from '@angular/core';
import { Campus } from '../../models/campus';
import { Zone } from '../../models/zone';
import { SecurityGuard } from '../../models/securityguard';
import { SecurityguardService } from '../../services/securityguard.service';
import { CampusService } from '../../services/campus.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-security-guards',
  templateUrl: './security-guards.component.html',
  styleUrls: ['./security-guards.component.css'],
  host:{'class':'col-xl-10'}
})
export class SecurityGuardsComponent{

  collectionSG: SecurityGuard[];
  sg: SecurityGuard;
  selectedCampus: string = null;
  selectedZone: string = null;
  listZones: Zone[];
  listZonesCampusSelected: Zone[] = [];
  listCampus: Campus[];
  //campusSelected: string;
  message: string;

  constructor(private sgService: SecurityguardService, private campusService: CampusService, private zoneService:ZoneService){
    this.sg = new SecurityGuard('','','','',new Date, new Date());
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
    /*this.zoneService.listZones().subscribe(
      (res) => {
        this.listZone = res;
      },
      (error) => {
        console.log(error);
      }
    )*/
  }
  onChangeValueCampus(newValue: string){
    //console.log("NUevo valor "+newValue);
    console.log("Valor de la variable this.selectedCampus "+this.selectedCampus)
    //this.selectedCampus = newValue;
    //let t = this
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
    //console.log(this.listZones)
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
  registerSG(){
    this.sg.refCampus = this.selectedCampus;
    this.sgService.createSecurityGuard(this.sg).subscribe(
      (res) => {

      },
      (error) =>{

      }
    )
  }
}
