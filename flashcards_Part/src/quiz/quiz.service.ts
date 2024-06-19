import {Injectable} from '@nestjs/common';
import {QuizDto} from "./dto/quiz.dto";
import {Quiz} from "../entities/Quiz.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class QuizService {

    public constructor(
        @InjectRepository(Quiz)
        private readonly _quizRepository: Repository<Quiz>
    ) {
    }


    public async create(quizDto: QuizDto): Promise<Quiz> {
        return await this._quizRepository.save(quizDto);
    }

    public async getQuizById(quizId: string): Promise<Quiz> {
        return await this._quizRepository.findOne({
            where: {
                id: quizId,
            },
            relations: ['questions']
        });
    }

    public getUrlQuizPicture(idUser: string, photoName: string, idQuiz: string): string {
        return `http://localhost:3000/public/users/${idUser}/quizs/${idQuiz}/quiz-picture/${photoName}`;
    }

    public async getAllPublicQuizzes(): Promise<Quiz[]> {
        return await this._quizRepository.find({
            where: {
                visibility: 'Public'
            },
            relations: ['author']
        });
    }

    public async getPrivateQuizByAuthorId(authorId: string): Promise<Quiz[]> {
        return await this._quizRepository.find({
            where: {
                author: {
                    id: authorId
                },
                visibility: 'Private'
            },
            relations: ['author']
        });
    }

    public async initQuizPictures(quizs: any[]): Promise<Quiz[]> {
        return quizs.map(quiz => {
            quiz.image = this.getUrlQuizPicture(quiz.author.getId(), quiz.quizPicture, quiz.id);
            return quiz;
        });
    }

    public async deleteQuizById(quizId: string): Promise<any> {
        if (quizId !== undefined && quizId !== null) {
            const datas = await this._quizRepository.delete(quizId);
            return datas;
        }
    }
}
