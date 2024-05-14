
export class Game {
    private gameId: string;
    private maxPlayers: number;
    private players: Map<string, any>;

    constructor({ maxPlayers = 5 }: { maxPlayers?: number } = {}) {
        this.maxPlayers = maxPlayers;
    }

    join(playerId: string): boolean {
        if (this.players.size < this.maxPlayers) {
            this.players.set(playerId, playerId);
            return true;
        }
        return false;
    }

    leave(playerId: string): void {
        this.players.delete(playerId);
    }
}
