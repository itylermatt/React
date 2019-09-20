import React, {Component} from 'react';
import Tree from 'react-hierarchy-tree-graph';

const myTreeData = [
    {
        name : "Top Level",
        attributes:{
          keyA: "val A",
          keyB : "val B",
          keyC :  "val C",
        },
        children:[
            {
                name: "Level 2: A",
                attributes: {
                    keyA : "val A",
                    keyB : "val B",
                    keyC : "val C",
                }
            },
            {
                name: "Level 2: B"
            },
            {
                name: "Level 2: B"
            },
            {
                name: "Level 2: B"
            },

        ]
    },
];

class DummyDependency extends Component{
    render() {
        return(

            <div id={"treeWrapper"} style={{width:"100%", height:"100%"}}>
                <Tree data={myTreeData}/>

            </div>
        );
    }
}

export default DummyDependency;