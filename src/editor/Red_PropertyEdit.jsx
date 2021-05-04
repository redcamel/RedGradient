import React from "react";
import UI_Title from "../core/UI_Title";
import UI_TextField from "../core/UI_TextField";
import UI_Number from "../core/UI_Number";
import UI_Select from "../core/UI_Select";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

class Red_PropertyEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <UI_Title title={'Red_PropertyEdit'} />
      <div>
        <div style={style.itemContainer}>
          타이틀
          <UI_TextField value={data['title']} HD_onInput={e => {
            data['title'] = e.target.value;
            rootComponent.setState({});
          }} />
        </div>
        <div>TODO - 그라디언트 Edit</div>
        <div style={style.itemContainer}>
          Position
          <div>
            <UI_Number
              width={80}
              value={data['position']['x'] || 0}
              HD_onInput={e => {
                data['position']['x'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Select value={data['position']['xUnit']} options={['px', '%']} HD_change={e => {
              data['position']['xUnit'] = e.target.value;
              rootComponent.setState({});
            }} />
            <UI_Number
              width={80}
              value={data['position']['y'] || 0}
              HD_onInput={e => {
                data['position']['y'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Select value={data['position']['yUnit']} options={['px', '%']} HD_change={e => {
              data['position']['yUnit'] = e.target.value;
              rootComponent.setState({});
            }} />
          </div>
        </div>
        <div style={style.itemContainer}>
          Size
          <div>
            <UI_Number
              width={80}
              value={data['size']['w'] || 0}
              HD_onInput={e => {
                data['size']['w'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Select value={data['size']['wUnit']} options={['px', '%']} HD_change={e => {
              data['size']['wUnit'] = e.target.value;
              rootComponent.setState({});
            }} />
            <UI_Number
              width={80}
              value={data['size']['h'] || 0}
              HD_onInput={e => {
                data['size']['h'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Select value={data['size']['hUnit']} options={['px', '%']} HD_change={e => {
              data['size']['hUnit'] = e.target.value;
              rootComponent.setState({});
            }} />
          </div>
        </div>
        <div>TODO - 반복 Edit</div>
      </div>
      <div style={style.itemContainer}>
        <div>Current Data</div>
        <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
          {JSON.stringify(data,null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>;
  }

}

export default Red_PropertyEdit;
const style = {
  container: {
    width: '300px',
    borderRight: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  layer: {
    height: '30px'
  },
  itemContainer: {
    padding: '4px',
    background: 'rgba(0,0,0,0.1)',
    borderBottom: '1px solid rgba(0,0,0,0.5)'
  }
};
