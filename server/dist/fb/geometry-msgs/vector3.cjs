'use strict';
// automatically generated by the FlatBuffers compiler, do not modify
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Vector3 = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
const flatbuffers = __importStar(require('flatbuffers'));
const msg_metadata_js_1 = require('../../fb/msg-metadata.cjs');
class Vector3 {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsVector3(bb, obj) {
    return (obj || new Vector3()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsVector3(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Vector3()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  _Metadata(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset
      ? (obj || new msg_metadata_js_1.MsgMetadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  }
  x() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  y() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  z() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  static startVector3(builder) {
    builder.startObject(4);
  }
  static add_Metadata(builder, _MetadataOffset) {
    builder.addFieldOffset(0, _MetadataOffset, 0);
  }
  static addX(builder, x) {
    builder.addFieldFloat64(1, x, 0.0);
  }
  static addY(builder, y) {
    builder.addFieldFloat64(2, y, 0.0);
  }
  static addZ(builder, z) {
    builder.addFieldFloat64(3, z, 0.0);
  }
  static endVector3(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createVector3(builder, _MetadataOffset, x, y, z) {
    Vector3.startVector3(builder);
    Vector3.add_Metadata(builder, _MetadataOffset);
    Vector3.addX(builder, x);
    Vector3.addY(builder, y);
    Vector3.addZ(builder, z);
    return Vector3.endVector3(builder);
  }
}
exports.Vector3 = Vector3;
