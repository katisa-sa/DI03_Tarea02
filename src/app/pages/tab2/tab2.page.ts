import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { GestionNoticiasLeerService } from 'src/app/services/gestion-noticias-leer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];

  constructor(public gestionNoticiasLeer: GestionNoticiasLeerService) {
  }
  ngOnInit(){
    this.gestionNoticiasLeer.getNoticias().then(noticias => {
      this.listaNoticias = noticias;
    });
  }
  
  
}
