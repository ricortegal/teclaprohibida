
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { JuegoComponent } from './juego/juego.component';
import { RegistroComponent } from './registro/registro.component';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  declarations: [
    AppComponent,
    JuegoComponent,
    RegistroComponent,
    ListaJugadoresComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

 }
