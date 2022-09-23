import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { RegistroComponent } from './registro/registro.component';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';

const routes: Routes = [
  {
    path: 'juego', component: JuegoComponent
  }, 
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'jugadores', component: ListaJugadoresComponent
  },
  {
    path: '**', component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
