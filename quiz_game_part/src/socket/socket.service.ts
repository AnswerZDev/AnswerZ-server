import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {

    constructor(private readonly _httpClient: HttpService){}
    
    async getUserInfos(token : string): Promise<any> {
        try {
            const response = await this._httpClient.axiosRef.get("http://localhost:3000/user/me", {
                headers:{
                    Authorization : `Bearer ${token}`            
                }
            });

            const jsonData = {
                "uid": response.data.id
            };

            return jsonData;
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            throw error;
        }
    }
}
