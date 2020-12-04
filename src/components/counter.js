import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import classes from './Counter.module.css'
import {Button,Toast, ToastBody, ToastHeader } from 'reactstrap';
import jsonData from '../nukes.json';


//const loadData = () => {JSON.parse(JSON.stringify(jsonData)), console.log()};


class Counter extends Component {
    state = {
 feed:[{country: "USA", latitude: 32.54, longitude: -105.57, date_long: 19450716,name: "TRINITY",
 region: "ALAMOGORDO"}],

        all:0,
        viewport: {

          latitude: 37.7577,
          longitude: -122.4376,
          zoom:1
        },
        arr:[[0,0]],
        info:[]
    
        }

        componentDidMount(){
            
           
            //   fetch('http://18.191.231.245:4000/nukes')

            
            // .then(res1 => res1.json())
            // .then(res1 => this.setState({feed:res1.data}));

            this.setState({feed:JSON.parse(JSON.stringify(jsonData)).data})

            // this.interval = setInterval(() => this.setState({ all: this.state.all + 1 }), 1000);
         
        }

        

    aggr1(){
      if (this.state.all >0){
        this.setState({
          all: this.state.all-1
      })
      } else {}
      //console.log(this.state.feed[this.state.all])
      return(this.state.feed[this.state.all])
    }

        aggr(){
          this.setState({
            all: this.state.all+1
        })
          //console.log(this.state.feed[this.state.all])
          return(this.state.feed[this.state.all])
        }
    
      
            
        _renderObject(){
          return Object.entries(this.aggr()).map(([key,value], i) => {
            return (
              
                value
                 
            )
          })
        };   
        
        _renderObject1(){
          return Object.entries(this.aggr1()).map(([key,value], i) => {
            return (
              
                value
                 
            )
          })
        }; 
        

        arra(){
         this.state.arr.push([this._renderObject()[1],this._renderObject()[2]])
        
         this.setState({viewport: {latitude:this._renderObject()[1],longitude:this._renderObject()[2],zoom:1},
         info: [this._renderObject()] })
         
        }

        arra1(){
          this.state.arr.pop([this._renderObject1()[1],this._renderObject1()[2]])
          
          this.setState({viewport: {latitude:this._renderObject1()[1],longitude:this._renderObject1()[2],zoom:1},
          info: [this._renderObject1()] })
          
         }



     

  render() {
  
    
    return (

        <div>

<div className="fixed-top">
        <Toast className={classes.Lgroup}>
          <ToastHeader style ={{backgroundColor: 'yellow'}}>
            Explosion Info
          </ToastHeader>
          {this.state.info.map((i) => 
          <ToastBody style ={{fontSize: '10px', opacity: 0.7}}>
            <p>Country: {i[0]}</p>
            <p>Lat: {i[1]}</p>
            <p>Lon: {i[2]}</p>
            <p>Date: {i[3]}</p>
            <p>Bomb Name: {i[4]}</p>
            <p>Region: {i[5]}</p>
          </ToastBody>

)}
        </Toast>
      </div>
          
  
              <ReactMapGL
              {...this.state.viewport}
              width="100vw" // It always override the view(viewport) width state.
              height="100vh" // It always override the view(viewport) height state.
              mapStyle="mapbox://styles/mapbox/dark-v8"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewport) => this.setState({viewport})}
           
            >
       
  { this.state.arr.map(i =>
              <Marker latitude={i[0]} longitude={i[1]}>
              <div className={classes.circleBase}></div>
             </Marker>
  )

  }

        
        
            </ReactMapGL>
            <div className="fixed-bottom">
      <Button color = 'success' 
      style = {{width:"85px",height:"85px", float: 'right',marginRight: '15px', marginBottom: '15px',borderRadius: '50%',fontSize:'35px'}} onClick={this.arra.bind(this)}>+
      </Button>
      <Button color = 'danger' 
      style = {{width:"85px",height:"85px", float: 'left',marginLeft: '15px', marginBottom: '15px',borderRadius: '50%',fontSize:'35px'}} onClick={this.arra1.bind(this)}>-
      </Button>
      </div>


            </div>




    );
  }
}
export default Counter