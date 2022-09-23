import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego-service';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.css']
})
export class ListaJugadoresComponent implements OnInit {

  constructor(private _juegoService : JuegoService) { 
    
  }

  get jugadores() {
    return this._juegoService.jugadores.map(j => j.nombre);
  }

  ngOnInit(): void {
    
  }

}
