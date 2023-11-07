import { ServicioService } from './../services/servicio.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Noticia } from '../interfaces/Noticia';
import { Observable } from 'rxjs';
import { Listnoticias } from '../interfaces/Listnoticias';



@Component({
  selector: 'app-inicio',
  styleUrls: ['./inicio.component.css'],
  templateUrl: './inicio.component.html'
})
export class InicioComponent  implements AfterViewInit, OnInit{
  noticias: Noticia[] = [];
  listnoticias : Listnoticias | undefined;
  favoritas: any[] = [];
  noticiasFavoritas: any[] = [];
  favoritosDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  columnasFavoritos: string[] = ['favorito_titulo', 'favorito_descripcion', 'favorito_fecha'];
  displayedColumns: string[] = ['titulo', 'descripcion', 'publicado', 'actualizado', 'boton'];
  dataSource = new MatTableDataSource<Noticia>(this.noticias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  http: any;
  constructor(private servicio:ServicioService) {}


  ngOnInit() {
    this.obtenernoticias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // obtenernoticias(){

  // this.servicio.obtenernoticas().subscribe({
  //   next: (response: Listnoticias) => {
  //     this.listnoticias = response;
  //     this.noticias = response.results;
  //     this.dataSource = new MatTableDataSource<Noticia>(this.noticias);
  //     this.dataSource.paginator = this.paginator; // Configurar el paginador después de que se establezca la fuente de datos
  //   },
  //   error: (error) => {
  //     console.error('Error al obtener noticias:', error);
  //   }
  // });
  // }
  obtenernoticias() {
    this.obtenernoticiasnext('https://api.spaceflightnewsapi.net/v4/articles');
  }

  obtenernoticiasnext(url: string) {
    console.log('Obteniendo noticias desde: ' + url);

    this.servicio.obtenernoticas(url).subscribe({
      next: (response: Listnoticias) => {
        if (this.noticias.length === 0) {
          this.noticias = response.results;
          this.noticias = response.results;
          this.dataSource.data = this.noticias;
          this.dataSource.paginator = this.paginator;
          console.log(this.noticias)
        } else {
          this.noticias = this.noticias.concat(response.results);
        }


        if (response.next) {
          this.obtenernoticiasnext(response.next);
        } else {
          this.dataSource = new MatTableDataSource<Noticia>(this.noticias);
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error) => {
        console.error('Error al obtener noticias:', error);
      }
    });
  }
  agregarafavs(noticia: Noticia) {
    console.log(noticia)
    const apiUrl = 'http://localhost:8080/apiSodexo/guardar';
    this.http.post(apiUrl, noticia).subscribe(
      (response: any) => {
        console.log('Noticia enviada con éxito', response);
      },
      (error: any) => {
        console.error('Error al enviar la noticia', error);

      }
    );
  }





}
