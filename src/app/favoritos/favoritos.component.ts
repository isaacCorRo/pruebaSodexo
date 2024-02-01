import { ServicioService } from './../services/servicio.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NoticiaResponse } from '../interfaces/favoritos';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
  
})
export class FavoritosComponent {
  [x: string]: any;
  noticiasFavoritas: any[] = [];
  noticias: NoticiaResponse[] = [];
  dataSource = new MatTableDataSource<NoticiaResponse>();
  displayedColumns: string[] = ['titulo', 'descripcion', 'publicado', 'actualizado', 'boton'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.obtenerNoticiasFavoritas();
  }

  obtenerNoticiasFavoritas(): void {
    this.servicioService.getfavsnews().subscribe(
      (respuesta: { noticiasresponse: { noticias: any[]; }; }) => {
        if (respuesta && respuesta.noticiasresponse && respuesta.noticiasresponse.noticias) {
          this.noticiasFavoritas = this.formatoFecha(respuesta.noticiasresponse.noticias);
          console.error(this.noticiasFavoritas);
          console.error(respuesta.noticiasresponse.noticias);
          this.dataSource.data = this.noticiasFavoritas;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('La estructura de la respuesta es incorrecta:', respuesta);
        }
      },
      (error: any) => {
        console.error('Error al obtener noticias favoritas:', error);        
      }
    );
  }
  enviarid(element : any): void {
    console.log(element.idfav);
    this.servicioService.deletefavs(element.idfav).subscribe(
      () => {
        console.log(`Noticia favorita con idfav ${element.idfav} eliminada con éxito.`);
        this.obtenerNoticiasFavoritas();
      },
      (error: any) => {
        console.error(`Error al eliminar la noticia favorita con idfav ${element.idfav}.`, error);
      }
    );

  
  }
  formatoFecha(noticias: any[]): any[] {
    return noticias.map(noticia => {      
      const [year, month, day] = noticia.publishedat;      
      noticia.publishedat = new Date(year, month - 1, day);      
      noticia.publishedat = noticia.publishedat.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const [updateYear, updateMonth, updateDay] = noticia.updatedat;    
      noticia.updatedat = new Date(updateYear, updateMonth - 1, updateDay);    
      noticia.updatedat = noticia.updatedat.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return noticia;
    
  });
  
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


}


