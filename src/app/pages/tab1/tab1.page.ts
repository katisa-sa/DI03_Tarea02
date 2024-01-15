
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { GestionStorageService } from 'src/app/services/gestion-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Declaramos y creamos el array de noticias vacío
  listaNoticias: Article[] = [];
  valor:string = "general";

  //Añadimos HttpClient y los servicios en el constructor
  constructor(private leerArticulosFicheroHttp: HttpClient, public gestionNoticiasLeerService: GestionNoticiasLeerService,private gestionAlmacenNoticias: GestionStorageService) {
 
    this.consultaGetCategoria(this.valor);
  }


  // Comprueba si la noticia seleccionada (checked) está para leer o no
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeerService.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false;   
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia del array
  public checkNoticia(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeerService.addNoticias(item);
    } else {
      this.gestionNoticiasLeerService.borrarNoticia(item);
    }    
  }

  public cambiarCategoria(evento: any){
    const valor = evento.detail.value;
    console.log (valor);
    this.listaNoticias = [];
    this.consultaGetCategoria(valor);
  }

  private consultaGetCategoria(valor: string) {
    // Declaramos el observable y lo inicializamos con una consulta GET
    let url = "https://newsapi.org/v2/top-headlines?category="+valor+"&apiKey=95f72f17192c44e5861827c824a05dce";
    let observableRest: Observable<RespuestaNoticias> = this.leerArticulosFicheroHttp.get<RespuestaNoticias>(url);
    // Nos suscribimos al observable y cuando recibimos datos los mostramos por consola
    observableRest.subscribe( datos => {
      console.log(datos);
      this.listaNoticias.push(...datos.articles);
      this.gestionAlmacenNoticias.setObject("noticias",this.listaNoticias);
    });    
  }
  
}
