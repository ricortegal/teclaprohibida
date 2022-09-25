import { Injectable } from '@angular/core';
import { JuegoContexto } from '../model/juego-contexto';
import { Jugador } from '../model/jugador';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private _juegoContext: JuegoContexto
  private _teclaPulsada: KeyboardEvent

  constructor() {
    this._juegoContext = {
      jugadores : [],
      teclasProhibidas : [],
      turnoJugador : null,
      turnoNumero : 0,
      ronda : 0
    }
    this._teclaPulsada = new KeyboardEvent(' ');
  }


  addJugador(nombre: string) : boolean {
    let jugador = this._juegoContext.jugadores.find(j => j.nombre === nombre)
    if(jugador != undefined && jugador != null)
      return false;
    this._juegoContext.jugadores.push(
     {
       nombre: nombre,
       puntuacion:0,
       puntuacionTotal:0
     });
     return true;
  }


  removeJugador(nombre: string){
    let jugador = this._juegoContext.jugadores.find(j => j.nombre === nombre)
    if(jugador == undefined || jugador == null)
      return;
    var index = this._juegoContext.jugadores.indexOf(jugador);
    this._juegoContext.jugadores.splice(index,1);
  }


  iniciaJuego() {
    this._juegoContext.turnoNumero = 0;
    this._juegoContext.ronda = 1;
    this._juegoContext.teclasProhibidas = [];
  }


  finalizaJuego() {
    this._juegoContext.ronda = 0;
    this._juegoContext.jugadores.forEach( j => {
      j.puntuacionTotal += j.puntuacion
      j.puntuacion = 0; 
    })
  }


  canInit() : boolean {
    return this._juegoContext.jugadores.length > 1
  }


  turno() : Jugador {
    if(this._juegoContext.turnoNumero < this._juegoContext.jugadores.length) {
      this._juegoContext.turnoJugador = this._juegoContext.jugadores[this._juegoContext.turnoNumero]
    }
    else {
      this._juegoContext.ronda ++;
      this._juegoContext.turnoJugador = this._juegoContext.jugadores[0]
      this._juegoContext.turnoNumero = 0;
    }
    return this._juegoContext.turnoJugador
  }


  puntuaJugador(jugador: string | Jugador, puntuacion: number): number {
    let jugadorRef: Jugador | undefined;
    if (typeof jugador == "object") {
      jugadorRef = this._juegoContext.jugadores.find(j => j.nombre == jugador.nombre)
    } else {
      jugadorRef = this._juegoContext.jugadores.find(j => j.nombre == jugador)
    }
    if (jugadorRef == undefined)
      return -1;
    jugadorRef.puntuacion = puntuacion;
    return jugadorRef.puntuacion;
  }


  intento(tecla: KeyboardEvent) : boolean{
    if(this._juegoContext.turnoJugador == null)
      throw new Error("turno no iniciado");
    if(this._juegoContext.teclasProhibidas.find( t => t.code == tecla.code ) == undefined) {
      this._teclaPulsada = tecla;
      this._juegoContext.teclasProhibidas.push(tecla);
      this._juegoContext.turnoJugador.puntuacion += this._juegoContext.teclasProhibidas.length;
      this._juegoContext.turnoNumero ++;
      return false;
    } else {
      //this.finalizaJuego()
      return true;
    }
  }


  get proximoJugador() : Jugador {
    if(this._juegoContext.turnoNumero + 1 < this._juegoContext.jugadores.length) {
      return this._juegoContext.jugadores[this._juegoContext.turnoNumero + 1];
    } else {
      return this._juegoContext.jugadores[0];
    }
  }


  get jugando() {
    return this.ronda > 0;
  }


  get ronda() {
    return this._juegoContext.ronda;
  }


  get jugadores() {
    return [...this._juegoContext.jugadores];
  }


  get teclasProhibidas() {
    return [...this._juegoContext.teclasProhibidas];
  }


  get teclaPulsada() : string {
    return this._teclaPulsada.key;
  }


  get teclaPulsadaCode() : string {
    return this._teclaPulsada.code;
  }

}
