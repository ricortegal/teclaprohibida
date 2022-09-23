import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JuegoService } from '../services/juego-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  mensajeValidacion : string

  constructor(private _fb: FormBuilder,
              private _juegoService: JuegoService) {
                
    this.mensajeValidacion = "";
  }

  nuevoJugador: FormControl = this._fb.control( '', Validators.required )

  

  agregarJugador() {
    if (this.nuevoJugador.invalid)
      return;
    var anade = this._juegoService.addJugador(this.nuevoJugador.value);
    if(!anade)
    {
      this.mensajeValidacion = "ya existe el jugador"
    }
    else
    {
      this.nuevoJugador.reset();
      this.mensajeValidacion = "";
    }
  }


  guardar() {

  }

  
  borrar(jugador: string) {
    this._juegoService.removeJugador(jugador);
  }

  get puedoIniciar() : boolean {
    return this._juegoService.canInit();
  }

  get jugadores() : string[] {
    return this._juegoService.jugadores.map(j => j.nombre);
  }


  ngOnInit(): void {
  }

}
