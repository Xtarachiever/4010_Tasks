import React from 'react';
class Upcoming extends React.Component{
    render(){
        return(
            <div className="tabs">
                <ul className="nav nav-tabs" role="tablist">
                    {
                        this.props.tabs.map(tab=>{
                            
                            const active=(tab===this.props.selected ? 'active' : " ");
                            return(
                                <li className="nav-item" key={tab}>
                                    <a className="active" onClick={()=>this.props.setSelected(tab)}>{tab}</a>
                                </li>
                            );
                        })
                    }
                </ul>
                {this.props.children}
            </div>

        );
    }
}
export default Upcoming;