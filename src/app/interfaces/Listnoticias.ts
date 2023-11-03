import { Noticia } from "./Noticia";

export interface Listnoticias {
  count: number,
  next: string,
  previous: string,
  results : Noticia [];
}
