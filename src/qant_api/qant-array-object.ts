import { DataType } from './data-type.enum';
import { QAntDataWrapper } from './qant-data-wrapper';
export class QAntArrayObject {
  dataHolder = new Array();

  public size = function () {
    return this.dataHolder.length;
  }

  public add = function (wrappedObject) {
    this.dataHolder.push(wrappedObject);
  }

  public getValue = function (index) {
    return this.dataHolder[index]["object"];
  }

  public addQAntObject = function (value) {
    this.addObject(value, DataType.QANT_OBJECT);
  }

  public addObject = function (value, typeId) {
    this.dataHolder.push(new QAntDataWrapper(typeId, value));
  }


  public toJson = function () {
    var jsonObj = [];
    var obj;
    for (var i = 0; i < this.size(); i++) {
      var wrappedObject = this.dataHolder[i];
      if (wrappedObject.getType() == DataType.QANT_OBJECT) {
        obj = wrappedObject.getObject().toJson();
      } else if (wrappedObject.getType() == DataType.QANT_ARRAY) {
        obj = wrappedObject.getObject().toJson();
      } else if (wrappedObject.getType() == DataType.BYTE_ARRAY) {
        obj = wrappedObject.getObject();
      } else {
        obj = wrappedObject.getObject();
      }

      jsonObj.push(obj);
    }

    return jsonObj;
  }
}
