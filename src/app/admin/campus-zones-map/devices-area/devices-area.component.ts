import {   Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Campus } from '../../../models/campus';
import { Zone } from '../../../models/zone';
import { CampusService } from '../../../services/campus.service';
import { ZoneService } from '../../../services/zone.service';

@Component({
  selector: 'app-devices-area',
  templateUrl: './devices-area.component.html',
  styleUrls: ['./devices-area.component.css'],
  host:{'class':'col-xl-10'}
})
export class DevicesAreaComponent{

  listCampus: any;
  listZones: any[] = [];
  latitude: any;
  longitude: any;
  layers:any[] = [];
  locationDevices: any[]=[];
  coordinatesAreaMap: any;
  campusInformation : Object[] =[];
  zonesInformation: Object[] = [];
  zoneInformation: Zone;
  query: string;
  showMapDevices: boolean = false;
  selectedOption: string = null;
  campusQuery: string = null;
  campusQueryZone: string = null;
  zoneQuery: string = null;
  //Maps
  map: L.Map;
  options: L.MapOptions;
  optionsInit: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;

  constructor(private campusService: CampusService, private zoneService: ZoneService) { 
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
  }	
  onChangeValueCampus(newValue: string){
    this.zoneService.listZonesofCampus(this.campusQueryZone).subscribe(
      (res) => {
        console.log(res);
        return this.listZones = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  queryContext(){ 
    if(this.selectedOption==='campus'){
      if(this.campusQuery){
        return this.campusService.queryContextDevices(this.campusQuery).subscribe(
          (res) => {
            this.campusInformation = res;            
            console.log(this.campusInformation)
            return this.showMapDevicesinCampus(this.campusInformation,this.campusQuery);
          },
          (error) => {
            console.log(error);
          }
        )
      }
      else{
        console.log("Select an option");
      }
    }
    else if(this.selectedOption==='zone'){
      console.log("Entra")
      this.resetVariables();
      console.log(this.campusQueryZone);
      if(this.campusQueryZone){
        this.campusService.readCampus(this.campusQueryZone).subscribe(
          (res) => {
            this.coordinatesAreaMap = res['location'];
            console.log(this.coordinatesAreaMap)
            this.layers.push(L.polygon(this.coordinatesAreaMap, { color: '#04B431'}));
            let coordinates = res['pointMap'];
            console.log(coordinates[0]);
            let latitude = coordinates[0]['latitude'];
            let longitude = coordinates[0]['longitude'];
            //LEAFLET OPTIONS OF THE MAP
            this.options = {
              layers: [
                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
                this.drawnItems = new L.FeatureGroup()
              ],
              zoom: 18,
              center: L.latLng({ lat: latitude, lng: longitude })
            }; 
            return this.showMapDevices = true;    
          },
          (error) => {
            console.log(error);
          }
        ) 
        this.zoneService.readZone(this.zoneQuery).subscribe(
          (res) => {
            this.zoneInformation = res;
            console.log(this.zoneInformation)
            let coordinatesZoneMap = res['location'];
            this.layers.push(L.polygon(coordinatesZoneMap, { color: '#58ACFA'}));
          },
          (error) => {
            console.log(error);
          }
        )       
        this.zoneService.queryContextDevices(this.zoneQuery).subscribe(
          (res) => {
            this.zonesInformation = res;
            console.log(this.zonesInformation)   
            /*for(let i=0; i<this.zonesInformation.length;i++){
              var coords = this.zonesInformation[i]['location']
              console.log(coords);
              var array = JSON.parse("[" + coords + "]");
              this.locationDevices.push(array);
            }*/
            //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
            for(let i=0; i<this.zonesInformation.length;i++){
              this.layers.push(L.marker(JSON.parse("["+this.zonesInformation[i]['location']+"]"), {
                icon: L.icon({
                iconAnchor: [12, 41], //center de icon image url
                popupAnchor: [0, -41], //center de icon image url
                iconUrl: './assets/css/images/marker-icon.png',
                shadowUrl: './assets/css/images/marker-shadow.png'
                })
              })
              .bindPopup('id: '+this.zonesInformation[i]['id']+ '<br>'+ 'owner: '+this.zonesInformation[i]['owner'])
              );
            }       
          },
          (error) => {
            console.log(error);
          }
        )
      }
      else{
        console.log("Select an option of campus");
      }
    }
    else{
      console.log("Select an option before consult");
    }
  }
  resetVariables(){
    //RESET THE VARIABLES 
    this.showMapDevices = false;
    this.locationDevices = [];
    this.coordinatesAreaMap = [];
    this.layers = [];
    this.latitude = null;
    this.longitude = null;
    return;
  }
  showMapDevicesinCampus(campusInformation: Object[], idArea:string){    
    this.resetVariables();
      console.log("Variable campusInformation: "+this.campusInformation.length)
      /*for(let i=0; i<this.campusInformation.length;i++){
        var coords = this.campusInformation[i]['location']
        console.log(coords);
        var array = JSON.parse("[" + coords + "]");
        this.locationDevices.push(array);
      }*/
      this.campusService.readCampus(idArea).subscribe(
        (res) => {
          this.coordinatesAreaMap = res['location'];
          console.log(this.coordinatesAreaMap)
          this.layers.push(L.polygon(this.coordinatesAreaMap, { color: '#04B431'}));
          let coordinates = res['pointMap'];
          console.log(coordinates[0]);
          let latitude = coordinates[0]['latitude'];
          let longitude = coordinates[0]['longitude'];
            //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
          for(let i=0; i<campusInformation.length;i++){
            this.layers.push(L.marker(JSON.parse("["+campusInformation[i]['location']+"]"), {
              icon: L.icon({
                iconAnchor: [12, 41], //center de icon image url
                popupAnchor: [0, -41], //center de icon image url
                iconUrl: './assets/css/images/marker-icon.png',
                shadowUrl: './assets/css/images/marker-shadow.png'
              })
            })
            .bindPopup('id: '+campusInformation[i]['id']+'<br>'+'owner: '+campusInformation[i]['owner'])
          );
          }
          //LEAFLET OPTIONS OF THE MAP
          this.options = {
            layers: [
              L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
              this.drawnItems = new L.FeatureGroup()
            ],
            zoom: 18,
            center: L.latLng({ lat: latitude, lng: longitude })
          }; 
          return this.showMapDevices = true;    
        },
        (error) => {
          console.log(error);
        }
      )
  }
}
