import { QAntRoom } from './qant-room';
export class QAntUser {
  private id:number;
  private fullName:String;
  private avatar:String;
  private token:String;
  private lastRoom:QAntRoom;

  public constructor(id, fullName, avatar) {
    this.id = id;
    this.fullName = fullName;
    this.avatar = avatar;
  }

  public setToken(token) {
    this.token = token;
  }

  public joinRoom(room) {
    this.lastRoom = room;
  }

  public leaveRoom() {
    this.lastRoom = null;
  }

  public getId() {
    return this.id;
  }

  public getFullName() {
    return this.fullName;
  }

  public getLastRoom() {
    return this.lastRoom;
  }

  public setLastRoom(lastRoom:QAntRoom) {
    this.lastRoom = lastRoom;
  }

  public getToken() {
    return this.token;
  }

}
