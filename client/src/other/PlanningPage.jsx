import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import YAML from 'yaml';

import {
  Paper,
  IconButton,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Toolbar,
  Divider,
  Tab,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';

import { sessionActions } from '../store';

import MapView from '../Mapview/MapView';
import { Navbar } from '../components/Navbar';
import { Menu } from '../components/Menu';
import MapMissions from '../Mapview/MapMissions';
import SelectField from '../common/components/SelectField';
import palette from '../common/palette';
import BaseList from '../components/BaseList';
import BaseSettings from '../components/BaseSettings';
import { RosControl } from '../components/RosControl';
import { MissionController } from '../components/MissionController';
import MissionElevation from '../components/MissionElevation';
import MapMarkersCreate from '../Mapview/draw/MapMarkersCreate';
import MapScale from '../Mapview/MapScale';
import ElementList from '../components/ElementList';
import { useEffectAsync, useCatch } from '../reactHelper';
import SelectList from '../components/SelectList';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0',
    height: '100vh',
  },
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: '88px',
    height: 'calc(100% - 95px)',
    width: '560px',
    margin: '0px',
    zIndex: 3,
  },
  middleStyle: {
    flex: 1,
    display: 'grid',
  },
  panelElevation: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: 0,
    bottom: 0,
    height: '30vh',
    width: 'calc(100% - 560px)',
    margin: '0px',
    zIndex: 3,
  },
  toolbar: {
    display: 'flex',
    gap: '10px 10px',
    height: '30px',
    borderBottom: '3px solid rgb(212, 212, 212)',
  },
  list: {
    maxHeight: 'calc(100vh - 152px)',
    overflowY: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  fileInput: {
    display: 'none',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));
const showToast = (type, description) => {
  console.log(type + description);
};

const PlanningPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTitles, setShowTitles] = useState(true);
  const [showLines, setShowLines] = useState(false);
  const [moveMarkers, SetMoveMarkers] = useState(false);
  const [SelectMarkers, SetSelectMarkers] = useState(false);
  const [CreateMarkers, SetCreateMarkers] = useState(false);
  const [requestPlanning, SetRequestPlanning] = useState(100);

  const sessionmarkers = useSelector((state) => state.session.markers);
  const sessionplanning = useSelector((state) => state.session.planning);

  const [markers, setMarkers] = useState(sessionmarkers);
  const [SendTask, setSendTask] = useState(sessionplanning);
  const [tabValue, setTabValue] = useState('2');
  const [settings, setsettings] = useState('');
  const [notification, setnotification] = useState('');

  const SendPlanning = useCatch(async () => {
    let auxsendtask = {};
    auxsendtask.id = SendTask.id;
    auxsendtask.name = SendTask.name;
    //auxsendtask.settings = SendTask.bases;
    auxsendtask.objetivo = SendTask.objetivo.id;
    auxsendtask.bases = markers.bases;
    auxsendtask.meteo = SendTask.meteo;
    let auxloc = SendTask.loc.map((gruop) => {
      let items = gruop.items.map((element) => ({
        latitude: element.latitude,
        longitude: element.longitude,
      }));
      return { name: gruop.name, items: items };
    });

    auxsendtask.loc = auxloc;

    let listDevices = SendTask.bases.map((setting) => setting.devices.deviceId);
    let deviceRepeat = false;
    listDevices.map((id, index) => {
      listDevices.map((id1, index1) => {
        if (index !== index1) {
          if (id == id1) {
            deviceRepeat = true;
          }
        }
      });
    });
    if (deviceRepeat) {
      setnotification('the device is repeated please change');
      return null;
    } else {
      setnotification('');
    }

    let devices = [];
    const response = await fetch('/api/devices');

    if (response.ok) {
      devices = await response.json();
    } else {
      throw Error(await response.text());
    }
    console.log(devices);
    console.log(SendTask.bases);

    auxsendtask.settings = SendTask.bases.map((setting) => {
      let mysetting = JSON.parse(JSON.stringify(setting));
      let mydevice = devices.find((device) => device.id == setting.devices.deviceId);
      console.log(mydevice);
      mysetting.devices['category'] = mydevice.category;
      return mysetting;
    });

    console.log(auxsendtask);

    const response1 = await fetch('http://192.168.1.180:8004/mission_request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auxsendtask),
    });
    if (response1.ok) {
      const response2 = await response1.json();
      console.log(response2);
      console.log('real planning OK');
      SetRequestPlanning(0);
    } else {
      console.log('real planning OK');
    }
  });
  const DeleteMission = () => {
    console.log('uno');
  };
  const SavePlanning = (value) => {
    console.log('save mission');
    let fileData = YAML.stringify(value);
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = value.name + '.yaml';
    link.href = url;
    link.click();
  };
  const readFile = (e) => {
    //https://www.youtube.com/watch?v=K3SshoCXC2g
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      let auxsendtask = YAML.parse(fileReader.result);
      console.log(auxsendtask);
      console.log(file.name);
      setMarkers((oldmarkers) => ({ ...oldmarkers, bases: auxsendtask.markersbase }));

      if (auxsendtask.hasOwnProperty('markersbase')) {
        delete auxsendtask.markersbase;
      }
      setSendTask(auxsendtask);
    };
    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };

  const setDefaultPlanning = async (value) => {
    const response1 = await fetch('api/planning/setDefault', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    if (response1.ok) {
      const response2 = await response1.json();
      console.log(response2);
      console.log('real planning OK');
      SetRequestPlanning(0);
    } else {
      console.log('real planning OK');
    }
  };
  const setBaseSettings = (element) => {
    setSendTask({ ...SendTask, bases: element });
  };
  const TabHandleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    newTabValue == 2 || newTabValue == 1 ? setShowTitles(true) : setShowTitles(false);
    newTabValue == 1 ? setShowLines(true) : setShowLines(false);
    newTabValue == 1 ? SetMoveMarkers(true) : SetMoveMarkers(false);
  };

  const setMarkersBase = (value, meta = {}) => {
    setMarkers({ ...markers, bases: value });
    if (meta.hasOwnProperty('meth')) {
      if (meta.meth == 'add') {
        setSendTask((oldSendtask) => {
          let auxbases = JSON.parse(JSON.stringify(oldSendtask.bases));
          let auxconfig = {};
          Object.keys(settings).map((key) => {
            auxconfig[key] = {};
          });
          Object.keys(settings.devices).map((key) => {
            auxconfig['devices'][key] = settings['devices'][key].default;
          });
          Object.keys(settings.mission).map((key) => {
            auxconfig['mission'][key] = settings['mission'][key].default;
          });
          auxbases.push(auxconfig);
          return { ...oldSendtask, bases: auxbases };
        });
      }
      if (meta.meth == 'del') {
        setSendTask((oldSendtask) => {
          let auxbases = JSON.parse(JSON.stringify(oldSendtask.bases));
          auxbases.split(meta.index, 1);
          return { ...oldSendtask, bases: auxbases };
        });
      }
    }
  };
  const setMarkersElements = (value) => {
    setMarkers({ ...markers, elements: value });
  };
  const SetMapMarkers = (value) => {
    setMarkers(value);
  };
  const setLocations = (value) => {
    setSendTask({ ...SendTask, loc: value });
  };
  const managepoints = (old, point, objetivo) => {
    if (objetivo == 'path-object') {
      if (old.length == 0) {
        old.push({ type: 'powerTower', name: 'Elements', linea: true, items: [point] });
      } else {
        const samerute = old.find((element) => element.items[0].groupId == point.groupId);
        if (samerute === undefined) {
          old.push({ type: 'powerTower', name: 'Elements', linea: true, items: [point] });
        } else {
          old[+old.length - +1].items.push(point);
        }
      }
    }
    if (objetivo == 'object') {
      old.push({ type: 'powerTower', name: 'Elements', linea: true, items: [point] });
    }
    if (objetivo == 'point') {
      old.push({ type: 'powerTower', name: 'Elements', linea: true, items: [point] });
    }

    return old;
  };
  const addLocations = (value) => {
    console.log(value);
    setSendTask((oldSendtask) => {
      let auxloc = JSON.parse(JSON.stringify(oldSendtask.loc));
      console.log(oldSendtask.objetivo.type);
      return { ...oldSendtask, loc: managepoints(auxloc, value, oldSendtask.objetivo.type) };
    });
  };
  const updateObjetive = (newObjetive) => {
    setSendTask((oldSendtask) => {
      let auxSendtask = JSON.parse(JSON.stringify(oldSendtask));
      auxSendtask.objetivo = newObjetive;
      if (newObjetive.type !== oldSendtask.objetivo.type) {
        auxSendtask.loc = [];
      }
      return auxSendtask;
    });
  };

  useEffectAsync(async () => {
    const response = await fetch(`/api/planning/missionparam/${SendTask.objetivo.id}`);
    if (response.ok) {
      const jsonresponse = await response.json();
      console.log(jsonresponse);
      setsettings(jsonresponse);
    } else {
      throw Error(await response.text());
    }
  }, [SendTask.objetivo]);

  useEffect(() => {
    console.log('effect settings');
    console.log(settings);
    if (settings.hasOwnProperty('mission')) {
      if (SendTask.bases.length == 0) {
        let config = [];
        markers.bases.forEach((element) => {
          let auxconfig = {};
          Object.keys(settings).map((key) => {
            auxconfig[key] = {};
          });
          Object.keys(settings.devices).map((key) => {
            auxconfig['devices'][key] = settings['devices'][key].default;
          });
          Object.keys(settings.mission).map((key) => {
            auxconfig['mission'][key] = settings['mission'][key].default;
          });

          config.push(auxconfig);
        });
        setSendTask((SendTaskold) => {
          let auxSendtask = JSON.parse(JSON.stringify(SendTaskold));
          auxSendtask.bases = config;
          auxSendtask.settings = settings;
          return auxSendtask;
        });
      } else {
        setSendTask({ ...SendTask, settings: settings });
      }
    }
  }, [settings]);

  useEffect(() => {
    tabValue == 2 && SendTask.objetivo.id != 3 ? SetSelectMarkers(true) : SetSelectMarkers(false);
    tabValue == 2 && SendTask.objetivo.id == 3 ? SetCreateMarkers(true) : SetCreateMarkers(false);
  }, [tabValue, SendTask.objetivo]);

  useEffect(() => {
    setMarkers(sessionmarkers);
  }, [sessionmarkers]);

  useEffect(() => {
    setSendTask(sessionplanning);
  }, [sessionplanning]);

  useEffect(() => {
    dispatch(sessionActions.updateMarker(markers));
  }, [markers]);

  useEffect(() => {
    dispatch(sessionActions.updatePlanning(SendTask));
  }, [SendTask]);

  useEffect(() => {
    const intervalPlannig = setInterval(() => {
      console.log('response Planning');
      SetRequestPlanning((old) => {
        return old + 1;
      });
    }, 5000);

    const fetchData = async () => {
      const response1 = await fetch(`http://192.168.1.180:8004/get_plan?IDs=${SendTask.id}`);
      if (response1.ok) {
        let response2 = await response1.json();
        console.log(response2);
        console.log('response to check planning');
        //clearInterval(intervalPlannig);
      } else {
        console.log('check planning OK');
      }
    };
    if (requestPlanning < 4) {
      fetchData();
      //setCounter(counter + 1);
    } else {
      // Stop further requests if the counter reaches 3
      clearInterval(intervalPlannig);
    }

    return () => clearInterval(intervalPlannig);
  }, [requestPlanning]);

  return (
    <div className={classes.root}>
      <MissionController>
        <RosControl notification={showToast}>
          <Navbar />
          <Menu />
          <div
            style={{
              float: 'right',
              width: 'calc(100% - 560px)',
              height: 'calc(70vh - 95px)',
              right: '0px',
              margin: 'auto',
            }}
          >
            <MapView>
              <MapMissions />
              <MapMarkersCreate
                markers={markers}
                selectMarkers={SendTask.loc}
                showTitles={showTitles}
                showLines={showLines}
                moveMarkers={moveMarkers}
                setMarkers={SetMapMarkers}
                SelectItems={SelectMarkers}
                CreateItems={CreateMarkers}
                setLocations={addLocations}
              />
            </MapView>
            <MapScale />
          </div>

          <div className={classes.sidebarStyle}>
            <div className={classes.middleStyle}>
              <Paper square>
                <Toolbar className={classes.toolbar}>
                  <IconButton edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Planning mission
                  </Typography>

                  <IconButton
                    onClick={() => {
                      SavePlanning({
                        ...SendTask,
                        markersbase: markers.bases,
                        elements: markers.elements,
                      });
                    }}
                  >
                    <SaveAltIcon />
                  </IconButton>
                  <IconButton onClick={DeleteMission}>
                    <DeleteIcon />
                  </IconButton>
                  <label htmlFor="upload-gpx">
                    <input
                      accept=".yaml, .plan, .waypoint, .kml"
                      id="upload-gpx"
                      type="file"
                      className={classes.fileInput}
                      onChange={readFile}
                    />
                    <IconButton edge="end" component="span" onClick={() => {}}>
                      <UploadFileIcon />
                    </IconButton>
                  </label>
                </Toolbar>
                <div className={classes.list}>
                  <Box
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexDirection: 'column',
                      margin: '20px',
                    }}
                  >
                    <TabContext value={tabValue}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={TabHandleChange} aria-label="lab API tabs example">
                          <Tab label="Elements" value="1" />
                          <Tab label="Planning" value="2" />
                          <Tab label="Settings" value="3" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <div className={classes.details}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography>Base elements</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                              <BaseList markers={markers.bases} setMarkers={setMarkersBase} />
                            </AccordionDetails>
                          </Accordion>
                          <Divider />
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography>Interest Elements</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                              <ElementList
                                markers={markers.elements}
                                setMarkers={setMarkersElements}
                              />
                            </AccordionDetails>
                          </Accordion>
                          <Box textAlign="center">
                            <Button
                              variant="contained"
                              size="large"
                              sx={{ width: '80%', flexShrink: 0 }}
                              style={{ marginTop: '15px' }}
                              onClick={SendPlanning}
                            >
                              Save Global Markers
                            </Button>
                          </Box>
                        </div>
                      </TabPanel>
                      <TabPanel value="2">
                        <Box className={classes.details}>
                          <TextField
                            required
                            fullWidth
                            label="id"
                            type="number"
                            variant="standard"
                            value={SendTask.id ? SendTask.id : 123}
                            onChange={(event) =>
                              setSendTask({ ...SendTask, id: event.target.value })
                            }
                          />
                          <TextField
                            required
                            fullWidth
                            label="Name Mission"
                            variant="standard"
                            value={SendTask.name ? SendTask.name : ' '}
                            onChange={(event) =>
                              setSendTask({ ...SendTask, name: event.target.value })
                            }
                          />
                          <SelectField
                            emptyValue={null}
                            fullWidth={true}
                            label={'objetive'}
                            value={SendTask.objetivo.id}
                            endpoint={'/api/planning/missionstype'}
                            keyGetter={(it) => it.id}
                            titleGetter={(it) => it.name}
                            onChange={(e, items) => {
                              updateObjetive(items[e.target.value]);
                            }}
                            getItems={(it) => {
                              console.log(it);

                              setSendTask({ ...SendTask, objetivo: it });
                            }}
                          />

                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography>Points to inspect </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                              <div className={classes.details}>
                                {SendTask.objetivo.hasOwnProperty('description') ? (
                                  <Typography>{SendTask.objetivo.description}</Typography>
                                ) : (
                                  <Typography>select doing click in the map</Typography>
                                )}
                                <SelectList Data={SendTask.loc} setData={setLocations} />
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          <Divider />
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography>Meteo</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                              <TextField
                                required
                                fullWidth
                                label="wind speed"
                                type="number"
                                variant="standard"
                                value={12}
                              />
                              <TextField
                                required
                                fullWidth
                                label="Wind direction"
                                type="number"
                                variant="standard"
                                value={12}
                              />
                              <TextField
                                required
                                fullWidth
                                label="Temperature"
                                type="number"
                                variant="standard"
                                value={12}
                              />
                              <TextField
                                required
                                fullWidth
                                label="Humidity"
                                type="number"
                                variant="standard"
                                value={12}
                              />
                              <TextField
                                required
                                fullWidth
                                label="Pressure"
                                type="number"
                                variant="standard"
                                value={12}
                              />
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </TabPanel>
                      <TabPanel value="3">
                        <div className={classes.details}>
                          <BaseSettings
                            data={SendTask.bases}
                            param={SendTask.settings}
                            setData={setBaseSettings}
                          />

                          <Box textAlign="center">
                            <Button
                              variant="contained"
                              size="large"
                              sx={{ width: '80%', flexShrink: 0 }}
                              style={{ marginTop: '15px' }}
                              onClick={SendPlanning}
                            >
                              Plannig
                            </Button>
                            <Button
                              variant="contained"
                              size="large"
                              sx={{ width: '80%', flexShrink: 0 }}
                              style={{ marginTop: '15px' }}
                              onClick={() =>
                                setDefaultPlanning({
                                  ...SendTask,
                                  markersbase: markers.bases,
                                  elements: markers.elements,
                                })
                              }
                            >
                              Save Global Settings
                            </Button>
                          </Box>
                          <Typography>{notification}</Typography>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </Paper>
            </div>
          </div>
          <div className={classes.panelElevation}>
            <div className={classes.middleStyle}>
              <Paper square>
                <MissionElevation />
              </Paper>
            </div>
          </div>
        </RosControl>
      </MissionController>
    </div>
  );
};

export default PlanningPage;
