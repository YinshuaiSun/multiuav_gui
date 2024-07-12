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
exports.ConfigMissionRequest = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
const flatbuffers = __importStar(require('flatbuffers'));
const nav_sat_fix_js_1 = require('../../fb/sensor-msgs/nav-sat-fix.cjs');
class ConfigMissionRequest {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsConfigMissionRequest(bb, obj) {
    return (obj || new ConfigMissionRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsConfigMissionRequest(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ConfigMissionRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  uavId(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  missionId(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  missionType() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  waypoint(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset
      ? (obj || new nav_sat_fix_js_1.NavSatFix()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4),
          this.bb
        )
      : null;
  }
  waypointLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  radius() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  maxVel() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  idleVel() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  }
  yaw(index) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  yawLength() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  yawArray() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset
      ? new Float32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  gimbalPitch(index) {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  gimbalPitchLength() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  gimbalPitchArray() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset
      ? new Float32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  speed(index) {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  speedLength() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  speedArray() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset
      ? new Float32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  yawMode() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  traceMode() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  gimbalPitchMode() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  finishAction() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  commandList(index) {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  commandListLength() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  commandListArray() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset
      ? new Float32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  commandParameter(index) {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.readFloat32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  commandParameterLength() {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  commandParameterArray() {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset
      ? new Float32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset),
          this.bb.__vector_len(this.bb_pos + offset)
        )
      : null;
  }
  static startConfigMissionRequest(builder) {
    builder.startObject(16);
  }
  static addUavId(builder, uavIdOffset) {
    builder.addFieldOffset(0, uavIdOffset, 0);
  }
  static addMissionId(builder, missionIdOffset) {
    builder.addFieldOffset(1, missionIdOffset, 0);
  }
  static addMissionType(builder, missionType) {
    builder.addFieldInt8(2, missionType, 0);
  }
  static addWaypoint(builder, waypointOffset) {
    builder.addFieldOffset(3, waypointOffset, 0);
  }
  static createWaypointVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startWaypointVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addRadius(builder, radius) {
    builder.addFieldFloat64(4, radius, 0.0);
  }
  static addMaxVel(builder, maxVel) {
    builder.addFieldFloat64(5, maxVel, 0.0);
  }
  static addIdleVel(builder, idleVel) {
    builder.addFieldFloat64(6, idleVel, 0.0);
  }
  static addYaw(builder, yawOffset) {
    builder.addFieldOffset(7, yawOffset, 0);
  }
  static createYawVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startYawVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addGimbalPitch(builder, gimbalPitchOffset) {
    builder.addFieldOffset(8, gimbalPitchOffset, 0);
  }
  static createGimbalPitchVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startGimbalPitchVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addSpeed(builder, speedOffset) {
    builder.addFieldOffset(9, speedOffset, 0);
  }
  static createSpeedVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startSpeedVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addYawMode(builder, yawMode) {
    builder.addFieldInt8(10, yawMode, 0);
  }
  static addTraceMode(builder, traceMode) {
    builder.addFieldInt8(11, traceMode, 0);
  }
  static addGimbalPitchMode(builder, gimbalPitchMode) {
    builder.addFieldInt8(12, gimbalPitchMode, 0);
  }
  static addFinishAction(builder, finishAction) {
    builder.addFieldInt8(13, finishAction, 0);
  }
  static addCommandList(builder, commandListOffset) {
    builder.addFieldOffset(14, commandListOffset, 0);
  }
  static createCommandListVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startCommandListVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addCommandParameter(builder, commandParameterOffset) {
    builder.addFieldOffset(15, commandParameterOffset, 0);
  }
  static createCommandParameterVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addFloat32(data[i]);
    }
    return builder.endVector();
  }
  static startCommandParameterVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endConfigMissionRequest(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createConfigMissionRequest(
    builder,
    uavIdOffset,
    missionIdOffset,
    missionType,
    waypointOffset,
    radius,
    maxVel,
    idleVel,
    yawOffset,
    gimbalPitchOffset,
    speedOffset,
    yawMode,
    traceMode,
    gimbalPitchMode,
    finishAction,
    commandListOffset,
    commandParameterOffset
  ) {
    ConfigMissionRequest.startConfigMissionRequest(builder);
    ConfigMissionRequest.addUavId(builder, uavIdOffset);
    ConfigMissionRequest.addMissionId(builder, missionIdOffset);
    ConfigMissionRequest.addMissionType(builder, missionType);
    ConfigMissionRequest.addWaypoint(builder, waypointOffset);
    ConfigMissionRequest.addRadius(builder, radius);
    ConfigMissionRequest.addMaxVel(builder, maxVel);
    ConfigMissionRequest.addIdleVel(builder, idleVel);
    ConfigMissionRequest.addYaw(builder, yawOffset);
    ConfigMissionRequest.addGimbalPitch(builder, gimbalPitchOffset);
    ConfigMissionRequest.addSpeed(builder, speedOffset);
    ConfigMissionRequest.addYawMode(builder, yawMode);
    ConfigMissionRequest.addTraceMode(builder, traceMode);
    ConfigMissionRequest.addGimbalPitchMode(builder, gimbalPitchMode);
    ConfigMissionRequest.addFinishAction(builder, finishAction);
    ConfigMissionRequest.addCommandList(builder, commandListOffset);
    ConfigMissionRequest.addCommandParameter(builder, commandParameterOffset);
    return ConfigMissionRequest.endConfigMissionRequest(builder);
  }
}
exports.ConfigMissionRequest = ConfigMissionRequest;
