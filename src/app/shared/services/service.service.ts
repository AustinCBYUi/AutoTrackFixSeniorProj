import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Service } from '../../../../backend/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl =
    'http://localhost:3000/services';

  constructor(
    private http: HttpClient
  ) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(
      this.baseUrl
    );
  }

  getServiceById(
    id: string
  ): Observable<Service> {

    return this.http.get<Service>(
      `${this.baseUrl}/${id}`
    );
  }

  getServicesByVehicleId(
    vehicleId: string
  ): Observable<Service[]> {

    return this.http.get<Service[]>(
      `${this.baseUrl}/vehicle/${vehicleId}`
    );
  }

  getServicesByClientId(
    clientId: string
  ): Observable<Service[]> {

    return this.http.get<Service[]>(
      `${this.baseUrl}/client/${clientId}`
    );
  }

  addService(
    service: Service
  ): Observable<Service> {

    return this.http.post<Service>(
      this.baseUrl,
      service
    );
  }

  updateService(
    id: string,
    service: Service
  ): Observable<Service> {

    return this.http.put<Service>(
      `${this.baseUrl}/edit-service/${id}`,
      service
    );
  }

  deleteService(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }
}
