import { Injectable } from '@angular/core';
import { JuegoContexto } from '../model/juego-contexto';
import { Jugador } from '../model/jugador';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private _juegoContext: JuegoContexto
  private _jugadores: Jugador[]

  constructor() {
    this._jugadores = [];
    this._juegoContext = {
      jugadores: this._jugadores,
      teclasProhibidas: [],
      turnoJugador: null,
      turnoNumero: 0
    }
  }


  addJugador(nombre: string) : boolean {
    let jugador = this._jugadores.find(j => j.nombre === nombre)
    if(jugador != undefined && jugador != null)
      return false;
    this._jugadores.push(
     {
       nombre: nombre,
       puntuacion:0
     });
     return true;
  }


  removeJugador(nombre: string){
    let jugador = this._jugadores.find(j => j.nombre === nombre)
    if(jugador == undefined || jugador == null)
      return;
    var index = this._jugadores.indexOf(jugador);
    this._jugadores.splice(index,1);
  }


  iniciaJuego() {
    this._juegoContext.turnoNumero = 1;
    this._juegoContext.teclasProhibidas
  }


  puntuaJugador(jugador: string | Jugador, puntuacion: number): number {
    let jugadorRef: Jugador | undefined;
    if (typeof jugador == "object") {
      jugadorRef = this._jugadores.find(j => j.nombre == jugador.nombre)
    } else {
      jugadorRef = this._jugadores.find(j => j.nombre == jugador)
    }
    if (jugadorRef == undefined)
      return -1;
    jugadorRef.puntuacion = puntuacion;
    return jugadorRef.puntuacion;
  }


  canInit() : boolean {
    return this._jugadores.length > 0
  }


  get jugadores() {
    return [...this._jugadores];
  }


}
