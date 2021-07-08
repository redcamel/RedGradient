/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '../App.css';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ACTIVE_FRAME_KEY from "../const/ACTIVE_FRAME_KEY";
import RedPreview from "./RedPreview.jsx";
import getUUID from "./js/getUUID.js";

class ActiveSelectBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    return <div>
      <div style={{
        display: 'flex',
        height: '100%',
        alignItem: 'center',
        border: '1px solid #000',
        borderTop: 0,
        borderLeft: 0,
        zIndex: 1,
        background: '#333'
      }}>
        <div style={{
          display: 'flex'
        }}>
          {
            Object.values(ACTIVE_FRAME_KEY).map((key, index) => {
              return <div
                style={{
                  display: 'flex',
                  width: '100px',
                  height: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRight: '1px solid #000',
                  background: appComponentState.activeFrameKey === key ? 'linear-gradient(#5e7ade, #2c3565)' : '#333'
                }}
                onClick={e => {
                  appComponentState.activeFrameKey = key;
                  console.log(appComponentState);
                  appComponent.updateRootState({});
                }}
              >{key}</div>;
            })
          }
          <div
            style={{
              display: 'flex',
              width: '100px',
              height: '30px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRight: '1px solid #000',
              background: '#333'
            }}
            onClick={e => {
              this.previewModeYn = true;
              this.previewModeKey = getUUID();
              this.setState({});
            }}
          >Preview
          </div>
          {this.previewModeYn ? <RedPreview
            key={this.previewModeKey}
            rootComponent={appComponent}
            HD_Close={e => {
              this.previewModeYn = false;
              this.setState({});
            }} /> : ''}
        </div>
      </div>
    </div>;
  }
}

export default ActiveSelectBar;
