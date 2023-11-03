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
  templateUrl: './inicio.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class InicioComponent implements OnInit{
  noticias: Noticia[] = [];
  listnoticias : Listnoticias | undefined;
  favoritas: any[] = [];
  noticiasFavoritas: any[] = [];
  columnas: string[] = ['imagen', 'titulo', 'descripcion', 'fecha', 'favoritos'];
  favoritosDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  columnasFavoritos: string[] = ['favorito_titulo', 'favorito_descripcion', 'favorito_fecha'];


  constructor(private servicio:ServicioService) {}


  ngOnInit() {
    this.obtenernoticias();
  }
  obtenernoticias(){
    this.servicio.obtenernoticas().subscribe(
      {
        next:response => {
          this.listnoticias= response;
          this.noticias=this.listnoticias.results
        }
      }
    )
  }






}
