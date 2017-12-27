import { Component, OnInit, OnDestroy} from '@angular/core';
import { Campus } from '../../models/campus';
import { Zone } from '../../models/zone';
import { SecurityGuard } from '../../models/securityguard';
import { AlertService } from '../../services/alert.service';
import { SecurityguardService } from '../../services/securityguard.service';
import { CampusService } from '../../services/campus.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-security-guards',
  templateUrl: './security-guards.component.html',
  styleUrls: ['./security-guards.component.css'],
  host:{'class':'col-xl-10'}
})
export class SecurityGuardsComponent{
  alerts = [];
  connection: any;
  constructor(private alertService:AlertService){}
  ngOnInit() {
    this.connection = this.alertService.getMessages().subscribe(newAlert => {
      console.log(newAlert);
    })
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
