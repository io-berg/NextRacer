interface DuelConnection {
  players: Player[];
  para: string;
  code: string;
}

interface Player {
  id: string;
  input: string;
}

export type { DuelConnection };
