import React, {Component} from 'react';
import axios from 'axios';
import urls from '../../urls/url';

class DummyImageUpload extends Component{
    state={
        file  : null,
    };

    onFormSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("myImage", this.state.file);
        const config = {
            headers: {
                "content-type" : "multipart/form-data"
            }
        };
        axios.post(urls.url("dummy"),formData, config).then(res=>{
            // alert("the file is successfully uploaded");
        }).catch(e=>{
            console.log(e);
        });
    };

    onChange = (e)=>{
        this.setState({file : e.target.files[0]});
    };

    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <h3>File Upload</h3>
                    <input type={"file"} name={"Image"} onChange={this.onChange}/>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        );
    }
}
export default DummyImageUpload;