import { Injectable } from '@nestjs/common';
import { Server, Namespace } from 'socket.io';

@Injectable()
export class SocketService {
  private userNamespaces: Map<number, Namespace> = new Map();

  createNamespace(userId: number, server: Server): Namespace {
    let userNamespace = this.userNamespaces.get(userId);
    if (!userNamespace) {
      userNamespace = server.of(`/${userId}`);
      this.userNamespaces.set(userId, userNamespace);
    }
    return userNamespace;
  }

  removeClientFromNamespaces(clientId: string): void {
    this.userNamespaces.forEach((namespace) => {
      namespace.sockets.delete(clientId);
    });
  }
}
