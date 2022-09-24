import { Jugador } from "./jugador";

export interface JuegoContexto {
    jugadores : Jugador[];
    teclasProhibidas : KeyboardEvent[];
    turnoJugador? : Jugador | null;
    turnoNumero: number;
    ronda: number;
}