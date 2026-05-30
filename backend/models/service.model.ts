export interface Service {
  id?: string;
  clientId: string;
  vehicleId: string;

  serviceTitle: string;
  serviceDate: string;
  mileage?: number;
  description?: string;
  cost?: number;

  nextServiceDate?: string;
  status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}
