'use strict';
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, '__esModule', { value: true });
exports.Point = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require('flatbuffers');
var msg_metadata_js_1 = require('../../fb/msg-metadata.cjs');
var Point = /** @class */ (function () {
  function Point() {
    this.bb = null;
    this.bb_pos = 0;
  }
  Point.prototype.__init = function (i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  };
  Point.getRootAsPoint = function (bb, obj) {
    return (obj || new Point()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  };
  Point.getSizePrefixedRootAsPoint = function (bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Point()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  };
  Point.prototype._Metadata = function (obj) {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset
      ? (obj || new msg_metadata_js_1.MsgMetadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  };
  Point.prototype.x = function () {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  };
  Point.prototype.y = function () {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  };
  Point.prototype.z = function () {
    var offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
  };
  Point.startPoint = function (builder) {
    builder.startObject(4);
  };
  Point.add_Metadata = function (builder, _MetadataOffset) {
    builder.addFieldOffset(0, _MetadataOffset, 0);
  };
  Point.addX = function (builder, x) {
    builder.addFieldFloat64(1, x, 0.0);
  };
  Point.addY = function (builder, y) {
    builder.addFieldFloat64(2, y, 0.0);
  };
  Point.addZ = function (builder, z) {
    builder.addFieldFloat64(3, z, 0.0);
  };
  Point.endPoint = function (builder) {
    var offset = builder.endObject();
    return offset;
  };
  Point.createPoint = function (builder, _MetadataOffset, x, y, z) {
    Point.startPoint(builder);
    Point.add_Metadata(builder, _MetadataOffset);
    Point.addX(builder, x);
    Point.addY(builder, y);
    Point.addZ(builder, z);
    return Point.endPoint(builder);
  };
  return Point;
})();
exports.Point = Point;
