import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/Noticia';
import { Listnoticias } from '../interfaces/Listnoticias';
import { NoticiasResponse } from '../interfaces/favoritos';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private urlsavefav = "http://localhost:8090/Apiback/savefav";
  private urlGetFavs = 'http://localhost:8090/Apiback/getfavs';
  private urldeletefav = "http://localhost:8090/Apiback/deletefav";



  constructor(private http: HttpClient) { }

  obtenernoticas(url : string):Observable<Listnoticias> {
    return this.http.get<Listnoticias>(url)

  }
  public savefav(noticia: Noticia): Observable<Noticia> {
    console.log(this.urlsavefav)
    return this.http.post<Noticia>(`${this.urlsavefav}`, noticia);
  }
  getfavsnews(): Observable<NoticiasResponse> {
    return this.http.get<NoticiasResponse>(this.urlGetFavs);
  }

  deletefavs(idfav: number): Observable<any> {
    const apiUrl = `${this.urldeletefav}/${idfav}`;
    return this.http.delete(apiUrl);
  }

}
