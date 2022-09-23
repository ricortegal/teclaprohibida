import { Jugador } from "./jugador";

export interface JuegoContexto {
    jugadores : Jugador[];
    teclasProhibidas : string[];
    turnoJugador? : Jugador | null;
    turnoNumero: number;
}