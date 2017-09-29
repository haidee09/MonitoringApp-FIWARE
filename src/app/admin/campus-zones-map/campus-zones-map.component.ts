import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
//import L from 'leaflet';
//import L from 'leaflet-draw';

@Component({
  selector: 'app-campus-zones-map',
  templateUrl: './campus-zones-map.component.html',
  styleUrls: ['./campus-zones-map.component.css'],
  host:{'class':'col-xl-10'}
})
export class CampusZonesMapComponent implements OnInit{

  selectCampus:boolean;
  selectZone:boolean;
  //map:any;
  //marcador: any;
  //polygon:any;
  //popupMap:any;
  constructor() {
    this.selectCampus = false;
    this.selectZone = false;
  }
  ngOnInit() {
    var map = L.map('map').setView([18.87627,-99.21966], 18);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([18.87649,-99.21986]).addTo(map)
    .bindPopup('Edificio de Computación.<br>CENIDET Campus Palmira.')
    .openPopup();
    var campusCenidet = L.polygon([
      [18.87574, -99.21975],
      [18.87681, -99.21932],
      [18.87697, -99.2203],
      [18.87656, -99.2202],
      [18.87627, -99.22014],
      [18.875874, -99.220155]
    ]).addTo(map);
    campusCenidet.bindPopup("CAMPUS CENIDET PALMIRA.");
    var areaComputoCenidet= L.polygon([
      [18.87641, -99.22001],
      [18.87631, -99.21953],
      [18.87651, -99.21948],
      [18.8766, -99.21997]      
    ], {color: 'green'}).addTo(map);
    areaComputoCenidet.bindPopup("Zona Computación.");
    var popupMap = L.popup();  

    function onMapClick(e) {
      popupMap.setLatLng(e.latlng)
      popupMap.setContent("Coordenadas " + e.latlng.toString())
      popupMap.openOn(map);
    }   
    map.on('click',onMapClick);
  }
  campusForm(){
    this.selectCampus=true;
    this.selectZone=false;
  }
  zoneForm(){
    this.selectZone=true;
    this.selectCampus=false;
  }

}
