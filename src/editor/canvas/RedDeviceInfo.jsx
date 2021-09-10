import RedNumber from "../../core/RedNumber";
import RED_CANVAS_PRESET from "../../js/const/RED_CANVAS_PRESET";
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRulerCombined, faTabletAlt} from "@fortawesome/free-solid-svg-icons";

class RedDeviceInfo extends React.Component {
  render() {
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    // console.log('appComponentState', appComponentState);
    const deviceData = appComponentState.device;
    return <div style={{
      display: 'flex', alignItems: 'center',
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap',
    }}>
      <div>Device Information</div>
      <div style={{width: '10px'}} />
      <RedNumber title={'width'} width={'160px'} value={deviceData['width']} minValue={0} HD_onInput={e => {
        deviceData['width'] = parseInt(+e.target.value);
        appComponent.updateRootState({});
      }} />
      <div style={{width: '10px'}} />
      <RedNumber title={'height'} width={'160px'} value={deviceData['height']} minValue={0} HD_onInput={e => {
        deviceData['height'] = parseInt(+e.target.value);
        appComponent.updateRootState({});
      }} />
      <div style={{width: '10px'}} />
      <div>
        <select
          onChange={e => {
            let t0 = JSON.parse(e.target.value);
            deviceData['width'] = parseInt(+t0['width']);
            deviceData['height'] = parseInt(+t0['height']);
            appComponent.updateRootState({});
          }}
        >
          {
            RED_CANVAS_PRESET.map(v => {
              return <option
                color={'#fff'}
                value={JSON.stringify(v)}
                selected={deviceData['width'] === v['width'] && deviceData['height'] === v['height']}
              >
                {/*<div>*/}
                {/*  <FontAwesomeIcon*/}
                {/*    icon={v['type'] === 'mobile' ? 📱 : 🖥️}*/}
                {/*  /> {v['title']}({v['width']}x{v['height']})*/}
                {/*</div>*/}

                {
                  v['title'] === 'Responsive' ? v['title'] :
                    `${v['type'] === 'mobile' ? '📱' : '🖥️'} ${v['title']}(${v['width']}x${v['height']}`
                }

              </option>;
            })
          }
        </select>
      </div>
      <div style={{
        marginLeft: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '20px',
        lineHeight: '20px',
        borderRadius: '4px',
        border: '1px solid #000',
        background: deviceData['activeRuler'] ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#333',
        padding: '4px',
        width: '32px',
        cursor: 'pointer'
      }}
           onClick={() => {
             deviceData['activeRuler'] = !deviceData['activeRuler'];
             appComponent.updateRootState({});
           }}
      >
        <FontAwesomeIcon icon={faRulerCombined} />
      </div>
      <div style={{
        marginLeft: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '20px',
        lineHeight: '20px',
        borderRadius: '4px',
        border: '1px solid #000',
        background: deviceData['activeFrame'] ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#333',
        padding: '4px',
        width: '32px',
        cursor: 'pointer'
      }}
           onClick={() => {
             deviceData['activeFrame'] = !deviceData['activeFrame'];
             appComponent.updateRootState({});
           }}
      >
        <FontAwesomeIcon icon={faTabletAlt} />
      </div>
    </div>;
  }
}

export default RedDeviceInfo;
