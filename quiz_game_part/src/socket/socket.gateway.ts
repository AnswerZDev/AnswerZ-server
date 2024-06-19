import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {RoomService} from '../rooms/room.service';
import {Answer, Game} from 'src/Models/Game';
import {Question} from "../Models/Question";

@WebSocketGateway({cors: true})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    actualQuestionIndex: number = 0;

    constructor(
        private readonly roomService: RoomService,
    ) {
    }

    handleConnection(client: Socket) {
        console.log('Client connecté :', client.id);

        this.server.to(client.id).emit("connected");

        client.on('give-user-infos', (arg) => {
            const roomId = this.isClientAlreadyInRooms(arg.uid);

            if (roomId != null) {
                this.roomService.joinRoom(roomId, client);
                this.server.to(client.id).emit("already-in-room", roomId);
            }
        });

        client.on('getRoomInfo', (roomId: string, userUid: string) => {
            const roomInfo = this.roomService.getRoomInfo(roomId);
            if (roomInfo) {
                client.emit('roomInfo', roomInfo);
            }
        });

        client.on('create-game', async (roomId: string, user: { uid: string }, questionsData: any[]) => {
            if (user) {
                const questions: Question[] = this.initQuestions(questionsData);
                let game = new Game(user.uid, questions);
                this.roomService.createRoom(roomId, client, game, user.uid);
                this.server.emit('roomCreated', roomId);
            }
        });

        client.on('join-game', (roomId: string, user: { uid: string }) => {
            console.log(user);
            this.roomService.joinRoom(roomId, client, user.uid);
            this.server.emit('joined-game', roomId);
            this.server.to(roomId).emit('userJoined');
        });

        client.on('leave-game', (roomId: string, user: { uid: string }) => {
            const roomHost = this.roomService.rooms.get(roomId).game.host;

            if (user.uid === roomHost) {
                this.server.to(roomId).emit("host-leave");
                this.server.socketsLeave(roomId);
                this.roomService.leaveRoom(roomId, client);
            } else {
                client.leave(roomId);
                this.roomService.leaveRoom(roomId, client);
            }
        });

        client.on('ask-question', (arg) => {
            const question = this.roomService.getQuestion(arg, this.actualQuestionIndex);

            this.server.to(client.id).emit('next-question', question);
        })


        client.on('response-answer', (arg) => {
            const room = this.roomService.rooms.get(arg.roomId);

            const answer: Answer = room.game.answers.find((answer) => {
                return answer.question === arg.question;
            });

            Object.values(arg.answers).forEach((answerSelected: string) => {
                answer.answers[answerSelected.toString()] += 1;
            });
            this.server.to(client.id).emit('question-stats', {
                question: arg.question,
                answers: answer.answers
            });
        });


        client.on('start-game', async (roomId: string) => {
            this.roomService.setGameStateToPlay(roomId);
            this.server.to(roomId).emit('game-started');

            const nbrQuestions = this.roomService.getNumberOfQuestions(roomId);

            for (this.actualQuestionIndex; this.actualQuestionIndex <= nbrQuestions - 1; this.actualQuestionIndex++) {
                await this.askQuestionAndShowStats(roomId, this.actualQuestionIndex);
            }

            this.server.to(roomId).emit('game-ended');
        });

    }

    async askQuestionAndShowStats(roomId: string, questionNumber: number) {
        const question = this.roomService.getQuestion(roomId, questionNumber);
        const questionTotal = this.roomService.getNumberOfQuestions(roomId);

        this.server.to(roomId).emit('next-question', question);

        this.server.to(roomId).emit('question-infos', {questionNumber, questionTotal});


        await new Promise<void>(resolve => {
            setTimeout(() => {
                this.server.to(roomId).emit('ask-answer', question);
                resolve();
            }, 30000);
        });

        await new Promise<void>(resolve => {
            setTimeout(() => {
                const room = this.roomService.rooms.get(roomId);
                if (room) {
                    if (room.game) {
                        const answer = room.game.answers.find((a: Answer) => a.question === question.question);
                        this.server.to(roomId).emit('question-stats', {
                            question: question.question,
                            answers: answer.answers
                        });
                        resolve();
                    }
                }
            }, 5000);
        });
    }

    handleDisconnect(client: Socket) {
        console.log("user disconnected");

    }

    isClientAlreadyInRooms(userUid: string): string {
        return this.roomService.isClientAlreadyInRoom(userUid);
    }

    private initQuestions(questions: any[]): Question[] {
        return questions.map((question) => {
            return {
                question: question._description,
                answers: question._choices.split(","),
            };
        }) as unknown as Question[]
    }
}
