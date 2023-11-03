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
  displayedColumns: string[] = ['titulo', 'descripcion', 'publicado', 'actualizado'];
  dataSource = new MatTableDataSource<Noticia>(this.noticias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servicio:ServicioService) {}


  ngOnInit() {
    this.obtenernoticias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenernoticias(){
    console.log('aqui se inicia el metodo')
    this.servicio.obtenernoticas().subscribe(
      {
        next:response => {
          this.listnoticias= response;
          this.noticias = response.results
        }
      }
    )
    console.log(JSON.stringify(this.noticias))
    this.dataSource = new MatTableDataSource<Noticia>(this.noticias);
  }






}
