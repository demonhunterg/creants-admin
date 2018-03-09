import { QAntObject } from './qant-object';
import { DataType } from './data-type.enum';
import { QAntDataWrapper } from './qant-data-wrapper';
import { DataStream } from './data-stream';
import { QAntArrayObject } from './qant-array-object';
export class QAntDataSerializer {
  public static hello() {
    console.log("hello..........");
  }

  public static obj2bin(qAntObject, dataStream) {
    var keys = qAntObject.getKeys();
    for (var index in  keys) {
      var key = keys[index];
      var wrapper = qAntObject.get(key);
      var dataObj = wrapper.getObject();
      this.encodeQAntObjectKey(dataStream, key);
      this.encodeObject(dataStream, wrapper.getType(), dataObj);
    }

    return dataStream.getBytes();
  }

  public static binary2object(data) {
    if (data.length < 3) {
      console.log("[QANT2X_API] [ERROR] Can't decode an CASObject. Byte data is insufficient. Size: " + data.length + " bytes");
      return null;
    }
    var dataStream = new DataStream(data.length, data);
    return this.decodeQAntObject(dataStream);
  }

  public static decodeQAntObject(buffer) {
    var dataType = buffer.readByte();
    if (dataType != DataType.QANT_OBJECT) {
      console.log("[QANT2X_API] [ERROR] Invalid CASDataType. Expected: " + DataType.QANT_OBJECT
        + ", found: " + dataType);
      return null;
    }

    return this.decodeQAntObjectNotCheckType(buffer);
  }

  public static decodeQAntObjectNotCheckType(buffer) {
    var obj = new QAntObject();
    var size = buffer.readShort();
    if (size < 0) {
      console.log("[QANT2X_API] [ERROR] Can't decode QAntObject. Size is negative = " + size);
      return null;
    }

    for (var i = 0; i < size; ++i) {
      var keySize = buffer.readShort();
      if (keySize < 0 || keySize > 255) {
        console.log("[QANT2X_API] [ERROR] Invalid CASObject key length. Found = " + keySize);
        return null;
      }

      var keyData = buffer.readBytesWithLength(keySize);
      var key = String.fromCharCode.apply(String, keyData);
      var decodedObject = this.decodeObject(buffer);
      if (decodedObject == null) {
        console.log("[QANT2X_API] [ERROR] Could not decode value for key:  " + key);
        return null;
      }
      obj.put(key, decodedObject);
    }

    return obj;
  }

  public static bytes2String(bytes) {
    return String.fromCharCode.apply(String, bytes);
  }

  public static decodeObject(buffer) {
    var decodedObject;
    var dataType = buffer.readByte();
    if (dataType == DataType.NULL) {
      decodedObject = this.binDecode_NULL(buffer);
    } else if (dataType == DataType.BOOL) {
      decodedObject = this.binDecode_BOOL(buffer);
    } else if (dataType == DataType.UTF_STRING) {
      decodedObject = this.binDecode_UTF_STRING(buffer);
    } else if (dataType == DataType.LONG) {
      decodedObject = this.binDecode_LONG(buffer);
    } else if (dataType == DataType.INT) {
      decodedObject = this.binDecode_INT(buffer);
    } else if (dataType == DataType.FLOAT) {
      decodedObject = this.binDecode_FLOAT(buffer);
    }else if (dataType == DataType.DOUBLE) {
      decodedObject = this.binDecode_DOUBLE(buffer);
    } else if (dataType == DataType.SHORT) {
      decodedObject = this.binDecode_SHORT(buffer);
    } else if (dataType == DataType.BYTE) {
      decodedObject = this.binDecode_BYTE(buffer);
    } else if (dataType == DataType.BYTE_ARRAY) {
      decodedObject = this.binDecode_BYTE_ARRAY(buffer);
    } else if (dataType == DataType.SHORT_ARRAY) {
      decodedObject = this.binDecode_SHORT_ARRAY(buffer);
    } else if (dataType == DataType.INT_ARRAY) {
      decodedObject = this.binDecode_INT_ARRAY(buffer);
    }else if (dataType == DataType.LONG_ARRAY) {
      decodedObject = this.binDecode_LONG_ARRAY(buffer);
    } else if (dataType == DataType.UTF_STRING_ARRAY) {
      decodedObject = this.binDecode_UTF_STRING_ARRAY(buffer);
    } else if (dataType == DataType.QANT_ARRAY) {
      if (dataType != DataType.QANT_ARRAY) {
        console.log("Can not decode array with QAntDataType ID:" + dataType);
        return null;
      }

      decodedObject = new QAntDataWrapper(DataType.QANT_ARRAY, this.decodeQAntArrayNotCheckType(buffer));
    } else {
      if (dataType != DataType.QANT_OBJECT) {
        console.log("Unknow QAntDataType ID:" + dataType);
        return null;
      }
      //ko dich trai 1 byte de kiem tra kieu
      decodedObject = new QAntDataWrapper(DataType.QANT_OBJECT, this.decodeQAntObjectNotCheckType(buffer));
    }

    return decodedObject;
  }

