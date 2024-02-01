import { ServicioService } from './../services/servicio.service';
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

  
  obtenernoticias() {
    this.obtenernoticiasnext('https://api.spaceflightnewsapi.net/v4/articles');
  }

  obtenernoticiasnext(url: string) {
    console.log('Obteniendo noticias desde: ' + url);

    this.servicio.obtenernoticas(url).subscribe({
      next: (response: Listnoticias) => {
        if (this.noticias.length === 0) {
          this.noticias = response.results;          
          this.dataSource.data = this.noticias;
          this.dataSource.paginator = this.paginator;
          console.log(this.noticias)
        } else {
          this.noticias = this.noticias.concat(response.results);
        }


        if (response.next) {
          this.obtenernoticiasnext(response.next);
          this.dataSource = new MatTableDataSource<Noticia>(this.noticias);
          this.dataSource.paginator = this.paginator;
        } else {          
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error) => {
        console.error('Error al obtener noticias:', error);
      }
    });
  }
  savefavs(noticia:Noticia):void{
    
    const fav: any = {
      id: noticia.id,
      title: noticia.title,
      url: noticia.url,
      imageurl: noticia.image_url,
      news_site: noticia.news_site,
      summary: noticia.summary,
      publishedat: noticia.published_at,
      updatedat: noticia.updated_at,
      featured: noticia.featured,
      launches: [],
      events: []
    }
    console.log(fav);
    this.servicio.savefav(fav).subscribe((result) => {
      if(result){
        console.log("favorite its saved", result);

      }else{
        console.log("error at trying to save",result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }



  
}
