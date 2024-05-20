export interface Client {
  full_name: string;
  address: string;
  cups: string;
  role: string;
  building_type: string;
}

export interface Supply {
  cups: string;
  tariff: string;
  invoiced_amount: string;
  power: {
    p1: string;
    p2: string;
  };
  neighbors: string[];
}
