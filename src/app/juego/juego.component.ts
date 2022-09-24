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
  private _muestraSegundos : boolean;
  private _segundos : number;
  private _tecla : string;
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
    this._muestraSegundos = false;
    this._tecla = '';
    this._segundos = 0;
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
        this.teclaPulsada(ev);
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


  teclaPulsada(key: KeyboardEvent) {
    if(!this.juegoService.jugando) {
      console.log("no se ha iniciado el juego o se ha terminado");
      return;
    }
    if(this._muestraTecla) {
      console.log("juego detenido, mostrando teclas");
      return;
    }
    if(this.juegoService.intento(key)) {
      console.log("fin del juego")
    }
    else {
      this._muestraTecla = true;
      this._tecla = key.key;
      this._suscriptionTemporizador =  this._temporizadorObservable$.subscribe(this._temporizadorObservador);
    }
  
  }


  private finalizaVisibilidadTecla() {
    this._muestraTecla = false;
    this._segundos = 0;
    this._jugador = this.juegoService.turno();
    this._proximoJugador = this.juegoService.proximoJugador;
    console.log(this.jugadorActual);
    console.log(this.proximoJugador);
    console.log(this.juegoService.teclasProhibidas);
    if(this._suscriptionTemporizador)
      this._suscriptionTemporizador.unsubscribe();
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
  


}


