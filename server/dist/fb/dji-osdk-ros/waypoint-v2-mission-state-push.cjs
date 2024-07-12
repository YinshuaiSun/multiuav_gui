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
exports.WaypointV2MissionStatePush = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
const flatbuffers = __importStar(require('flatbuffers'));
const msg_metadata_js_1 = require('../../fb/msg-metadata.cjs');
class WaypointV2MissionStatePush {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsWaypointV2MissionStatePush(bb, obj) {
    return (obj || new WaypointV2MissionStatePush()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsWaypointV2MissionStatePush(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new WaypointV2MissionStatePush()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  _Metadata(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset
      ? (obj || new msg_metadata_js_1.MsgMetadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  }
  commonDataVersion() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  commonDataLen() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
  }
  curWaypointIndex() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
  }
  state() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  velocity() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
  }
  static startWaypointV2MissionStatePush(builder) {
    builder.startObject(6);
  }
  static add_Metadata(builder, _MetadataOffset) {
    builder.addFieldOffset(0, _MetadataOffset, 0);
  }
  static addCommonDataVersion(builder, commonDataVersion) {
    builder.addFieldInt8(1, commonDataVersion, 0);
  }
  static addCommonDataLen(builder, commonDataLen) {
    builder.addFieldInt16(2, commonDataLen, 0);
  }
  static addCurWaypointIndex(builder, curWaypointIndex) {
    builder.addFieldInt16(3, curWaypointIndex, 0);
  }
  static addState(builder, state) {
    builder.addFieldInt8(4, state, 0);
  }
  static addVelocity(builder, velocity) {
    builder.addFieldInt16(5, velocity, 0);
  }
  static endWaypointV2MissionStatePush(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createWaypointV2MissionStatePush(
    builder,
    _MetadataOffset,
    commonDataVersion,
    commonDataLen,
    curWaypointIndex,
    state,
    velocity
  ) {
    WaypointV2MissionStatePush.startWaypointV2MissionStatePush(builder);
    WaypointV2MissionStatePush.add_Metadata(builder, _MetadataOffset);
    WaypointV2MissionStatePush.addCommonDataVersion(builder, commonDataVersion);
    WaypointV2MissionStatePush.addCommonDataLen(builder, commonDataLen);
    WaypointV2MissionStatePush.addCurWaypointIndex(builder, curWaypointIndex);
    WaypointV2MissionStatePush.addState(builder, state);
    WaypointV2MissionStatePush.addVelocity(builder, velocity);
    return WaypointV2MissionStatePush.endWaypointV2MissionStatePush(builder);
  }
}
exports.WaypointV2MissionStatePush = WaypointV2MissionStatePush;
