export class QAntRoom {
  private id;
  private name;
  private groupId;
  private isGame:number;
  private isHidden:boolean;

  public constructor(id, name, groupId) {
    this.id = id;
    this.name = name;
    this.groupId = groupId;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getGroupId() {
    return this.groupId;
  }

}
