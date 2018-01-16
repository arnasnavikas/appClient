import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io-client';
import { environment } from '../environments/environment'
@Injectable()
export class SocketService {
  
  constructor() {}
  public connectSocket = () =>{
    const socket = SocketIo(environment.ip_address)
    socket.on('hello',(message)=>{
      console.log(message)
    })
 }
}
