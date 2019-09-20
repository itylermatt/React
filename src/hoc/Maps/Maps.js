import React,{Component} from 'react';
import {Map, Marker,GoogleApiWrapper} from 'google-maps-react';

class Maps extends Component{

    state={
        markers:[],
        blue:[],
    };

    componentDidMount() {
        if(this.props.markers){
            // alert("maps mount:\n"+JSON.stringify(this.props.blue));
            this.setState({markers:[...this.props.markers],blue:[...this.props.blue]});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        let markers=null;
        if(this.state.markers.length>0){
            this.height="70%";
            this.width="100%";
            markers = this.state.markers.map((item,index)=>{
                console.log(item);
                // alert(JSON.stringify(item.lat +"\n" + item.long));
                if(this.state.blue[index]!==true){
                    // alert("online");
                    return(
                        <Marker
                            key={index}
                            title={item.camera_location}
                            name={item.camera_name}
                            position={{lat:item.latitude,lng:item.longitude}}
                            icon={{
                                url:"https://mt.google.com/vt/icon/text=A&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1",
                                    scaledSize:this.props.google.maps.Size(38,38)
                            }}
                        />
                    );
                }else{
                    // alert("offline");
                    return(
                        <Marker
                            key={index}
                            title={item.camera_location}
                            name={item.camera_name}
                            position={{lat:item.latitude,lng:item.longitude}}
                            icon={{
                                url:"https://mt.google.com/vt/icon/text=A&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1",
                                scaledSize:this.props.google.maps.Size(38,38)
                            }}
                        />
                    );
                }

            });

        }else{
            this.height= "90%";
            this.width = "90%";
            markers=(
                <Marker
                    title={this.props.title}
                    name={this.props.name}
                    position={{
                        lat : this.props.lat,
                        lng : this.props.long,
                    }}
                    icon={!this.props.online?
                        {
                            url:"https://mt.google.com/vt/icon/text=A&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1",
                            scaledSize:this.props.google.maps.Size(38,38)
                        }
                        :
                        {
                            url:"https://mt.google.com/vt/icon/text=A&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1",
                            scaledSize:this.props.google.maps.Size(38,38)
                        }
                    }
                />
            );
        }



        return(
            <div
                // style={{margin:"auto",display:"flex",width:"100%",height:"100%"}}
                style={{margin:"auto",display:"flex"}}
            >
                <Map
                    zoom={15}
                    google={this.props.google}
                    initialCenter={
                        {
                            lat:this.props.lat,
                            lng:this.props.long,
                        }
                    }
                    // style={{width:"90%",height:"90%"}}
                    style={{width:this.width,height:this.height}}
                >
                    {markers}
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCYAg14hDBd8ai_ILnLdoVf_IyollrwQMc"),
})(Maps);