/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedCanvasFilter from "./RedFlterItem.jsx";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class RedFilterList extends React.Component {


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    if (!canvasInfo.filterList) canvasInfo.filterList = [];
    const filterList = canvasInfo.filterList;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className={'ui_subTitle'}>filterList</div>
        <FontAwesomeIcon
          icon={faPlusSquare} style={{fontSize: '16px', cursor: 'pointer'}}
          onClick={() => {
            canvasInfo['filterList'].splice(0, 0, {type: 'normal', values: {}, css: ''});
            rootComponent.updateRootState({});
          }}
        />
      </div>
      <div style={filterList.length ? style.container : {}}>
        {filterList.map(v => <RedCanvasFilter rootComponent={rootComponent} filterData={v} />)}
      </div>
    </div>;
  }
}

export default RedFilterList;
const style = {
  container: {
    marginTop: '4px',
    borderRadius: '8px',
    background: '#242424',
    padding: '8px'
  }
};
