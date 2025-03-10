// filepath: /c:/Users/pvipparl/workspace/DriveShield/src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private jsonUrl = 'assets/vehicles.json';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}