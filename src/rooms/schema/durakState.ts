import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

export class Card extends Schema {
  @type("string")
  color: string;

  @type("string")
  number: string;

  @type("string")
  owner: string;

  @type("string")
  name: string;
}

export class Player extends Schema {
  @type("string")
  name: string;

  @type("string")
  id: string;

  @type([Card])
  cards = new ArraySchema<Card>();
}

export class DurakState extends Schema {
  @type("boolean")
  gameStarted: Boolean = false;

  @type("int16")
  cardsPerPlayer: Number = 6;

  @type("int16")
  stackCount: Number = 52;

  @type("string")
  lastDurak: string = undefined;

  @type("string")
  attacker: string;

  @type("string")
  defender: string;

  @type(Card)
  trump: Card;

  @type({map: Player})
  players = new MapSchema<Player>();

  @type({map: Player})
  playerBackup = new MapSchema<Player>();

  @type([Card])
  stack = new ArraySchema<Card>();

  @type("string")
  tableCards: string = JSON.stringify([[]]); 

  @type(["string"])
  errorMessages = new ArraySchema<string>();

  @type(["string"])
  successMessages = new ArraySchema<string>();
}
