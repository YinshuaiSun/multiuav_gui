import React, { useState, useContext} from 'react'
import "./Navbar.css"
import { map } from '../Mapview/Mapview.js'
import { RosContext } from './RosControl'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';

export const Navbar = ({SetAddUAVOpen}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    const element = document.getElementsByName("otrotest");
    console.log(element)
    for(let i=0;i<element.length;i++){
      element[i].setAttribute("class", 'mytest');      
    }

    
    setTimeout(() => {
      console.log("1 Segundo esperado")
      for(let i=0;i<element.length;i++){
        element[i].setAttribute("class", "dropdown-content");
      }
    }, 500);
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
  const rosContex = useContext(RosContext);

  const [myValue, setMyValue] = useState('');

  const readFile = ( e ) => {
    //https://www.youtube.com/watch?v=K3SshoCXC2g
    const file = e.target.files[0];
    if ( !file ) return;

    const fileReader = new FileReader();
    fileReader.readAsText( file );
    fileReader.onload = () => {
      console.log( fileReader.result );
      console.log( file.name );
      setMyValue( fileReader.result );
      rosContex.openMision(file.name,fileReader.result)
    }
    fileReader.onerror = () => {
      console.log( fileReader.error );
    }
  }

  function sethome(){
    map.easeTo({
      center: [-6.0025, 37.412],
      zoom: Math.max(map.getZoom(), 5),
      offset: [0, -1 / 2],
    });
  }
  
  function openAddUav(){
    SetAddUAVOpen(true);
  }
  

  return (
    <AppBar position="static" style={{backgroundColor:"#333",height:"52px"}}>
      <Container maxWidth="x">
      <Toolbar disableGutters>
      <Typography
            variant="h6"
            noWrap
            component="a"
            //href="/"
            onClick={sethome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Management Tool
          </Typography>

      <div className="dropdown">
        <button className="dropbtn" >Ros </button>
        <div name="otrotest" className="dropdown-content"  >
          <a id="rosConnectNavbar" onClick={()=>{rosContex.rosConnect();handleClick()}}>Connect Rosbridge Server</a>                    
        </div>
      </div>     
      <div className="dropdown">
        <button className="dropbtn">UAV
          <i className="fa fa-caret-down"></i>
        </button>
        <div name="otrotest"  className="dropdown-content">
            <a id="openAddUavNavbar" onClick={()=>{openAddUav();handleClick()}} >Connect UAV</a>
            <a id="hideRosterNavbar" onClick={()=>{handleClick()}}>Show/Hide UAV Roster</a>    
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">File
          <i className="fa fa-caret-down"></i>
        </button>
        <div name="otrotest" className="dropdown-content">
            <label id="menuopenmission" htmlFor="openMissionNavbar" >Abrir Mision</label>
            <input type="file" multiple={false} style={{display:"none"}} id="openMissionNavbar" onChange={readFile} />
            <a id="openKMLNavbar" onClick={()=>{handleClick()}} >Open Pylons & Wires File</a>
            <a id="resetNavbar"  onClick={()=>{handleClick()}}>Reset Markers</a>        
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Mission
          <i className="fa fa-caret-down"></i>
        </button>
        <div name="otrotest" className="dropdown-content">
            <a id="loadMissionNavbar" onClick={()=>{rosContex.loadMission();handleClick()}} >Load Mission</a>
            <a id="commandMissionNavbar" onClick={()=>{rosContex.commandMission();handleClick()}} >Command Mission</a>     
        </div>
      </div>
      <a id="more info" >new device </a>
      </Toolbar>
      </Container>
    </AppBar>

  )
}
