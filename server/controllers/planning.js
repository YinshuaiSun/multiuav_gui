import { planningModel } from '../models/planning.js';

export class planningController {
  static async getTypes(req, res) {
    const response = await planningModel.getTypes();
    res.json(response);
  }
  static async getParam(req, res) {
    const response = await planningModel.getParam(req.params.type);
    res.json(response);
  }
  static async getMissionTypes(req, res) {
    const response = await planningModel.getMissionTypes();
    res.json(response);
  }
  static async getMissionTypes(req, res) {
    const response = await planningModel.getMissionTypes();
    res.json(response);
  }
  static async getDefault(req, res) {
    let response = await planningModel.getDefault();
    res.json(response);
  }

  static async setDefault(req, res) {
    let response = await planningModel.setDefault(req.body);
    res.json(response);
  }

  static async setMarkers(req, res) {
    let response = await planningModel.setMarkers(req.body);
    res.json(response);
  }
  static async getBases(req, res) {
    let response = await planningModel.getBases(req.params);
    res.json(response);
  }
  static async getElements(req, res) {
    let response = await planningModel.getElements(req.params);
    res.json(response);
  }
}
