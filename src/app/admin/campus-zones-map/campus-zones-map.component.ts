import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Campus } from '../../models/campus';
import { CampusService } from '../../services/campus.service';
/*export class Coordinates{
  lat:number;
  lng:number;
  constructor(lat:number,lng:number){
    this.lat=lat;
    this.lng=lng;
  }
}*/

@Component({
  selector: 'app-campus-zones-map',
  templateUrl: './campus-zones-map.component.html',
  styleUrls: ['./campus-zones-map.component.css'],
  host:{'class':'col-xl-10'}
})

export class CampusZonesMapComponent{

  selectCampus:boolean = true;
  selectZone:boolean = false;
  /*selectCampusMap:boolean = false;
  selectZoneMap:boolean = false;*/
  messageCampus : string = '';
  drawWarningMessage: string = '';

  map: L.Map;
  geoJSONCampus:any;
  geoJSONZone: any;
  options: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;
  campus: Campus;
  draw: boolean = false;
  polygon: L.GeoJSON;
  polygonCoordinates: any;
  coordinatesConverted: any[]=[];
  
  constructor(private campusService: CampusService) { 

    this.campus = new Campus('','','','','',null,new Date(), new Date());
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 18,
      center: L.latLng({ lat: 18.87627, lng: -99.21966 })
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
  }	
  campusForm(){
    this.selectCampus=true;
    this.selectZone=false;
  }
  zoneForm(){
    this.selectZone=true;
    this.selectCampus=false;
  }
  startDraw(){
    this.draw = true;
  }
  endDraw(){
    this.draw = false;
    this.drawWarningMessage= '';
  }
  registerCampus(){
    if(!this.draw){
    this.campus.location = this.coordinatesConverted;
    this.campusService.createCampus(this.campus).subscribe(
      (res) => {
        this.messageCampus = "New Campus Created"
        console.log(this.messageCampus);
        this.coordinatesConverted=[];
        this.campus.name="";
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    }
    else{
      this.drawWarningMessage="Finish the delimitation of campus. Click End Draw button"
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
  /*campusFormMap(){
    this.selectCampusMap=true;
    this.selectZoneMap=false;
  }
  zoneFormMap(){
    this.selectZoneMap=true;
    this.selectCampusMap=false;
  }*/
  
}
