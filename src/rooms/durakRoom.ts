import { Room, Client } from "colyseus";
import { DurakState, Player } from "./schema/durakState";
import { startGame } from "../startGame";
import { playCard } from "../playCard";
import { takeCardBack } from "../takeCardBack";
import { won } from "../won";
import { defended } from "../defended";

export class DurakRoom extends Room {
  onCreate(options: any) {
    this.setState(new DurakState());

    this.onMessage("startGame", (options, cardCount) => {
      this.state.cardsPerPlayer = +cardCount
      startGame(this.state);
    });

    this.onMessage("playCard", (options, data) => {
      playCard(this.state, data);
    });

    this.onMessage("takeCardBack", (options, data) => {
      takeCardBack(this.state, data);
    });

    this.onMessage("won", () => {
      won(this.state);
    });
    this.onMessage("defended", () => {
      defended(this.state);
    });
  }

  onAuth() {
    if (this.state.gameStarted) throw new Error("Game already started.");
    else return true;
  }

  onJoin(client: Client, options: any) {
    const player = new Player({ name: options.playerName, id: client.id });
    this.state.players.set(client.id, player);
  }

  async onLeave(client: Client, consented: boolean) {
    try {
      if (consented) {
        throw new Error("consented leave");
      }
      await this.allowReconnection(client, 10);
    } catch (e) {
      this.state.players.delete(client.id);
    }
  }

  onDispose() {}
}
