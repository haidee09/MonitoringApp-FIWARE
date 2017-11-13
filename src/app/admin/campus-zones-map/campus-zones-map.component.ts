import {   Component, Input,OnInit,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { Campus } from '../../models/campus';
import { Zone } from '../../models/zone';
import { CampusService } from '../../services/campus.service';
import { ZoneService } from '../../services/zone.service';
import { GeocodingService } from '../../services/geocoding.service';
//import { OCB } from 'ocb-sender/lib/OCB';


@Component({
  selector: 'app-campus-zones-map',
  templateUrl: './campus-zones-map.component.html',
  styleUrls: ['./campus-zones-map.component.css'],
  host:{'class':'col-xl-10'}
})

export class CampusZonesMapComponent {

  //@Input() listCampus: any;  
  listCampus: any;
  listZones: any;
  pointMapCenter: any;
  latitude: any;
  longitude: any;
  layers:any[] = [];
  locationDevices: any[]=[];
  coordinatesAreaMap: any;
  campusInformation : any;
  zoneInformation: any;
  query: string;
  addressProvided: boolean = null;
  selectCampus:boolean = true;
  selectZone:boolean = false;
  showMapDevices: boolean = false;
  messageCampus: string = null;
  messageZone: string = null;
  draw: boolean = false;
  drawWarningMessage: string = null;
  selectedCampus: string = null;
  selectedZone: string = null;
  selectedOption: string;
  campusQuery: string;
  zoneQuery: string;
  successCampus:boolean = null;
  successZone: boolean = null;

  //Maps
  map: L.Map;
  options: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;
  polygon: L.GeoJSON;
  polygonCoordinates: any;
  coordinatesConverted: any[]=[];

  //Models
  campus: Campus;
  zone: Zone;

  constructor(private campusService: CampusService, private zoneService: ZoneService, private geocodingService: GeocodingService) { 
    this.campus = new Campus('','','','', null, null, new Date(), new Date());
    this.zone = new Zone('','',null,new Date(), new Date());
    //this.cb = new OCB();
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )
    this.zoneService.listZones().subscribe(
      (res) => {
        this.listZones = res;
        console.log(this.listZones)
      },
      (error) => {
        console.log(error);
      }
    )
  }	
  campusForm(){
    this.selectCampus=true;
    this.selectZone=false;
  }
  zoneForm(){
    this.selectZone=true;
    this.selectCampus=false;
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )
  }
  startDraw(){
    this.pointMapCenter = null;
    if(this.selectCampus){
      if(this.campus.address!=null){
        this.geocodingService.geocode(this.campus.address).subscribe(
          (result) => { 
            console.log(result) 
            this.pointMapCenter = result;       
            this.options = {
              layers: [
                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
                this.drawnItems = new L.FeatureGroup()
              ],
              zoom: 18,
              center: L.latLng({ lat: this.pointMapCenter.latitude, lng: this.pointMapCenter.longitude })
            };
            this.drawOptions = {
              position: 'topleft',
              draw: {
                marker: {
                  icon: L.icon({
                    iconUrl: './assets/css/images/marker-icon.png',
                    shadowUrl: './assets/css/images/marker-shadow.png'
                  })
                },
                polygon:{
                  shapeOptions: {
                  color: '#72d33d'
                  }
                },
                circle:false
              },
              edit: {
                featureGroup: this.drawnItems,
                edit:false
              }
            };
            this.draw = true;
          }
        )                         
      }
      else{
        this.addressProvided = false;
      }
    }
    else if(this.selectZone){
      console.log(this.selectedCampus);
      this.campusService.readCampus(this.selectedCampus).subscribe(
        (res) => {
          let coordinates = res['pointMap'];
          console.log(coordinates[0]);
          let latitude = coordinates[0]['latitude'];
          let longitude = coordinates[0]['longitude'];
          this.options = {
            layers: [
              L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
              this.drawnItems = new L.FeatureGroup()
            ],
            zoom: 18,
            center: L.latLng({ lat: latitude, lng: longitude })
          };
          this.drawOptions = {
            position: 'topleft',
            draw: {
              marker: {
                icon: L.icon({
                  iconUrl: './assets/css/images/marker-icon.png',
                  shadowUrl: './assets/css/images/marker-shadow.png'
                })
              },
              polygon:{
                shapeOptions: {
                color: '#72d33d'
                }
              },
              circle:false
            },
            edit: {
              featureGroup: this.drawnItems,
              edit:false
            }
          };
          this.draw = true;
        },
        (error) =>{
          console.log(error);
        }
      )
    }
  }
  endDraw(){
    this.draw = false;
    this.drawWarningMessage= '';
  }
  clearInputs(){
    this.coordinatesConverted=[];
    this.campus.name = "";
    this.campus.address = "";
    this.zone.name = "";
    this.selectedCampus = "";
  }
  registerCampus(){
    if(!this.draw){
      this.campus.pointMap = this.pointMapCenter;
      this.campus.location = this.coordinatesConverted;
      this.campusService.createCampus(this.campus).subscribe(
        (res) => {
          this.messageCampus = "New Campus Created. The register has been saved successfully."
          console.log(this.messageCampus);
          this.clearInputs();
          this.successCampus = true;
          console.log(this.successCampus)
          console.log(res);
        },
        (error) => {
          this.successCampus = false;
          console.log(error);
        }
      );
    }
    else{
      //this.draw=false;
      this.drawWarningMessage="Finish the delimitation of campus. Click End Draw button"
      console.log(this.drawWarningMessage);
    }
  }
  registerZone(){
    if(!this.draw){
      this.zone.refCampus = this.selectedCampus;
      this.zone.location = this.coordinatesConverted;
      this.zoneService.createZone(this.zone).subscribe(
        (res) => {
          this.messageZone = "New Zone Created. The register has been saved successfully."
          console.log(this.messageZone);
          this.clearInputs();
          this.successZone = true;
          console.log(res);
        },
        (error) => {
          this.successZone = false;
          console.log(error);
        }
      );
    }
    else{
      //this.draw=false;
      this.drawWarningMessage="Finish the delimitation of zone. Click End Draw button"
      console.log(this.drawWarningMessage);
    }
  }
  queryContext(){ 
    if(this.selectedOption==='campus'){
      if(this.campusQuery){
        this.campusService.queryContext(this.campusQuery).subscribe(
          (res) => {
            this.campusInformation = res;            
            console.log(this.campusInformation)
            this.showMapDevicesinArea(this.campusQuery);
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
      

    }
    else{
      console.log("Select an option before consult");
    }
  }
  showMapDevicesinArea(idArea){    
    //RESET THE VARIABLES 
    this.showMapDevices = false;
    this.locationDevices = [];
    this.coordinatesAreaMap = [];
    this.layers = [];
    this.latitude = null;
    this.longitude = null;
    //IF THE OPTION SELECTED IS EQUALS TO CAMPUS
    if(this.selectedOption==='campus'){
      for(let i=0; i<this.campusInformation.length;i++){
        var coords = this.campusInformation[i]['location']['value']
        console.log(coords);
        var array = JSON.parse("[" + coords + "]");
        this.locationDevices.push(array);
      }
      this.campusService.readCampus(idArea).subscribe(
        (res) => {
          this.coordinatesAreaMap = res['location'];
          console.log(this.coordinatesAreaMap)
          this.layers.push(L.polygon(this.coordinatesAreaMap, { color: '#04B431'}));
          let coordinates = res['pointMap'];
          console.log(coordinates[0]);
          let latitude = coordinates[0]['latitude'];
          let longitude = coordinates[0]['longitude'];
          /*for(let i=0; i<res['location'].length;i++){
            var coordsP = JSON.parse("["+res['location'][i]+"]",);
            //console.log(coordsP);
            this.coordinatesAreaMap.push(coordsP);
            //console.log(this.coordinatesAreaMap)
          }*/
            //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
          for(let i=0; i<this.locationDevices.length;i++){
            this.layers.push(L.marker(this.locationDevices[i], {
              icon: L.icon({
                iconAnchor: [12, 41], //center de icon image url
                popupAnchor: [0, -41], //center de icon image url
                iconUrl: './assets/css/images/marker-icon.png',
                shadowUrl: './assets/css/images/marker-shadow.png'
              })
            }));
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
          this.showMapDevices = true;    
        },
        (error) => {
          console.log(error);
        }
      )
    }  
    //AQUI DEVUELVE UN ARRAY VACIO, SIENDO QUE NO DEBE SER ASÍ.
    //console.log("Impresion aqui nuevamente"+this.coordinatesAreaMap);
    
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.on('draw:created', (e: any) => {
      console.log(e);
      let type = e.layerType;
      let layer = e.layer;
      if (type === 'marker') {
        console.log("CREANDO MARCADOR");
        let coordinates = layer.getLatLng();
        console.log(coordinates);
      }
      if (type === 'polygon') {
        console.log("CREANDO POLÍGONO");
        this.polygon = layer.toGeoJSON();
        this.polygonCoordinates = this.polygon['geometry']['coordinates'];
        //this.coordinatesConverted=
        /*this.polygonCoordinates.forEach(element => {
          this.coordinatesConverted.push([element[1],element[0]]);        
        });
        /*for(let coord in this.polygonCoordinates){
          this.coordinatesConverted.push([coord[1],coord[0]]);
        }*/
        //CONVERT COORDINATES [LON,LAT] GeoJSON [IN LAT],LON COORDINATES.
        for(let i=0; i<this.polygonCoordinates.length;i++){
          for(let j=0; j<this.polygonCoordinates[i].length;j++){
            this.coordinatesConverted.push([this.polygonCoordinates[i][j][1],this.polygonCoordinates[i][j][0]]);         
          }
        }
        //this.coordinatesConverted = L.geoJSON(this.polygonCoordinates, L.GeoJSON.coordsToLatLng);
        //this.polygonConverted = L.geoJSON(this.polygon, coordsToLatLng)
        console.log(JSON.stringify(this.polygon));
        console.log(this.polygonCoordinates);
        console.log(this.coordinatesConverted);
        
      }
      if (type === 'rectangle') {
        console.log("CREANDO RECTÁNGULO");
        let coordinates = layer.toGeoJSON();
        console.log(JSON.stringify(coordinates));
      }
      // Do whatever else you need to. (save to db; add to map etc)
      this.drawnItems.addLayer(layer);
    });
    
  } 
}
