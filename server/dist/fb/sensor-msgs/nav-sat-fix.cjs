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
exports.NavSatFix = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
const flatbuffers = __importStar(require('flatbuffers'));
const msg_metadata_js_1 = require('../../fb/msg-metadata.cjs');
const nav_sat_status_js_1 = require('../../fb/sensor-msgs/nav-sat-status.cjs');
const header_js_1 = require('../../fb/std-msgs/header.cjs');
class NavSatFix {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsNavSatFix(bb, obj) {
    return (obj || new NavSatFix()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsNavSatFix(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new NavSatFix()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  _Metadata(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset
      ? (obj || new msg_metadata_js_1.MsgMetadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  }
  header(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new header_js_1.Header()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  status(obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset
      ? (obj || new nav_sat_status_js_1.NavSatStatus()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  }
  latitude() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  longitude() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  altitude() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  positionCovariance(index) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readFloat64(this.bb.__vector(this.bb_pos + offset) + index * 8) : 0;
  }
  positionCovarianceLength() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  positionCovarianceArray() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset
      ? new Float64Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  positionCovarianceType() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  static startNavSatFix(builder) {
    builder.startObject(8);
  }
  static add_Metadata(builder, _MetadataOffset) {
    builder.addFieldOffset(0, _MetadataOffset, 0);
  }
  static addHeader(builder, headerOffset) {
    builder.addFieldOffset(1, headerOffset, 0);
  }
  static addStatus(builder, statusOffset) {
    builder.addFieldOffset(2, statusOffset, 0);
  }
  static addLatitude(builder, latitude) {
    builder.addFieldFloat64(3, latitude, 0.0);
  }
  static addLongitude(builder, longitude) {
    builder.addFieldFloat64(4, longitude, 0.0);
  }
  static addAltitude(builder, altitude) {
    builder.addFieldFloat64(5, altitude, 0.0);
  }
  static addPositionCovariance(builder, positionCovarianceOffset) {
    builder.addFieldOffset(6, positionCovarianceOffset, 0);
  }
  static createPositionCovarianceVector(builder, data) {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat64(data[i]);
    }
    return builder.endVector();
  }
  static startPositionCovarianceVector(builder, numElems) {
    builder.startVector(8, numElems, 8);
  }
  static addPositionCovarianceType(builder, positionCovarianceType) {
    builder.addFieldInt8(7, positionCovarianceType, 0);
  }
  static endNavSatFix(builder) {
    const offset = builder.endObject();
    builder.requiredField(offset, 6); // header
    builder.requiredField(offset, 8); // status
    builder.requiredField(offset, 16); // position_covariance
    return offset;
  }
}
exports.NavSatFix = NavSatFix;
