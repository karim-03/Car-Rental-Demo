// export tables (types) from the backend API, to use across the frontend components

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
