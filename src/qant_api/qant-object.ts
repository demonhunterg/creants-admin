import { QAntDataWrapper } from './qant-data-wrapper';
import { DataType } from './data-type.enum';
import { QAntDataSerializer } from './qant-data-serializer';
export class QAntObject {
  dataHolder = {};

  public toJson() {
    var jsonObj = {};
    for (var key in this.dataHolder) {
      var wrapper = this.dataHolder[key];
      if (wrapper.getType() == DataType.QANT_OBJECT) {
        jsonObj[key] = wrapper.getObject().toJson();
      } else if (wrapper.getType() == DataType.QANT_ARRAY) {
        jsonObj[key] = wrapper.getObject().toJson();
      } else if (wrapper.getType() == DataType.BYTE_ARRAY) {
        jsonObj[key] = wrapper.getObject();
      } else {
        jsonObj[key] = wrapper.getObject();
      }
    }

    return jsonObj;
  }

  public static newFromBinaryData(bytes) {
    return QAntDataSerializer.binary2object(bytes);
  }

  public putQAntArray(key, value) {
    this.putObj(key, value, DataType.QANT_ARRAY);
  }

  public newFromBinaryData(bytes) {
    return QAntDataSerializer.binary2object(bytes);
  }

  public getCmdAction() {
    return this.getValue("c");
  }

  public getTargetController() {
    return this.getValue("c");
  }

  public getValue(key) {
    var dataWrapper = this.get(key);
    if (dataWrapper == null) return;
    return dataWrapper["object"];
  }


  public putObj(key, value, dataType) {
    if (key == null) {
      console.log("[QANT_API]/////////////// key not null ///////////////");
      return;
    }

    if (key.length > 255) {
      console.log("[QANT_API]/////////////// keys must be less than 255 characters ///////////////");
      return;
    }

    if (value == null) {
      console.log("[QANT_API]/////////////// QAntObject requires a non-null value! If you need to add a null use the putNull() method. ///////////////");
      return;
    }

    if (value instanceof QAntDataWrapper) {
      this.dataHolder[key] = value;
    } else {
      this.dataHolder[key] = new QAntDataWrapper(dataType, value);
    }
  }

  public putBoolArray(key, value) {
    this.putObj(key, value, DataType.BOOL_ARRAY);
  }

  public putByte(key, value) {
    this.putObj(key, value, DataType.BYTE);
  }

  public putByteArray(key, value) {
    this.putObj(key, value, DataType.BYTE_ARRAY);
  }

  public putDouble(key, value) {
    this.putObj(key, value, DataType.DOUBLE);
  }

  public putInt(key, value) {
    this.putObj(key, value, DataType.INT);
  }

  public putNull(key, value) {
    this.dataHolder[key] = new QAntDataWrapper(DataType.NULL, null);
  }

  public putQAntObject(key, value) {
    this.putObj(key, value, DataType.QANT_OBJECT);
  }

  public putShort(key, value) {
    this.putObj(key, value, DataType.SHORT);
  }

  public putUtfString(key, value) {
    this.putObj(key, value, DataType.UTF_STRING);
  }

  public put(key, wrappedObject) {
    this.putObj(key, wrappedObject, null);
  }

  public get(key) {
    return this.dataHolder[key];
  }

  public toBinary() {
    return QAntDataSerializer.object2binary(this);
  }


  public getKeys() {
    return Object.keys(this.dataHolder);
  }

  public size() {
    var count = 0;
    for (var prop in this.dataHolder) {
      if (this.dataHolder.hasOwnProperty(prop)) {
        ++count;
      }
    }

    return count;
  }

}
