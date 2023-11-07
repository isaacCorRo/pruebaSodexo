import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Noticia } from '../interfaces/Noticia';
import { Listnoticias } from '../interfaces/Listnoticias';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  [x: string]: any;
  noticias: Noticia[] = [];
  dataSource = new MatTableDataSource<Noticia>();
  displayedColumns: string[] = ['titulo', 'descripcion', 'publicado', 'actualizado', 'boton'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.obtenernoticiasnext('http://localhost:8080/apiSodexo/noticias');
  }

  obtenernoticiasnext(url: string) {
    console.log('Obteniendo noticias desde: ' + url);

    this.httpClient.get<Noticia[]>(url).subscribe((response) => {
      this.noticias = this.noticias.concat(response);
      this.dataSource.data = this.noticias;
      this.dataSource.paginator = this.paginator;
    }, (error: any) => {
      console.error('Error al obtener noticias:', error);
    });
  }
  enviarid(id: number) {
    console.log(id)
    const apiUrl = 'http://localhost:8080/borrarFavoritos/[id]';
    this.httpClient.delete(apiUrl).subscribe(
      (response: any) => {
        console.log('Noticia enviada con éxito', response);
      },
      (error: any) => {
        console.error('Error al enviar la noticia', error);

      }
    );
  }

}
