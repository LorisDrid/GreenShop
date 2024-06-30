export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  previousPrice: number;
  supplier: string;
  image: string;
  rate: number;
  rateCount: number;
  createdAt: string;
  modifiedAt: string;
  labels: Label[];
  greenScore: string;
}

export interface Label {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
}
