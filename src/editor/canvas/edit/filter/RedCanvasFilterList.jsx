/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedCanvasFilter from "./RedCanvasFlterItem.jsx";

class RedCanvasFilterList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const filterList = canvasInfo.filterList
    return <div>
      filterList
      <div style={style.container}>
        {filterList.map(v=><RedCanvasFilter rootComponent={rootComponent} filterData={v}/>)}
        <div className={'todo'}>Todo - 멀티 필터 적용가능하게 개발되어야함</div>
      </div>
    </div>
  }
}

export default RedCanvasFilterList;
const style = {
  container: {
    marginTop : '4px',
    borderRadius : '8px',
    background : '#242424',
    padding: '8px'
  }
};
