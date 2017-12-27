import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  host:{'class':'col-xl-10'}
})
export class AlertsComponent {
  constructor() {}  

  /*map: L.Map;
  optionsInit: L.MapOptions;
  options: L.MapOptions;
  drawnItems: L.FeatureGroup;
  alerts = [];
  connection: any;
  latitude: any;
  longitude: any;
  locationDevices: any[]= [];
  coordinatesAreaMap: any[] = [];
  layers: any[] = [];
  campusInformation : any;
  subscriptionAlerts : any;
  timerSubscription: any;
  listCampus: Campus[];
  campus: Campus;
  alertsDB : Observable<Alerts[]>;
  showMapAlerts = false;
  campusQuery: string = null;
  
  constructor(private campusService: CampusService, private toastr: ToastrService, private alertService:AlertService) {
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
      if(this.alerts.length<10){
        this.alerts.push(newAlert);
      }
      else{
        this.alerts = [];
      }
      console.log(JSON.parse("["+newAlert['location']+"]"));
    })
    this.alertsDB = this.alertService.listAlerts();
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
  onChangeValueCampus(newValue: string){
    
    //RESET THE VARIABLES 
    this.locationDevices = [];
    this.coordinatesAreaMap = [];
    this.layers = [];
    this.latitude = null;
    this.longitude = null;
    this.showMapAlerts = false;
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

    this.locationDevices = [];
    //this.coordinatesAreaMap = [];
    this.layers = [];
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
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
            this.drawnItems = new L.FeatureGroup()
          ],
          zoom: 18,
          center: L.latLng({ lat: this.latitude, lng: this.longitude })
        }; 
        for(let i=0; i<this.campusInformation.length;i++){
          var coords = this.campusInformation[i]['location']
          console.log(coords);
          var array = JSON.parse("[" + coords + "]");
          this.locationDevices.push(array);
        }
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

  /*ngOnDestroy() {
    this.connection.unsubscribe();
    /*if (this.subscriptionAlerts) {
      console.log("alertsssss:"+this.subscriptionAlerts)
      this.subscriptionAlerts.unsubscribe();
    }
    if (this.timerSubscription) {
      console.log("alertsssss2:"+this.timerSubscription)
      this.timerSubscription.unsubscribe();
    }
  }*/
}
