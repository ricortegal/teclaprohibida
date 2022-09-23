import { AfterContentInit, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements AfterViewInit {

  private _document: Document


  constructor( @Inject(DOCUMENT) document: Document ) { 
    this._document = document;
  }


  ngAfterViewInit(): void {
    document.addEventListener("keypress", (ev:KeyboardEvent) => teclaPulsada(ev))
  }



}
function teclaPulsada(key: KeyboardEvent) {
  console.log(key);
}

