import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from './juego/juego.component';
import { RegistroComponent } from './registro/registro.component';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JuegoService } from './services/juego-service';




@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    RegistroComponent,
    ListaJugadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ JuegoService ],
  bootstrap: [AppComponent]
})

export class AppModule {

 }
