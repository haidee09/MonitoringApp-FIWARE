import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  host:{'class':'col-xl-10'}
})
export class AlertsComponent implements OnInit {
  map: L.Map;
  options: L.MapOptions;
  drawnItems: L.FeatureGroup;
  constructor() { }

  ngOnInit() {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
        this.drawnItems = new L.FeatureGroup()
      ],
      zoom: 18,
      center: L.latLng({ lat: 18.87627, lng: -99.21966 })
    };    
    //L.mapbox.accessToken = 'pk.eyJ1IjoiaGFpZGVlIiwiYSI6ImNqOXMwenczMTBscTIzMnFxNHVyNHhrcjMifQ.ILzRx4OtBRK7az_4uWQXyA';
    //var map = L.mapbox.map('map', 'mapbox.streets')
    //.setView([40, -74.50], 9);
    //var markerList = document.getElementById('marker-list');
  
    /*map.featureLayer.on('ready', function(e) {
      map.featureLayer.eachLayer(function(layer) {
        var item = markerList.appendChild(document.createElement('li'));
        item.innerHTML = layer.toGeoJSON().properties.title;
        item.onclick = function() {
          map.setView(layer.getLatLng(), 14);
        layer.openPopup();
        };
      });
    });*/
  }
}
