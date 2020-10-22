import React,{useState,useEffect} from 'react';
import {FormControl,Select,MenuItem,Card,CardContent} from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table';
import LineGraph from './LineGraph'
import './App.css';
import 'leaflet/dist/leaflet.css';
import {prettyPrintStat} from './util'
import './Map.css'
import MapButtons from './MapButtons'


function App() {
  const [states,setstates] = useState([]);
  const [state,set_state] = useState("india");
  const [stateInfo,setStateInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({lat:20.5937 , lng:78.9629});
  const [mapZoom,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] = useState([])
  const [caseType,setCaseType] = useState("cases")
  
  const india = ()=>{
    fetch("https://api.covidindiatracker.com/total.json").then((response)=>response.json()).then((data)=>{
      var obj = {
       stateCases:data.confirmed,
       stateRecov:data.recovered,
       stateDeaths:data.deaths,
      }
      setStateInfo(obj)  
    })
   }
  useEffect(()=>{
    
     india();
     fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setMapCountries(data);
        })
        
  },[])
  useEffect(() => {
    const getStatesData = async () =>{
      await fetch('https://api.covidindiatracker.com/state_data.json').then((response) => response.json()).then((data)=>{
        const states = data.map((state)=>(
          {
            name:state.state,
            value:state.id,
            cases:state.confirmed,
            recovered:state.recovered,
            deaths:state.deaths,
            dist:state.districtData
          }
        ))  
         setstates(states);
    })
  }
  getStatesData()
  },[]);
  
  const onStateChange = async (event) =>{
    const stateCode = event.target.value;
     
    console.log(event)
    set_state(stateCode);
     for(var i=0;i<states.length;i++){
       if(states[i].value===stateCode){
        const obj = {
          stateCases:states[i].cases,
          stateRecov:states[i].recovered,
          stateDeaths:states[i].deaths,
          stateName:states[i].name,
          distInfo:states[i].dist 
        }
          setStateInfo(obj)
       }
     }
     
  }
  useEffect(()=>{
    if(state==="india"){
       setTableData(null)
       india();
    }
    else{
      for(var i=0;i<states.length;i++){
        if(states[i].value===state){
          setTableData(states[i].dist)   
         } 
        }
    }
  },[state,states])
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onStateChange} value={state}>
        <MenuItem  value="india">Select State</MenuItem>
          {
            states.map((state) => {
           return <MenuItem key={state.value} value={state.value}>{state.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
       <InfoBox isRed title="COVID-19 Cases" cases={prettyPrintStat(stateInfo.stateCases)} total={stateInfo.stateName == null ? 'India':stateInfo.stateName} />
       <InfoBox title="Recovered" cases={prettyPrintStat(stateInfo.stateRecov)} total={stateInfo.stateName == null ? 'India':stateInfo.stateName}/>
       <InfoBox isRed title="Deaths" cases={prettyPrintStat(stateInfo.stateDeaths)} total={stateInfo.stateName == null ? 'India':stateInfo.stateName}/>
      </div>
      <div className="map__data">
        
       <div className="WWMap">
       <div className="buttons">
                 <MapButtons
                 isRed
                 active={caseType==="cases"}
                 onClick={e=>setCaseType("cases")}
                 title="Cases" />
                 <MapButtons
                 active={caseType==="recovered"}
                  onClick={e=>setCaseType("recovered")}
                 title="Recovered" />
                 <MapButtons
                 isRed 
                 active={caseType==="deaths"}
                  onClick={e=>setCaseType("deaths")}
                 title="Deaths" />
             </div>
      <Map 
        casesType= {caseType}
        countries={mapCountries}
        center={mapCenter}
        zoom = {mapZoom}
      />
       </div>
      </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>District wise Cases</h3>
          <Table states={tableData} />
        <h3 className="app__graphTitle">Worldwide new {caseType}</h3>   
           <LineGraph className="app__graph" casesType={caseType} />
        </CardContent>
      </Card>
     
    </div>
  );
}
 

export default App


