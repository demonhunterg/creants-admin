export class QAntDataWrapper {
  type;
  object;

  constructor(type, object) {
    this.type = type;
    this.object = object;
  }

  public getType() {
    return this.type;
  }

  public getTypeName() {
    return "getTypeName";
  }

  public getObject() {
    return this.object;
  }

}
