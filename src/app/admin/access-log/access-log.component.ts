import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { CampusService } from '../../services/campus.service';
import { ZoneService } from '../../services/zone.service';
import * as L from 'leaflet';
import { UserService } from 'app/services/user.service';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css'],
  host:{'class':'col-xl-10'}
})
export class AccessLogComponent{
  
  map: L.Map;
  marcador1: any = null;
  marcador2: any = null;
  marcador3: any = null;
  listCampus: any;
  listZones: any;
  listUsers: User[] = [];
  latitude = null;
  longitude = null;
  showMapCampus: boolean = false;
  zonesShown: boolean = false;
  campusSelected: string = null;
  zoneSelected: string = null;
  message: string;
  owner: string = null;
  idUser: string = null;
  dataUser: User;
  devicesCampus: Object[] = [];
  devicesZone: Object[] = [];
  polygonCampusMap: any[] = [];
  polygonZoneMap: any[] = [];
  layers:any[] = [];
  listZonesCampusSelected: Zone[] = [];
  locationDevicesCampus: any[]=[];
  locationDevicesZone: any[] = [];
  popupMap: L.Popup;
  options: L.MapOptions;
  optionsInit: L.MapOptions;
  drawControl: L.Control.Draw;
  drawnItems: L.FeatureGroup;
  drawOptions: L.Control.DrawConstructorOptions;

  //SOCKET ALERTS
  alerts = [];
  connection: any;

