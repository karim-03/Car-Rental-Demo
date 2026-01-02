export interface CarType {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  carType: CarType;
  fromDate: string;
  toDate: string;
  username: string;
  mobileNumber: string;
  comments?: string;
}
