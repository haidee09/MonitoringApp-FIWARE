import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Campus } from '../../../models/campus';
import { CampusService } from '../../../services/campus.service';
//import { AlertService } from '../../../services/alert.service';
import * as L from 'leaflet';
//import { Observable } from 'rxjs/Observable';
//import { Alerts } from '../../../models/alerts';
import { MenuComponent } from '../../menu/menu.component';
import { AlertService } from 'app/services/alert.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alerts-map',
  templateUrl: './alerts-map.component.html',
  styleUrls: ['./alerts-map.component.css'],
  host: {'class':'col-xl-10'}
})
export class AlertsMapComponent implements OnInit, OnDestroy{
  
  map: L.Map;
  optionsInit: L.MapOptions;
  optionsMapAlert: L.MapOptions;
  options: L.MapOptions;
  center: L.LatLng;
  drawnItems: L.FeatureGroup;
  latitude: number;
  longitude: number;
  locationDevices: any[]= [];
  coordinatesAreaMap: any[] = [];
  layers: any[] = [];
  campusInformation : Object[];
  subscriptionAlerts : any;
  timerSubscription: any;
  listCampus: Campus[];
  campus: Campus;
 
  showMapAlerts = false;
  showAlertOnMap = false;
  campusQuery: string = null;
  alertsDBTemp: any[] = [];
  alertsDB: any[] = [];

  //SOCKETS
  alerts = [];
  connection: any;
  alertsNumber: number = 0;
  p: number;
  //public campusService: CampusService; 