  constructor(private campusService: CampusService, private zoneService: ZoneService, private userService: UserService, private alertService:AlertService) { 
    this.listCampus = this.campusService.listCampus();
    this.optionsInit = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 1,
      center: L.latLng({ lat: 0, lng: 0 })
    };
  }	

  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }

  clearVariables(){
    this.listZonesCampusSelected = [];
    this.options = null;
    this.longitude = null;
    this.latitude = null;
    this.showMapCampus = false;
    this.campusSelected = null;
    this.layers = [];
    this.locationDevicesCampus=[];
    this.polygonCampusMap = [];
    this.devicesCampus = null;
    this.dataUser = null;
    this.listUsers = null;
  }
  //**************BUSCAR ZONAS Y DISPOSITIVOS CONTENIDOS EN UN CAMPUS************************
  searchZonesOfCampus(idCampus: string, pointMap: any[], location: any[]){
    //LIMPIAR VARIABLES DE ESTE MÉTODO
    this.clearVariables();
    //GUARDAR ID DEL CAMPUS EN UNA VARIABLE
    this.campusSelected = idCampus;
    //GUARDAR LATITUD Y LONGITUD PARA CENTRAR EL MAPA
    this.latitude = pointMap[0]['latitude'];
    this.longitude = pointMap[0]['longitude'];
    console.log(this.latitude)
    console.log(this.longitude);
    //INICIALIZAR OPCIONES DEL MAPA PARA MOSTRARLO
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 18,
      center: L.latLng({ lat: this.latitude, lng: this.longitude })
    };
    //SI EL FILTRO DE OWNER Y ID DE USUARIO ES DIFERENTE NULL
    if(this.owner || this.idUser){
      if(this.owner && this.idUser==null){
      console.log(this.owner);
      return this.userService.listUsers().subscribe(
        (res) =>{
          this.listUsers = res;
          for(let i=0; i<this.listUsers.length;i++){
            if(this.listUsers[i]['name']==this.owner){
              this.dataUser = this.listUsers[i];
              console.log("DATA USER"+ this.dataUser.id);
              break;
              //console.log("DATA USER"+ this.dataUser.idUser);
            }
          }
          if(this.dataUser){
            console.log("DATA USER"+ this.dataUser.id);
            let comma = "'";
            let query = {
              options: "keyValues",
              id: ".*",
              type: "Device",
              owner: comma+this.dataUser.id+comma,
              georel : "coveredBy",
              geometry: "polygon",
              coords : location,
            }
            console.log("DATA USER"+ this.dataUser.id);
            this.userService.checkContextUser(query).subscribe(
              (res) => {
                console.log(res);
                if(res.length > 0){
                  console.log(res[0]);
                  console.log(JSON.parse("["+res[0]['location']+"]"));
                  this.layers.push(L.marker(JSON.parse("["+res[0]['location']+"]"), {
                      icon: L.icon({
                        iconAnchor: [12, 41], //center de icon image url
                        popupAnchor: [0, -41], //center de icon image url
                        iconUrl: './assets/css/images/marker-icon.png',
                        shadowUrl: './assets/css/images/marker-shadow.png'
                      })
                    })
                    .bindPopup('idUser: '+res[0]['owner']+'<br>'+'name: '+this.dataUser.name)
                  );
                  this.showMapCampus = true;
                }
                else{
                  console.log("Usuario no encontrado en el campus seleccionado")
                }
              },
              (error) => {
                console.log(error);
              }
            ) 
          }
          else{
            console.log("Usuario con nombre: " +this.owner +" no encontrado")
          }
          //this.searchDeviceOwner(this.dataUser);           
        },
        (error) => {
          console.log(error);
        }
      ) 
      }
      else if(this.idUser && this.owner==null){
        console.log(this.idUser);
        let comma = "'";
        let query = {
          options: "keyValues",
          id: ".*",
          type: "Device",
          owner: comma+this.idUser+comma,
          georel : "coveredBy",
          geometry: "polygon",
          coords : location,
        }
        console.log("DATA USER"+ this.idUser);
        this.userService.checkContextUser(query).subscribe(
          (res) => {
            console.log(res);
            if(res.length > 0){
              console.log(res[0]);
              console.log(JSON.parse("["+res[0]['location']+"]"));
              this.layers.push(L.marker(JSON.parse("["+res[0]['location']+"]"), {
                icon: L.icon({
                  iconAnchor: [12, 41], //center de icon image url
                  popupAnchor: [0, -41], //center de icon image url
                  iconUrl: './assets/css/images/marker-icon.png',
                  shadowUrl: './assets/css/images/marker-shadow.png'
                })
              })
                .bindPopup('idUser: '+res[0]['owner'])
              );
              this.showMapCampus = true;
            }
            else{
              console.log("Usuario no encontrado en el campus seleccionado")
            }
          },
          (error) => {
            console.log(error);
          }
        ) 
      }
    }
    else{
    //BUSQUEDA DE DEVICES DENTRO DEL CAMPUS SELECCIONADO
    this.campusService.queryContextDevices(idCampus).subscribe(
      (res) => {
        //ALMACENAR LA RESPUESTA DEL SERVER EN UNA VARIABLE GLOBAL
        this.devicesCampus = res;            
        console.log(this.devicesCampus)
        console.log("Devices Campus" + this.devicesCampus);
        console.log("Devices Campus Length "+this.devicesCampus.length);
        //RECORRER EL ARRAY DE devicesCampus
       /* for(let i=0; i<this.devicesCampus.length;i++){
          var coords = this.devicesCampus[i]['location']
          console.log(coords);
          var array = JSON.parse("[" + coords + "]");
          //Guardar las localizaciones de los devices en un array
          this.locationDevicesCampus.push(array);
        }*/
        //GUARDAR EL POLÍGONO DEL CAMPUS EN UNA VARIABLE GLOBAL
        this.polygonCampusMap = location;
        console.log(this.polygonCampusMap)
        //INGRESAR EL ARRAY LAYERS EL POLIGONO PARA SER VISUALIZADO EN EL MAPA
        this.layers.push(L.polygon(this.polygonCampusMap, { color: '#04B431'}));
        //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
        for(let i=0; i<this.devicesCampus.length;i++){
          //INGRESAR AL ARRAY LAYERS LOS MARCADORES CON LA LOCALIZACIÓN DE CADA DISPOSITIVO.
          this.layers.push(L.marker(JSON.parse("["+this.devicesCampus[i]['location']+"]"), {
            icon: L.icon({
              iconAnchor: [12, 41], //center de icon image url
              popupAnchor: [0, -41], //center de icon image url
              iconUrl: './assets/css/images/marker-icon.png',
              shadowUrl: './assets/css/images/marker-shadow.png'
            })
          })
          .bindPopup('id:'+this.devicesCampus[i]['id']+ '<br>' + 'owner: '+this.devicesCampus[i]['owner'])
        );
        }
        //return this.devicesCampus;
      },
      (error) => {
        console.log(error);
      }
    )
    //BUSCAR LAS ZONAS QUE PERTENECEN A EL CAMPUS SELECCIONADO
    this.zoneService.listZones().subscribe(    
      (res) => {
        //GUARDAR LA LISTA DE ZONAS EN UNA VARIABLE GLOBAL
        this.listZones = res;
        console.log(this.listZones);
        console.log("Valor de la variable idCampus selected "+idCampus);
        // RECORRER EL ARRAY DE ZONAS
        for(let i=0; i<this.listZones.length;i++){
          if(this.listZones[i]['refCampus'] === idCampus){
            console.log(this.listZones[i]['refCampus']);
            //GUARDAR LAS ZONAS EN UN ARRAY DE listZonesCampusSelected
            this.listZonesCampusSelected.push(this.listZones[i]);
            console.log(this.listZonesCampusSelected);
          }
        }
        console.log(this.listZonesCampusSelected);
        //SI EL ARRAY DE ZONAS DEL CAMPUS SELECCIONADO ESTA VACIO MANDAR UN MENSAJE DE QUE NO EXISTEN ZONAS EN ESE CAMPUS.
        if(this.listZonesCampusSelected.length===0){
          this.message = "Not exist zones registered of this campus yet";
          console.log("No existen zonas registradas de este campus");
        };
        this.showMapCampus = true;
      },
      (error) => {
        console.log(error);
      }
    )
    }
    //this.zonesShown = true;    
  }
  /*searchDevicesOnZone(idZone: string, location: any[]){
    let layersTemp = this.layers;
    this.layers = [];

    this.zoneSelected = idZone;
    this.zoneService.queryContextDevices(idZone).subscribe(
      (res) =>{
        this.devicesZone = res;
        console.log(this.devicesZone)
        console.log("Devices Zone" + this.devicesZone);
        console.log("Devices Zone Length "+this.devicesZone.length);
        //RECORRER EL ARRAY DE devicesCampus
        for(let i=0; i<this.devicesZone.length;i++){
          var coords = this.devicesZone[i]['location']
          console.log(coords);
          var array = JSON.parse("[" + coords + "]");
          //Guardar las localizaciones de los devices en un array
          this.locationDevicesZone.push(array);
        }
        //GUARDAR EL POLÍGONO DEL CAMPUS EN UNA VARIABLE GLOBAL
        this.polygonZoneMap = location;
        console.log(this.polygonZoneMap)
        //INGRESAR EL ARRAY LAYERS EL POLIGONO PARA SER VISUALIZADO EN EL MAPA
        this.layers.push(L.polygon(this.polygonZoneMap, { color: '#58ACFA'}));
        //MARKERS OF DEVICES THAT ARE INSIDE IN THE AREA.
        for(let i=0; i<this.locationDevicesZone.length;i++){
          //INGRESAR AL ARRAY LAYERS LOS MARCADORES CON LA LOCALIZACIÓN DE CADA DISPOSITIVO.
          this.layers.push(L.marker(this.locationDevicesZone[i], {
            icon: L.icon({
              iconAnchor: [12, 41], //center de icon image url
              popupAnchor: [0, -41], //center de icon image url
              iconSize:[25, 41],
              iconUrl: './assets/css/images/marker-icon.png',
              shadowUrl: './assets/css/images/marker-shadow.png'
            })
          }));
        }
        return this.devicesZone;
      },
      (error) => {
        console.log(error);
      }
    )
    this.layers.push(layersTemp);
  }*/
  /*options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
      this.marcador1 = L.marker([18.87652, -99.21992], {
        icon: L.icon({
        iconAnchor: [12, 41], //center de icon image url
        popupAnchor: [0, -41], //center de icon image url
        iconUrl: './assets/css/images/marker-icon.png',
        shadowUrl: './assets/css/images/marker-shadow.png'
        })
      })
      .bindPopup('Jorge Palacios<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
      this.marcador2 = L.marker([18.87649, -99.21959],{
        icon: L.icon({
        iconAnchor: [12, 41], //center de icon image url
        popupAnchor: [0, -41], //center de icon image url
        iconUrl: './assets/css/images/marker-icon.png',
        shadowUrl: './assets/css/images/marker-shadow.png'
        })
      })
      .bindPopup('Roberto Jimenez<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
      this.marcador3 = L.marker([18.87641, -99.21975], {
        icon: L.icon({
        iconAnchor: [12, 41], //center de icon image url
        popupAnchor: [0, -41], //center de icon image url
        iconUrl: './assets/css/images/marker-icon.png',
        shadowUrl: './assets/css/images/marker-shadow.png'
        })
      })
      .bindPopup('Diana	González<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
        this.popupMap = L.popup()
        .setLatLng([18.87627,-99.21966])
        .setContent('MAPA CENIDET CAMPUS PALMIRA'),
        this.drawnItems = new L.FeatureGroup(),
      ],
      zoom: 18,
      center: L.latLng({ lat: 18.87627, lng: -99.21966 })
  };*/ 
  /*drawOptions = {
    position: 'topleft',
    draw: {
      marker: {
        icon: L.icon({
          iconUrl: './assets/css/images/marker-icon.png',
          shadowUrl: './assets/css/images/marker-shadow.png'
        })
      },
      circle:false
    },
    edit: {
      featureGroup: this.drawnItems,
      edit:false
    }
  };*/
  /*searchDeviceOwner(dataUser: User){

  }*/
  onMapReady(map: L.Map) {
    this.map = map;
    /*this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.popupMap.setLatLng(e.latlng)
      this.popupMap.setContent("Coordenadas " + e.latlng.toString())
      this.popupMap.openOn(this.map);
    });*/
    this.map.on('draw:created', (e: any) => {
      console.log(e);
      let type = e.layerType;
      let layer = e.layer;
      if (type === 'marker') {
        console.log("CREANDO MARCADOR")
        let coordinates = layer.getLatLng();
        console.log(coordinates);
      }
      if (type === 'polygon') {
        console.log("CREANDO POLÍGONO")
      }
      if (type === 'rectangle') {
        console.log("CREANDO RECTÁNGULO")
      }
      // Do whatever else you need to. (save to db; add to map etc)
      this.drawnItems.addLayer(layer);
    });
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  } 
}
