export class DataStream {
  buffer:ArrayBuffer;
  dataView:DataView;
  position:number;
  byteLength:number;

  public constructor(bufferLength, byteArray) {
    if (bufferLength == null)
      bufferLength = 3072;

    this.buffer = new ArrayBuffer(bufferLength);
    this.dataView = new DataView(this.buffer);
    this.position = 0;
    this.byteLength = 0;

    if (byteArray != null) {
      for (var i = 0; i < byteArray.length; i++) {
        this.dataView.setInt8(this.position, byteArray[i]);
        this.position += 1;
        this.byteLength += 1;
      }
      this.position = 0;
    }
  }

  public writeInt(value) {
    this.dataView.setInt32(this.position, value);
    this.position += 4;
    this.byteLength += 4;
  }

  public writeByte(value) {
    this.dataView.setInt8(this.position, value);
    this.position += 1;
    this.byteLength += 1;
  }

  public writeByteAt(index, value) {
    this.dataView.setInt8(index, value);
    this.position += 1;
    this.byteLength += 1;
  }

  public writeUByte(value) {
    this.dataView.setUint8(this.position, value);
    this.position += 1;
    this.byteLength += 1;
  }

  public writeShort(value) {
    this.dataView.setInt16(this.position, value);
    this.position += 2;
    this.byteLength += 2;
  }

  public writeString(s, length) {
    if (length != null) {
      var i = 0;
      var len = Math.min(s.length, length);
      for (i = 0; i < len; i++) {
        this.writeUByte(s.charCodeAt(i));
      }
      for (; i < length; i++) {
        this.writeUByte(0);
      }
    } else {
      for (var i = 0; i < s.length; i++) {
        this.writeUByte(s.charCodeAt(i));
      }
    }
  }

  public writeUTF(s:String) {
    this.writeShort(s.length);
    this.writeString(s, s.length);
  }

  public writeUint8Array(arr) {
    this.memcpy(this.buffer, this.position, arr.buffer, 0, arr.byteLength);
    this.mapUint8Array(arr.length);
  }

  public writeUint16(v) {
    this.dataView.setUint16(this.position, v);
    this.position += 2;
    this.byteLength += 2;
  }

  public mapUint8Array(length) {
    var arr = new Uint8Array(this.buffer, this.position, length);
    this.position += length * 1;
    return arr;
  }

  public memcpy(dst, dstOffset, src, srcOffset, byteLength) {
    var dstU8 = new Uint8Array(dst, dstOffset, byteLength);
    var srcU8 = new Uint8Array(src, srcOffset, byteLength);
    dstU8.set(srcU8);
  }

  public writeBytes(bytes) {
    for (var i = 0; i < bytes.length; i++) {
      this.writeByte(bytes[i]);
    }
  }

  public getBytes() {
    return new Uint8Array(this.buffer, 0, this.byteLength);
  }

  //lấy tất cả byte còn lại
  public readBytes() {
    var uint8Array = new Uint8Array(this.buffer, this.position, this.byteLength);
    this.byteLength = 0;
    return uint8Array;
  }

  public readBytesWithLength(length) {
    var uint8Array = new Uint8Array(this.buffer, this.position, length);
    this.byteLength -= length;
    this.position += length;
    return uint8Array;
  }

  public readShort() {
    var v = this.dataView.getInt16(this.position);
    this.position += 2;
    this.byteLength -= 2;
    return v;
  }


  private ua2Text(ua) {
    var s = '';
    for (var i = 0; i < ua.length; i++) {
      s += String.fromCharCode(ua[i]);
    }
    return s;
  }

  public readInt() {
    var v = this.dataView.getInt32(this.position);
    this.position += 4;
    this.byteLength -= 4;
    return v;
  }

  public readByte() {
    var v = this.dataView.getInt8(this.position);
    this.position += 1;
    this.byteLength -= 1;
    return v;
  }

  public readLong() {
    var data = new Uint8Array(this.buffer, this.position, 8);
    var value = "";
    var positive = true;

    if ((data[0] & 0x80) > 0) {
      positive = false;
    }
    for (var i = 0; i < 8; i++) {
      if (positive) {
        value += ("0" + data[i].toString(16)).substr(-2, 2);
      } else {
        value += ("0" + (data[i] ^ 0xFF).toString(16)).substr(-2, 2);
      }

    }
    this.position += 8;
    this.byteLength -= 8;

    if (positive) {
      return parseInt(value, 16);
    } else {
      return -parseInt(value, 16) - 1;
    }
  }

  public readFloat() {
    var v = this.dataView.getFloat32(this.position);
    this.position += 4;
    this.byteLength -= 4;
    return v;
  }

  public readDouble() {
    var v = this.dataView.getFloat64(this.position);
    this.position += 8;
    this.byteLength -= 8;
    return v;
  }

  public readBoolean() {
    return this.readByte() == 1;
  }
}
