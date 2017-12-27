import {   Component, Input,OnInit,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { Zone } from '../../../models/zone';
import { ZoneService } from '../../../services/zone.service';
import { CampusService } from '../../../services/campus.service';

@Component({
  selector: 'app-zones-form',
  templateUrl: './zones-form.component.html',
  styleUrls: ['./zones-form.component.css'],
  host:{'class':'col-xl-10'}
})
export class ZonesFormComponent{
    
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
  selectZone:boolean = true;
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
  optionsInit: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;
  polygon: L.GeoJSON;
  polygonCoordinates: any;
  coordinatesConverted: any[]=[];

  zone: Zone;

  constructor(private campusService: CampusService, private zoneService: ZoneService) { 
    this.zone = new Zone('','',null,new Date(), new Date());
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
  startDraw(){
    this.pointMapCenter = null;
    if(this.selectZone){
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
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
  }
  clearInputs(){
    this.coordinatesConverted=[];
    this.zone.name = "";
    this.selectedCampus = "";
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
