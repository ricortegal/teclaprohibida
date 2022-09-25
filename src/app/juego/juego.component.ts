import { AfterContentInit, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { JuegoService } from '../services/juego-service';
import { Jugador } from '../model/jugador';
import { delay, Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements AfterViewInit {

  private _document : Document
  private _jugador : Jugador;
  private _proximoJugador : Jugador;  
  private _muestraTecla : boolean;
  private _segundos : number;
  private _tecla : string;
  private _otraPartida : boolean;
  private _muestraFinPartida : boolean;
  private _encontradaTeclaProhibida: boolean;
  private _temporizadorObservable$ : Observable<number>;
  private _temporizadorObservador : Observer<number>;
  private _suscriptionTemporizador? : Subscription;


  constructor( @Inject(DOCUMENT) document: Document,
                private juegoService : JuegoService
  ) { 
    this._document = document;
    this._jugador = this.juegoService.turno();
    this._proximoJugador = this.juegoService.proximoJugador;
    this._muestraTecla = false;
    this._tecla = '';
    this._segundos = 1;
    this._muestraFinPartida = false;
    this._otraPartida = false;
    this._encontradaTeclaProhibida = false;
    this._temporizadorObservable$ = interval(1000);
    this._temporizadorObservador = {
        next: value => {
          this._segundos++;
          if(this._segundos == 5)
          this.finalizaVisibilidadTecla();
        },
        complete: () => this.finalizaVisibilidadTecla(),
        error: () => console.log("error en temporizador")
    }
  }


  ngAfterViewInit(): void {
    document.addEventListener("keypress", (ev:KeyboardEvent) => {
      if(this.juegoService.jugando)
        this.pulsarTecla(ev);
    })
    this.iniciaJuego();
  }


  iniciaJuego() : void {
    if(!this.juegoService.jugando) {
      this.juegoService.iniciaJuego();
    }
  }


  get jugango() : boolean {
    return this.juegoService.jugando;
  }


  get jugadores() : Jugador[] {
    return this.juegoService.jugadores;
  }


  get proximoJugador() : Jugador {
    return this._proximoJugador;
  }
  
  
  get jugadorActual() : Jugador {
    return this._jugador;
  }


  get otraPartida() : boolean {
    return this._otraPartida;
  }


  pulsarTecla(key: KeyboardEvent) {
    if (!this.juegoService.jugando) {
      console.log("no se ha iniciado el juego o se ha terminado");
      return;
    }
    if (this._muestraTecla) {
      console.log("juego detenido, mostrando teclas");
      return;
    }
    this._encontradaTeclaProhibida = this.juegoService.intento(key);
    this._muestraTecla = true;
    this._tecla = key.key;
    this._suscriptionTemporizador = this._temporizadorObservable$.subscribe(this._temporizadorObservador);

  }


  iniciaPartida() : void {
    this._document.body.style.backgroundColor = "#FFF";
    this._encontradaTeclaProhibida = false;
    this._muestraFinPartida = false;
    this._otraPartida = false;
    this.juegoService.iniciaJuego();
    this._jugador = this.juegoService.turno();
    this._proximoJugador = this.juegoService.proximoJugador;
  }


  private tratarTeclaProhibida() {
    this._document.body.style.backgroundColor = "#F00";
    this.finalizaPartida();
  }


  private finalizaVisibilidadTecla() : void {
    this._muestraTecla = false;
    this._segundos = 1;
    this._jugador = this.juegoService.turno();
    this._proximoJugador = this.juegoService.proximoJugador;
    console.log(this.jugadorActual);
    console.log(this.proximoJugador);
    console.log(this.juegoService.teclasProhibidas);
    if(this._encontradaTeclaProhibida)
      this.tratarTeclaProhibida();
    if(this._suscriptionTemporizador)
      this._suscriptionTemporizador.unsubscribe();
  }


  private finalizaPartida() : void {
    if(this.juegoService.jugando) {
      throw new Error("No se puede finalizar la partida no se ha resuelto la tecla prohibida");
    }
    this._muestraFinPartida = true;
    this._otraPartida = true;
    this._jugador.puntuacion = 0;
  }

  get muestraFinPartida() {
    return this._muestraFinPartida;
  }

  get muestraTecla() : boolean {
    return this._muestraTecla;
  }


  get tecla() : string {
    return this._tecla;
  }
  

  get segundos() : number {
    return this._segundos;
  }
  

  get teclasProhibidas() : string {
    let teclas = this.juegoService.teclasProhibidas.map(tp => tp.key);
    return teclas.join(", ");
  }


}