  public static binDecode_FLOAT(buffer) {
    return new QAntDataWrapper(DataType.FLOAT, buffer.readFloat());
  }

  public static binDecode_DOUBLE(buffer) {
    return new QAntDataWrapper(DataType.DOUBLE, buffer.readDouble());
  }

  public static binDecode_NULL(buffer) {
    return new QAntDataWrapper(DataType.NULL, null);
  }

  public static binDecode_BOOL(buffer) {
    return new QAntDataWrapper(DataType.BOOL, buffer.readByte() === 1);
  }

  public static binDecode_UTF_STRING_ARRAY(buffer) {
    var arraySize = buffer.readShort();
    if (arraySize < 0) {
      console.log("Error decoding typed array size. binDecode_UTF_STRING_ARRAY Negative size: " + arraySize);
      return null;
    }

    var array = new Array();
    for (var j = 0; j < arraySize; ++j) {
      var stringValue = this.binDecode_UTF_STRING(buffer);
      array.push(stringValue);
    }
    return new QAntDataWrapper(DataType.UTF_STRING_ARRAY, array);
  }

  public static binDecode_SHORT_ARRAY(buffer) {
    var arraySize = buffer.readShort();
    if (arraySize < 0) {
      console.log("Error decoding typed array size. binDecode_SHORT_ARRAY Negative size: " + arraySize);
      return null;
    }

    var array = new Array();
    for (var j = 0; j < arraySize; ++j) {
      var intValue = buffer.readShort();
      array.push(intValue);
    }
    return new QAntDataWrapper(DataType.SHORT_ARRAY, array);
  }

  public static binDecode_INT_ARRAY(buffer) {
    var arraySize = buffer.readShort();
    if (arraySize < 0) {
      console.log("Error decoding typed array size. binDecode_INT_ARRAY Negative size: " + arraySize);
      return null;
    }

    var array = new Array();
    for (var j = 0; j < arraySize; ++j) {
      var intValue = buffer.readInt();
      array.push(intValue);
    }
    return new QAntDataWrapper(DataType.INT_ARRAY, array);
  }

  public static binDecode_LONG_ARRAY(buffer) {
    var arraySize = buffer.readShort();
    if (arraySize < 0) {
      console.log("Error decoding typed array size. binDecode_INT_ARRAY Negative size: " + arraySize);
      return null;
    }

    var array = new Array();
    for (var j = 0; j < arraySize; ++j) {
      var longValue = buffer.readLong();
      array.push(longValue);
    }
    return new QAntDataWrapper(DataType.LONG_ARRAY, array);
  }

  public static binDecode_BYTE_ARRAY(buffer) {
    var arraySize = buffer.readInt();
    if (arraySize < 0) {
      console.log("Error decoding typed array size. Negative size: " + arraySize);
      return null;
    }

    var byteData = buffer.readBytesWithLength(arraySize);
    return new QAntDataWrapper(DataType.BYTE_ARRAY, byteData);
  }

  public static decodeQAntArrayNotCheckType(buffer) {
    var size = buffer.readShort();
    if (size < 0) {
      console.log("[QANT2X_API] [ERROR] Can't decode QAntArrayObject. Size is negative = " + size);
      return null;
    }

    var qAntArray = new QAntArrayObject();
    for (var i = 0; i < size; ++i) {
      var decodedObject = this.decodeObject(buffer);
      if (decodedObject == null) {
        console.log("Could not decode QAntSArray item at index: " + i);
        return null;
      }

      qAntArray.add(decodedObject);
    }

    return qAntArray;
  }

  public static binDecode_BYTE(buffer) {
    return new QAntDataWrapper(DataType.BYTE, buffer.readByte());
  }

  public static binDecode_SHORT(buffer) {
    return new QAntDataWrapper(DataType.SHORT, buffer.readShort());
  }

  public static binDecode_INT(buffer) {
    return new QAntDataWrapper(DataType.INT, buffer.readInt());
  }


  public static binDecode_LONG(buffer) {
    return new QAntDataWrapper(DataType.LONG, buffer.readLong());
  }

  public static binDecode_UTF_STRING(buffer) {
    var strLen = buffer.readShort();
    if (strLen < 0) {
      console.log("[QANT2X_API] [ERROR] Error decoding UtfString. Negative size: " + strLen);
      return null;
    }

    var strData = buffer.readBytesWithLength(strLen);
    //var s = TextDecoder("utf-8").decode(strData);
    //console.log(s);
    return new QAntDataWrapper(DataType.UTF_STRING, this.stringFromUTF8Array(strData));
  }

