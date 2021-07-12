import VISUAL_EDIT_MODE from "../../../js/const/VISUAL_EDIT_MODE";

const renderVisualEditMode = function (rootComponentState, canvasInfo, activeSubData) {
  return <div style={{
    position: 'absolute',
    top: 65,
    left: 10,
    display: 'flex',
    background: 'rgba(0,0,0,0.1)',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.16)'
  }}>
    <div>
      <div style={{
        color: '#fff',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span
          style={{color: '#efb26a'}}>Container size </span> : {+canvasInfo['width'].toFixed(2)} * {+canvasInfo['height'].toFixed(2)}
      </div>
      <div style={style.divide} />
      <div style={{
        color: '#fff',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span
          style={{color: '#efb26a'}}>Gradient size </span> : {activeSubData['size']['w'].toFixed(2)}{activeSubData['size']['wUnit']} * {activeSubData['size']['h'].toFixed(2)}{activeSubData['size']['hUnit']}
      </div>
      <div style={style.divide} />
      <div>
        <div style={{color: '#efb26a'}}>Visual Edit target</div>
        <div style={{
          marginTop: '3px',
          display: 'inline-block'

        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #000',
          }}>
            {
              Object.values(VISUAL_EDIT_MODE).map((v, index) => {
                return <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: '#fff',
                    borderLeft: index ? '1px solid #000' : 0,
                    padding: '6px',
                    background: this.state.visualEditMode === v ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#333333'
                  }}
                  onClick={() => {
                    this.setState({visualEditMode: v});
                  }}
                >{v}</div>;
              })
            }
          </div>
        </div>
      </div>
      <div style={style.divide} />
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={style.canvasResizer}>
            <div>
              <label style={{
                // background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
                display: 'flex',
                borderRadius: '4px',
                padding: '2px 0px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}>
                View Visual Edit
                <input type={'checkbox'}
                       checked={this.state.layerSizeView}
                       style={{
                         display: 'inline-block',
                         width: '15px',
                         height: '15px',
                         background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                         borderRadius: '4px',
                         border: '1px solid #000',
                         cursor: 'pointer',
                         marginLeft: '5px'
                       }}
                       onClick={() => this.setState({layerSizeView: !this.state.layerSizeView})}
                />
              </label>
            </div>
            <div>
              <label style={{
                // marginLeft: '5px',
                // background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
                display: 'flex',
                borderRadius: '4px',
                padding: '2px 0px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}>
                View Edit Container Only
                <input type={'checkbox'}
                       checked={this.state.editCanvasOnly}
                       style={{
                         display: 'inline-block',
                         width: '15px',
                         height: '15px',
                         background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                         borderRadius: '4px',
                         border: '1px solid #000',
                         cursor: 'pointer',
                         marginLeft: '5px'
                       }}
                       onClick={() => this.setState({editCanvasOnly: !this.state.editCanvasOnly})}
                />
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>;
};
export default renderVisualEditMode;
const style = {
  canvasResizer: {
    // display: 'flex',
    alignItems: 'center',
    fontSize: '12px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