  constructor(public alertService: AlertService, public campusService: CampusService) {
    //super(alertService);
    //super(alertService,alertsDB, alerts, connection, alertsNumber);
    /*this.alertService = alertService;
    this.alertsDB = alertsDB;
    this.alerts = alerts;
    this.connection = connection;
    this.alertsNumber = alertsNumber;*/
    this.p = 1;
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
    this.campusService.listCampus().subscribe(
      (res) => {
        this.listCampus = res;
        //console.log(this.listCampus)
      },
      (error) => {
        console.log(error);
      }
    )
  }
  //OBTENER TODAS LAS ALERTAS DE LA BD
  getAlerts(){
    this.alertService.listAlerts().subscribe(
      (res) => {
        for(let i=res.length-1; i>=(res.length-10); i--){
          //console.log(res[i])
          this.alertsDBTemp.push(res[i]);
        }
        //console.log(this.alertsDBTemp)
        this.alertsDB = this.alertsDBTemp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(){
    //INICIO ALERTAS-- OBTENER TODAS LAS ALERTAS DE LA BD
    this.getAlerts();
    
    //CONEXIÓN CON EL SERVICIO DE ALERTAS PARA EL SOCKET QUE ESPERA LA LLEGADA DE UNA NUEVA ALERTA.
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      //PETICION DE LAS ALERTAS NUEVAMENTE
      this.alertsDBTemp = [];
      this.alertsDB = []; 
      console.log(this.alertsNumber);
      this.getAlerts();
    })
  }

  clearSearchAlertOnMap(){   
    this.showMapAlerts= false;     
    this.showAlertOnMap = false;
    this.layers = [];
    this.latitude = null;
    this.longitude = null;
    this.coordinatesAreaMap = [];
    this.optionsMapAlert = null;
    return;
  }
  searchAlertOnMap(item: any){
    //console.log(item);    
    let t = this
    var promise = new Promise((resolve, reject) => {
      t.clearSearchAlertOnMap();
      t.coordinatesAreaMap = JSON.parse("["+item['location']+"]")
      console.log(t.coordinatesAreaMap);
      t.latitude = t.coordinatesAreaMap[0];
      t.longitude = t.coordinatesAreaMap[1];
      /*
      Dynamically changing zoom level, center, and fitBounds
      <div leaflet style="height: 300px;"
        [leafletOptions]="options"
        [leafletZoom]="zoom"
        [leafletCenter]="center"
        [leafletFitBounds]="fitBounds">
      </div>
      leafletCenter - Input bind a center position to the map.
      center: LatLng
      On changes, the component re-centers the map on the center point. 
      There is no output binding or events emitted for map pan changes made using map controls.
      */
      t.optionsMapAlert = {
        layers: [
          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'Open Street Map' }),
          t.drawnItems = new L.FeatureGroup()
        ],
        zoom: 18,
        center: L.latLng({ lat: t.latitude, lng: t.longitude })
      };
      t.center = new L.LatLng(t.latitude, t.longitude);  
      t.layers.push(L.marker(JSON.parse("["+item['location']+"]"), {
        icon: L.icon({
        iconAnchor: [12, 41], //center de icon image url
        popupAnchor: [0, -41], //center de icon image url
        iconUrl: './assets/css/images/marker-icon.png',
        shadowUrl: './assets/css/images/marker-shadow.png'
        })
      })
      .bindPopup('id: '+item['id'] +'<br>'+
        'alertSource: ' + item['alertSource'] +'<br>'+
        'category: '+item['category'] +'<br>'+
        'subcategory: '+item['subCategory'] +'<br>'+
        'severity: '+item['severity'])
      .openPopup());
  
      t.showAlertOnMap = true;
      resolve(t.showAlertOnMap)
      //observer.next(t.showAlertOnMap);
    })
    return promise  
  }
  onChangeValueCampus(newValue: string){    
    //RESET THE VARIABLES 
    this.locationDevices = [];
    this.coordinatesAreaMap = [];
    this.layers = [];
    this.latitude = null;
    this.longitude = null;
    this.showMapAlerts = false;
    this.showAlertOnMap = false;
    this.options = null;

    console.log("Valor de la variable this.selectedCampus "+this.campusQuery)
    this.campusService.readCampus(this.campusQuery).subscribe(
      (res) => {
        this.campus = res;
        this.latitude = this.campus['pointMap'][0]['latitude'];
        console.log(this.latitude);
        this.longitude = this.campus['pointMap'][0]['longitude'];
        console.log(this.longitude); 
        console.log(this.listCampus);
        this.coordinatesAreaMap = res['location'];
        console.log(this.coordinatesAreaMap)
        this.showMapAlertsinArea(this.campusQuery);       
      },
      (error) => {
        console.log(error);
      }
    );
  }
  showMapAlertsinArea(idArea){ 

    //this.locationDevices = [];
    //this.coordinatesAreaMap = [];
    //this.layers = [];
    //this.latitude = null;
    //this.longitude = null;
    //this.showMapAlerts = false;
    //this.options = null;

    this.subscriptionAlerts = this.campusService.queryContextAlerts(this.campusQuery).subscribe(
      (res) => {
        this.campusInformation = res;            
        console.log(this.campusInformation)
        //--------------------------showMapAlertsinArea ---------------------------
        this.layers.push(L.polygon(this.coordinatesAreaMap, { color: '#04B431'}));
        console.log("Latitud en showMapAlersArea"+this.latitude);
        this.options = {
          layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'Open Street Map' }),
            this.drawnItems = new L.FeatureGroup()
          ],
          zoom: 18,
          center: L.latLng({ lat: this.latitude, lng: this.longitude })
        }; 
        /*for(let i=0; i<this.campusInformation.length;i++){
          var coords = this.campusInformation[i]['location']
          console.log(coords);
          var array = JSON.parse("[" + coords + "]");
          this.locationDevices.push(this.campusInformation);
        }*/
        //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
        for(let i=0; i<this.campusInformation.length;i++){
          this.layers.push(L.marker(JSON.parse("["+this.campusInformation[i]['location']+"]"), {
            icon: L.icon({
            iconAnchor: [12, 41], //center de icon image url
            popupAnchor: [0, -41], //center de icon image url
            iconUrl: './assets/css/images/marker-icon.png',
            shadowUrl: './assets/css/images/marker-shadow.png'
            })
          })
          .bindPopup('id: '+this.campusInformation[i]['id'] +'<br>'+
            'alertSource: ' + this.campusInformation[i]['alertSource'] +'<br>'+
            'category: '+this.campusInformation[i]['category'] +'<br>'+
            'subcategory: '+this.campusInformation[i]['subCategory'] + '<br>'+
            'severity: '+this.campusInformation[i]['severity'])
          );
        }
        this.showMapAlerts = true; 
        //this.subscribeToData();
        //this.showMapAlertsinArea(this.campusQuery);
      },
      (error) => {
        console.log(error);
      }
    )
    
  }
  /*subscribeToData(): void {
    this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.showMapAlertsinArea(this.campusQuery));
  }*/

  ngOnDestroy() {
    this.connection.unsubscribe();
   // super.ngOnDestroy();
    /*this.connection.unsubscribe();
    if (this.subscriptionAlerts) {
        console.log("alertsssss:"+this.subscriptionAlerts)
        this.subscriptionAlerts.unsubscribe();
      }
      /*if (this.timerSubscription) {
        console.log("alertsssss2:"+this.timerSubscription)
        this.timerSubscription.unsubscribe();
      }*/
  }
}
