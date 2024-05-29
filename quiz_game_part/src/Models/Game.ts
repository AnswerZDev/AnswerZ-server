
export class Game {
    private gameId: string;
    private maxPlayers: number;
    nOfActualPlayers : number = 0;
    private players: Map<string, any>;
    private host: string;
    private questions = [];
    private description = "Accenderat super his incitatum propositum ad nocendum aliqua mulier vilis, quae ad palatium ut poposcerat intromissa insidias ei latenter obtendi prodiderat a militibus obscurissimis. quam Constantina exultans ut in tuto iam locata mariti salute muneratam vehiculoque inpositam per regiae ianuas emisit in publicum, ut his inlecebris alios quoque ad indicanda proliceret paria vel maiora.";
    private image = "assets/images/game-picture.jpeg";
    private title = "John doe's game";

    constructor(host, { maxPlayers = 5 }: { maxPlayers?: number } = {}) {
        this.host = host
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
