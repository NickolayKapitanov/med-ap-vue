export interface Programm {
  id: string;
  title: string;
  category: Array<string>;
  description: string;
  fullDescription: string;
  price: number;
}

export interface Programms {
  programms: Array<Programm>;
}