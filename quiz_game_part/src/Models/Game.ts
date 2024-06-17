import { Question } from "./Question";

export class Game {
    private gameId: string;
    private maxPlayers: number;
    nOfActualPlayers : number = 0;
    private players: Map<string, any>;
    host: string;
    actualQuestionIndex : number = 0;
    isLaunch: boolean = false;
    questions: Question[] = [
        { question: 'En quelle année a eu lieu la 1ère Guerre mondiale ?', answers: ['39-45', '13-16', '14-18', 'test'] },
        { question: 'testQuestion2',answers: ['39-43', 'test', '14-18', 'test'] }
    ];
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
