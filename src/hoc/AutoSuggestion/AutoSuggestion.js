import React ,{Component } from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
    {
        name:'C',
        year:1972,
    },
    {
        name:"D",
        year:2020,
    },
];

const getSuggestions = value =>{
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength===0?[]:languages.filter(
        lang=>
            lang.name.toLowerCase().slice(0,inputLength)===inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion =>(
    <div>
        {suggestion.name}
    </div>
);

class Example extends Component{

    state={
        value:'',
        suggestions:[],
    };

    onChange = (event,{newValue})=>{
        this.setState({value:newValue});
    };

    onSuggestionsFetchedRequested = ({value})=>{
        this.setState({
            suggestions:getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = ()=>{
        this.setState({
            suggestions:[],
        })
    };

    inputProps = {
        placeholder:"Type a Programming Language",
        value:this.state.value,
        onChange:this.onChange,
    };

    render() {
        const {value,suggestions} = this.state;

        const inputProps={
            placeholder:"Type a Programming Language",
            value:value,
            onChange:this.onChange,
        };

        return <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchedRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    }
}

export default Autosuggest;