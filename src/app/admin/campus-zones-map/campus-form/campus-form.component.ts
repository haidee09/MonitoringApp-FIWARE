import {   Component, Input,OnInit,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { Campus } from '../../../models/campus';
import { CampusService } from '../../../services/campus.service';
import { GeocodingService } from '../../../services/geocoding.service';

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.css'],
  host:{'class':'col-xl-10'}
})
export class CampusFormComponent  {

  listCampus: any;
  pointMapCenter: any;
  layers:any[] = [];
  locationDevices: any[]=[];
  coordinatesAreaMap: any;
  campusInformation : any;
  query: string;
  searchAddressMap: boolean = false;
  addressProvided: boolean = null;
  selectCampus:boolean = true;
  messageCampus: string = null;
  draw: boolean = false;
  drawWarningMessage: string = null;
  selectedCampus: string = null;
  selectedOption: string;
  campusQuery: string;
  successCampus:boolean = null;

  //Maps
  map: L.Map;
  optionsInit: L.MapOptions;
  options: L.MapOptions;
  optionsMapSearchAddress: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;
  polygon: L.GeoJSON;
  polygonCoordinates: any;
  coordinatesConverted: any[]=[];

  //Models
  campus: Campus;

  constructor(private campusService: CampusService, private geocodingService: GeocodingService) { 
    this.campus = new Campus('','','','', null, null, new Date(), new Date());
    /*this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )*/
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
    /*this.drawOptions = {
      position: 'topleft',
      draw: {
        marker: false,
        polygon: false,
        circle: false,
        polyline: false,
        rectangle: false
      },
      edit: {
        featureGroup: this.drawnItems,
        edit:false,
        remove: false
      }
    };*/
  }	
  searchAddress(){
    this.pointMapCenter = null;
    this.geocodingService.geocode(this.campus.address).subscribe(
      (result) => { 
        console.log(result) 
        this.pointMapCenter = result;       
        this.optionsMapSearchAddress = {
          layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
            this.drawnItems = new L.FeatureGroup()
          ],
          zoom: 18,
          center: L.latLng({ lat: this.pointMapCenter.latitude, lng: this.pointMapCenter.longitude })
        };
        this.searchAddressMap = true;
      }
    )
  }
  startDraw(){
    this.searchAddressMap = false;
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
    this.campus.name = "";
    this.campus.address = "";
    this.selectedCampus = "";
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
    this.searchAddressMap = false;
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