  private static stringFromUTF8Array(data) {
    const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
    var count = data.length;
    var str = "";

    for (var index = 0; index < count;) {
      var ch = data[index++];
      if (ch & 0x80) {
        var extra = extraByteMap[(ch >> 3) & 0x07];
        if (!(ch & 0x40) || !extra || ((index + extra) > count))
          return null;

        ch = ch & (0x3F >> extra);
        for (; extra > 0; extra -= 1) {
          var chx = data[index++];
          if ((chx & 0xC0) != 0x80)
            return null;

          ch = (ch << 6) | (chx & 0x3F);
        }
      }

      str += String.fromCharCode(ch);
    }

    return str;
  }

  private static bin2string(array) {
    var result = "";
    for (var i = 0; i < array.length; ++i) {
      result += (String.fromCharCode(array[i]));
    }
    return result;
  }

  public static encodeQAntObjectKey(dataStream, value) {
    dataStream.writeShort(value.length);
    dataStream.writeBytes(this.string2Bin(value));
  }

  public static encodeObject(dataStream, dataType, object) {
    switch (dataType) {
      case DataType.NULL:
        break;
      case DataType.BYTE:
        this.binEncode_BYTE(dataStream, object);
        break;
      case DataType.BOOL:
        this.binEncode_BOOL(dataStream, object);
        break;

      case DataType.SHORT:
        this.binEncode_SHORT(dataStream, object);
        break;

      case DataType.INT:
        this.binEncode_INT(dataStream, object);
        break;
      case DataType.UTF_STRING:
        this.binEncode_UTF_STRING(dataStream, object);
        break;
      case DataType.LONG:
        console.log("************** NOT SUPPORT LONG TYPE *********************")
        break;
      case DataType.BYTE_ARRAY:
        this.binEncode_BYTE_ARRAY(dataStream, object);
        break;
      case DataType.INT_ARRAY:
        this.binEncode_INT_ARRAY(dataStream, object);
        break;

      case DataType.UTF_STRING_ARRAY:
        this.binEncode_UTF_STRING_ARRAY(dataStream, object);
        break;

      case DataType.QANT_ARRAY:
        this.addData(dataStream, this.array2binary(object));
        break;
      case DataType.QANT_OBJECT:
        this.addData(dataStream, this.object2binary(object));
        break;


    }
  }

  public static binEncode_UTF_STRING_ARRAY(dataStream, value) {

  }

  public static binEncode_INT_ARRAY(dataStream, value) {
    dataStream.writeByte(DataType.INT_ARRAY);
    dataStream.writeShort(value.length);
    for (var i = 0; i < value.length; i++) {
      dataStream.writeInt(value[i]);
    }
  }

  public static binEncode_BYTE_ARRAY(dataStream, value) {
    dataStream.writeByte(DataType.BYTE_ARRAY);
    dataStream.writeInt(value.length);
    dataStream.writeBytes(value);
  }

  public static array2binary(qAntArrayObject) {
    console.log("************ array2binary ***********");
    var dataStream = new DataStream(null, null);
    dataStream.writeByte(DataType.QANT_ARRAY);
    dataStream.writeShort(qAntArrayObject.size());
    return this.arr2bin(qAntArrayObject, dataStream);
  }

  public static arr2bin(qAntArrayObject, dataStream) {
    for (var i = 0; i < qAntArrayObject.size(); i++) {
      var wrapper = qAntArrayObject.get(i);
      this.encodeObject(dataStream, wrapper.getType(), wrapper.getObject());
    }

    return dataStream.getBytes();

  }

  public static object2binary(qAntObject) {
    var dataStream = new DataStream(null, null);
    dataStream.writeByte(DataType.QANT_OBJECT);
    dataStream.writeShort(qAntObject.size());
    return this.obj2bin(qAntObject, dataStream);
  }

  public static binEncode_BYTE(dataStream, value) {
    dataStream.writeByte(DataType.BYTE);
    dataStream.writeByte(value);
  }

  public static binEncode_BOOL(dataStream, value) {
    dataStream.writeByte(DataType.BOOL);
    dataStream.writeByte(value == true ? 1 : 0);
  }

  public static binEncode_SHORT(dataStream, value) {
    dataStream.writeByte(DataType.SHORT);
    dataStream.writeShort(value);
  }

  public static addData(dataStream, newData) {
    dataStream.writeBytes(newData);
  }

  public static binEncode_INT(dataStream, value) {
    dataStream.writeByte(DataType.INT);
    dataStream.writeInt(value);
  }


  public static binEncode_UTF_STRING(dataStream, value) {
    dataStream.writeByte(DataType.UTF_STRING);
    dataStream.writeShort(value.length);
    dataStream.writeBytes(this.string2Bin(value));
  }


  public static string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }
    return result;
  }
}
