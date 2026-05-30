export interface VehicleNote {
  text: string;
  date?: string;
  addedBy?: string;
}

export interface Vehicle {
  id?: string;
  clientId: string;

  licensePlate?: string;
  vin?: string;
  year?: number;
  make: string;
  model: string;
  engineSize?: string;
  trim?: string;
  color?: string;

  createdDate: string;
  lastServiced?: string;
  nextServiceDate?: string;

  vehicleNotes?: VehicleNote[];
}
