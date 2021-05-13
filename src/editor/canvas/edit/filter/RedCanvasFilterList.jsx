/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedCanvasFilter from "./RedCanvasFlterItem.jsx";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class RedCanvasFilterList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    if(!canvasInfo.filterList) canvasInfo.filterList = []
    const filterList = canvasInfo.filterList

    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        filterList
        <FontAwesomeIcon
          icon={faPlusSquare} style={{fontSize: '16px',cursor:'pointer'}}
          onClick={e=>{
            canvasInfo['filterList'].push({type:'normal', values :{}, css : ''})
            rootComponent.setState({})
          }}
        />
      </div>
      <div style={filterList.length ? style.container : {}}>
        {filterList.map(v => <RedCanvasFilter rootComponent={rootComponent} filterData={v}/>)}
      </div>
    </div>
  }
}

export default RedCanvasFilterList;
const style = {
  container: {
    marginTop: '4px',
    borderRadius: '8px',
    background: '#242424',
    padding: '8px'
  }
};
