import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';


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
    popupMap: L.Popup;
    drawControl: L.Control.Draw;
    drawnItems: L.FeatureGroup;

    options = {
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
      /*zoom: 18,
      center: L.latLng([18.87627,-99.21966]),
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        L.marker([18.87649,-99.21986], {
          icon: L.icon({
            iconUrl: 'assets/css/images/marker-icon.png',
            shadowUrl: 'assets/css/images/marker-shadow.png'
          })
        })
        .bindPopup('Jorge Palacios<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
         L.marker([18.87649, -99.21959],{
          icon: L.icon({
            iconUrl: './assets/css/images/marker-icon.png',
            shadowUrl: './assets/css/images/marker-shadow.png'
          })
        })
        .bindPopup('Roberto Jimenez<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
        L.marker([18.87641, -99.21975], {
          icon: L.icon({
            iconUrl: './assets/css/images/marker-icon.png',
            shadowUrl: './assets/css/images/marker-shadow.png'
          })
        })
        .bindPopup('Diana	González<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.'),
        this.popupMap = L.popup()      
      ]*/
    };
    
  drawOptions = {
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
  };

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.popupMap.setLatLng(e.latlng)
      this.popupMap.setContent("Coordenadas " + e.latlng.toString())
      this.popupMap.openOn(this.map);
    });
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
    
    /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marcador1 = L.marker([18.87649,-99.21986]).addTo(map)
    .bindPopup('Jorge Palacios<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.')
    var marcador2 = L.marker([18.87649, -99.21959]).addTo(map)
    .bindPopup('Roberto Jimenez<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.')
    var marcador3 = L.marker([18.87641, -99.21975]).addTo(map)
    .bindPopup('Diana	González<br>Edificio de Electrónica.<br>CENIDET Campus Palmira.')*/
    /*
    var campusCenidet = L.polygon([
      [18.87572, -99.21971],
      [18.87681, -99.21932],
      [18.87697, -99.2203],
      [18.87677, -99.2203],
      [18.87656, -99.2202],
      [18.87627, -99.22014],
      [18.875874, -99.220155]
    ]).addTo(map);
    campusCenidet.bindPopup("CENIDET Campus Palmira.");
    var areaElectronicaCenidet= L.polygon([
      [18.87631, -99.21954],
      [18.87651, -99.2195],
      [18.8766, -99.21999],
      [18.87641, -99.22003]      
    ], {color: 'green'}).addTo(map);
    areaElectronicaCenidet.bindPopup("Zona Electrónica.");
    var popupMap = L.popup();  

    function onMapClick(e) {
      popupMap.setLatLng(e.latlng)
      popupMap.setContent("Coordenadas " + e.latlng.toString())
      popupMap.openOn(map);
    }   
    map.on('click', onMapClick);
  }
  delimitCampus(){

  }
*/
}
