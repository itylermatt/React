import React, {Component} from 'react';

class SideNavChat extends Component{

    state={

    };

    ref = React.createRef();
    componentDidMount(){
    }

    render(){
        return (
            <div ref={this.ref}>
               Hello World!
            </div>
        );
    }
}
export default SideNavChat;