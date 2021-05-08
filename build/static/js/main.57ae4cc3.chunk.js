/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

(this.webpackJsonpuntitled=this.webpackJsonpuntitled||[]).push([[0],{124:function(e,t,n){},125:function(e,t,n){},485:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(110),i=n.n(a),c=(n(124),n(4)),s=n(5),l=n(7),d=n(6),p=(n(125),n(9)),u={LINEAR:"linear-gradient",RADIAL:"radial-gradient"},b=0;var x=function(){return{title:"gradient".concat(b++),type:"linear-gradient",repeatType:"repeat",deg:90,visible:!0,position:{x:0,xUnit:"%",y:0,yUnit:"%"},colorList:[{color:"rgba(255,255,255,1)",range:0},{color:"rgba(255,255,255,0.1)",range:100}]}},h=n(1),j=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(h.jsx)("input",{style:{width:"".concat(this.props.width||"")},type:"number",max:this.props.maxValue,value:this.props.value,onInput:this.props.HD_onInput,onBlur:this.props.HD_blur})}}]),n}(r.a.Component),v=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return Object(h.jsx)("select",{style:{width:"".concat(this.props.width||"","px")},onChange:this.props.HD_change,onBlur:this.props.HD_blur,children:(this.props.options||[]).map((function(t){var n=e.props.value===t;return Object(h.jsx)("option",{value:t,selected:n,children:t})}))})}}]),n}(r.a.Component),g=0;var f=function(){return{title:"layer".concat(g++),visible:!0,openYn:!0,size:{w:100,wUnit:"%",h:100,hUnit:"%"},items:[new x]}},O=n(10),m=n(14),y=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={layerBgColor:"transparent"},o}return Object(s.a)(n,[{key:"_toggleVisible",value:function(e){e.visible=!e.visible,this.props.rootComponent.setState({})}},{key:"render",value:function(){var e=this,t=this.props.rootComponent,n=t.state,o=this.props.item,r=this.props.layer,a=r.size,i=n.activeSubData===o;return Object(h.jsxs)("div",{style:{opacity:o.visible?1:.5,transition:"opacity 0.2s",padding:"0px 5px 5px 5px",background:"#232323",border:"1px solid #333",borderRadius:"8px",margin:"4px 0px 4px 10px"},children:[Object(h.jsx)("div",{className:"layerItemSubTitle",style:{textOverflow:"ellipsis",width:"100px",overflow:"hidden",whiteSpace:"nowrap"},children:o.title}),Object(h.jsxs)("div",{style:{margin:"2px 2px 2px 0px"},children:[Object(h.jsx)("button",{style:Object(p.a)(Object(p.a)({},w.bgItem),{},{background:"#000",color:"#fff"}),onClick:function(){return e.setState({layerBgColor:"black"})},children:"B"}),Object(h.jsx)("button",{style:Object(p.a)(Object(p.a)({},w.bgItem),{},{background:"#fff",color:"#000"}),onClick:function(){return e.setState({layerBgColor:"white"})},children:"W"}),Object(h.jsx)("button",{style:Object(p.a)({},w.bgItem),className:"transparent_checker",onClick:function(){return e.setState({layerBgColor:"transparent"})},children:"T"})]}),Object(h.jsxs)("div",{style:{margin:"2px 2px 2px 0px"},children:[Object(h.jsx)("button",{className:"layerVisible",onClick:function(){return e._toggleVisible(o)},children:Object(h.jsx)(m.a,{icon:o.visible?O.b:O.c})}),Object(h.jsx)("button",{className:"layerDel",onClick:function(e){e.stopPropagation();var n=r.items.indexOf(o);r.items.splice(n,1),r.items.length||(r.items.push(new x),n=0),r.items[n]||(n-=1),t.setState({activeSubData:r.items[n]})},children:Object(h.jsx)(m.a,{icon:O.f})}),Object(h.jsx)("button",{className:"layerType",children:o.type.charAt(0).toUpperCase()})]}),Object(h.jsxs)("div",{className:"transparent_checker",style:{width:"".concat(100,"px"),height:"".concat(a.h/a.w*100,"px"),cursor:"pointer",borderRadius:"4px",overflow:"hidden",transition:"height 0.2s"},onClick:function(){return t.setState({activeLayer:r,activeSubData:o})},children:[Object(h.jsx)("div",{className:"layerItem",style:{background:"".concat(L.calcGradientItem(o,!1,r),",").concat(this.state.layerBgColor)}}),Object(h.jsx)("div",{style:i?w.activeLine:w.deActiveLine})]})]})}}]),n}(r.a.Component),w={activeLine:{position:"absolute",top:0,left:0,right:0,bottom:0,border:"2px solid #5e7ade",transition:"border 0.2s"},deActiveLine:{border:"2px solid transparent"},bgItem:{padding:"2px",marginRight:"1px",width:"30px",height:"20px",fontSize:"10px",cursor:"pointer",border:0,fontWeight:"bold"}},C={REPEAT_X:"repeat-x",REPEAT_Y:"repeat-y",REPEAT:"repeat",SPACE:"space",ROUND:"round",NO_REPEAT:"no-repeat"},S=["black","white","transparent"],k=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.rootComponent,t=e.state.layers,n=this.props.layersComponent;return Object(h.jsx)("div",{children:Object(h.jsxs)("div",{style:D.addLayer,children:[Object(h.jsx)("div",{style:D.addLayerItem,onClick:function(){var n;t.splice(0,0,n=new f),e.setState({activeLayer:n,activeSubData:n.items[0]})},children:"Add Layer"}),Object(h.jsx)("select",{style:{width:"100%"},onChange:function(e){return n.setState({layerBgColor:e.target.value})},children:S.map((function(e){return Object(h.jsx)("option",{value:e,children:e})}))})]})})}}]),n}(r.a.Component),D={addLayer:{position:"sticky",padding:"5px 4px 3px 4px",top:0,zIndex:1,background:"#000"},addLayerItem:{background:"#5e7ade",padding:"4px 8px",fontSize:"11px",borderRadius:"4px",marginBottom:"4px",cursor:"pointer"},bgItem:{padding:"2px",margin:"2px 0px",fontSize:"11px",cursor:"pointer",border:"1px solid rgba(255,255,255,0.16)",borderRadius:"4px"}},I=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={layerBgColor:"transparent"},o}return Object(s.a)(n,[{key:"_toggleVisible",value:function(e){e.visible=!e.visible,this.props.rootComponent.setState({})}},{key:"render",value:function(){var e=this,t=this.props.rootComponent,o=t.state.layers;return Object(h.jsxs)("div",{style:{flexDirection:"column",display:"flex"},children:[Object(h.jsx)(k,{rootComponent:t,layersComponent:this}),Object(h.jsx)("div",{style:R.container,children:o.map((function(r){var a=r.size;return Object(h.jsxs)("div",{style:{opacity:r.visible?1:.5,transition:"opacity 0.2s",border:"1px solid rgba(0,0,0,0.36)",borderRadius:"4px",background:"#0e0d0d",margin:"4px",padding:"0px 4px"},children:[Object(h.jsxs)("div",{className:"layerItemTitle",style:{textOverflow:"ellipsis",width:"123px",overflow:"hidden",whiteSpace:"nowrap"},children:[Object(h.jsx)(m.a,{icon:r.openYn?O.e:O.d,style:{fontSize:"11px",marginRight:"5px",cursor:"pointer"},onClick:function(){r.openYn=!r.openYn,t.setState({})}}),r.title]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{className:"layerVisible",onClick:function(){return e._toggleVisible(r)},children:Object(h.jsx)(m.a,{icon:r.visible?O.b:O.c})}),Object(h.jsx)("button",{className:"layerDel",onClick:function(e){e.stopPropagation(),o.splice(o.indexOf(r),1);var n=r;o.length||o.push(new f),t.setState({activeLayer:n,activeSubData:n.items[0]})},children:Object(h.jsx)(m.a,{icon:O.f})}),Object(h.jsx)("button",{className:"layerAdd",onClick:function(e){e.stopPropagation(),r.items.splice(0,0,new x),t.setState({activeSubData:r.items[0]})},children:Object(h.jsx)(m.a,{icon:O.h})})]}),Object(h.jsx)("div",{className:"transparent_checker",style:{width:"".concat(100,"px"),height:"".concat(a.h/a.w*100,"px"),cursor:"pointer",borderRadius:"4px",overflow:"hidden",transition:"height 0.2s"},onClick:function(){return t.setState({activeLayer:r,activeSubData:r.items[0]})},children:Object(h.jsx)("div",{className:"layerItem",style:{background:"".concat(n.calcGradientItems(r.items,!1,r),",").concat(e.state.layerBgColor)}})}),Object(h.jsxs)("div",{style:R.itemContainer,children:["Layer Size",Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{width:"70px",value:a.w||0,HD_onInput:function(e){a.w=e.target.value,t.setState({})}}),Object(h.jsx)(v,{value:a.wUnit,options:["px","%"],HD_change:function(e){a.wUnit=e.target.value,t.setState({})}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{width:"70px",value:a.h||0,HD_onInput:function(e){a.h=e.target.value,t.setState({})}}),Object(h.jsx)(v,{value:a.hUnit,options:["px","%"],HD_change:function(e){a.hUnit=e.target.value,t.setState({})}})]})]}),Object(h.jsx)("div",{children:r.openYn?r.items.map((function(e){return Object(h.jsx)(y,{layer:r,item:e,rootComponent:t})})):""})]})}))})]})}}]),n}(r.a.Component);I.calcGradients=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"transparent";return e.map((function(e){return I.calcGradientItems(e.items,t,e)})).join(",")+",".concat(n)},I.calcGradientItems=function(e,t,n){return e.length?e.map((function(e){return I.calcGradientItem(e,t,n)})).join(","):""},I.calcGradientItem=function(e,t,n){if(!e)return"";if(!e.colorList.length)return"";if(t&&!e.visible)return"linear-gradient(45deg, transparent,transparent )";if(n&&!n.visible)return"linear-gradient(45deg, transparent,transparent )";var o=e.colorList.map((function(e){var t=void 0===e.range?"":"".concat(e.range,"%");return"".concat(e.color," ").concat(t)})),r=e.position?" ".concat(e.position.x).concat(e.position.xUnit," ").concat(e.position.y).concat(e.position.yUnit):"",a=n.size?" ".concat(n.size.w).concat(n.size.wUnit," ").concat(n.size.h).concat(n.size.hUnit):"",i=e.repeatType===C.REPEAT?"":e.repeatType;return e.type===u.LINEAR?"".concat(e.type,"(").concat(e.deg,"deg, ").concat(o,") ").concat(r," / ").concat(a," ").concat(i):"".concat(e.type,"(").concat(o,") ").concat(r," / ").concat(a," ").concat(i)};var L=I,R={container:{borderRight:"1px solid #000",overflowX:"hidden",overflowY:"auto",padding:"0px 0px 10px 0px"},layerItem:{height:"35px",cursor:"pointer"},activeLine:{position:"absolute",top:0,left:0,right:0,bottom:0,border:"2px solid #5e7ade",transition:"border 0.2s"},deActiveLine:{border:"2px solid transparent"}},_=n(40),N=[{title:"512 x 512",width:512,height:512},{title:"Google Pixel 4, 4XL",width:412,height:870,type:"mobile"},{title:"iPhone 12 Pro Max",width:428,height:926,type:"mobile"},{title:"web 1366",width:1366,height:768},{title:"web 1920",width:1920,height:1080}];var U=function(){var e=this,t=this.props.rootComponent,n=t.state,o=n.canvasInfo;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{style:E.canvasViewInfo,children:[Object(h.jsxs)("div",{children:["center : ",this.state.canvasViewOffsetX,",",this.state.canvasViewOffsetY," / canvasViewScale : ",this.state.canvasViewScale]}),Object(h.jsx)("button",{style:E.toCenter,onClick:function(){return e.setState({canvasViewOffsetX:0,canvasViewOffsetY:0})},children:"set Center"}),Object(h.jsx)("button",{style:E.toScale,onClick:function(){return e.setState({canvasViewScale:1})},children:"setScale 1"}),Object(h.jsx)("button",{style:E.toScale,onClick:function(){return e.setState({canvasViewScale:.5})},children:"setScale 0.5"}),Object(h.jsx)("div",{style:{display:"inline-block",marginLeft:"5px"},children:N.map((function(e){return Object(h.jsx)("button",{style:E.presetButton,onClick:function(){o.width=e.width,o.height=e.height,t.setState({})},children:Object(h.jsxs)("div",{children:[Object(h.jsx)(m.a,{icon:"mobile"===e.type?O.g:O.a})," ",e.title,"(",e.width,"x",e.height,")"]})})}))})]}),Object(h.jsxs)("div",{style:E.canvasResizer,children:[Object(h.jsx)(j,{width:"60px",value:o.width,HD_onInput:function(e){o.width=e.target.value,t.setState({})}}),Object(h.jsx)(j,{width:"60px",value:o.height,HD_onInput:function(e){o.height=e.target.value,t.setState({})}}),Object(h.jsxs)("div",{style:{display:"inline-flex",alignItems:"center"},children:["\ubc30\uacbd\uc0c9\uc0c1",Object(h.jsx)("div",{className:"transparent"===n.bgColor?"transparent_checker":"",style:{display:"inline-block",width:"25px",height:"25px",background:"transparent"===n.bgColor?"":n.bgColor,borderRadius:"4px",marginRight:"10px",border:"1px solid #000",cursor:"pointer"},onClick:function(){return e.setState({canvasBgColorPickerOpenYn:!0})}}),this.state.canvasBgColorPickerOpenYn?Object(h.jsxs)("div",{style:{zIndex:1,position:"absolute",top:0,left:"0%",transform:"translate(-50% , 0px)",boxShadow:"0px 0px 16px rgba(0,0,0,0.16)",background:"#fff",borderRadius:"8px",overflow:"hidden"},children:[Object(h.jsx)(_.a,{width:250,color:n.bgColor,onChange:function(e){n.bgColor="rgba(".concat(e.rgb.r,",").concat(e.rgb.g,",").concat(e.rgb.b,",").concat(e.rgb.a,")"),t.setState({})}}),Object(h.jsx)("div",{style:{padding:"4px",background:"#5e7ade",cursor:"pointer",textAlign:"center"},onClick:function(){return e.setState({canvasBgColorPickerOpenYn:null})},children:"\uc644\ub8cc"})]}):""]}),Object(h.jsxs)("div",{children:["\ub808\uc774\uc5b4 \uc601\uc5ed \ubcf4\uae30",Object(h.jsx)("input",{type:"checkbox",checked:this.state.layerSizeView,style:{display:"inline-block",width:"15px",height:"15px",background:"transparent"===n.bgColor?"":n.bgColor,borderRadius:"4px",marginRight:"10px",border:"1px solid #000",cursor:"pointer"},onClick:function(){return e.setState({layerSizeView:!e.state.layerSizeView})}}),Object(h.jsx)("div",{className:"todo",children:"Todo - \ub808\uc774\uc5b4 & \ub808\uc774\uc5b4\ub0b4 \uc544\uc774\ud15c \ub4dc\ub798\uadf8 \ub4dc\ub86d\uc73c\ub85c \uc62e\uae30\uae30"}),Object(h.jsx)("div",{className:"todo",children:"Todo - \uc560\ub2c8\uba54\uc774\uc158 \uad6c\uc0c1"}),Object(h.jsx)("div",{className:"todo",children:"Todo - undo,redo"}),Object(h.jsx)("div",{className:"todo",children:"Todo - save,load"}),Object(h.jsx)("div",{className:"todo",children:"Todo - preview \uad6c\uc0c1"})]})]})]})},E={canvasResizer:{position:"sticky",top:0,left:0,zIndex:1},canvasViewInfo:{position:"absolute",bottom:0,left:0,padding:"4px",fontSize:"12px",zIndex:1},toCenter:{padding:"3px 5px",background:"#5e7ade",color:"#fff",marginTop:"4px",borderRadius:"4px",border:0,fontSize:"12px",outline:"none",cursor:"pointer"},toScale:{marginLeft:"4px",padding:"3px 5px",background:"#7235d4",color:"#fff",marginTop:"4px",borderRadius:"4px",border:0,fontSize:"12px",outline:"none",cursor:"pointer"},presetButton:{background:"linear-gradient(rgb(84, 84, 84), rgb(64, 63, 63))",border:"1px solid rgb(31, 31, 31)",outline:"none",color:"#fff",fontSize:"12px",padding:"4px 8px",borderRadius:"4px",margin:"1px",cursor:"pointer",boxShadow:"rgba(0, 0, 0, 0.25) 1px 1px 1px"}},z=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).draw_canvasUI=U,o.state={canvasMoveState:!1,canvasViewOffsetX:0,canvasViewOffsetY:0,canvasViewScale:1,layerSizeView:!0,canvasBgColorPickerOpenYn:!1},o}return Object(s.a)(n,[{key:"drawCall",value:function(e,t,n){var o=this.props.rootComponent.state,r=o.activeLayer,a=o.activeSubData;return Object(h.jsxs)("div",{style:Object(p.a)(Object(p.a)({},T.canvas),{},{transform:"translate(calc(-50% + ".concat(this.state.canvasViewOffsetX,"px),calc(-50% + ").concat(this.state.canvasViewOffsetY,"px)) scale(").concat(this.state.canvasViewScale,")")}),className:"transparent_checker",children:[Object(h.jsx)("div",{className:"transparent_checker",style:{width:"".concat(e.width,"px"),height:"".concat(e.height,"px"),background:L.calcGradients(t,!0,n),transition:"width 0.2s, height 0.2s"}}),this.state.layerSizeView?Object(h.jsx)("div",{style:{position:"absolute",left:"".concat(a.position.x).concat(a.position.xUnit),top:"".concat(a.position.y).concat(a.position.yUnit),width:"".concat(r.size.w).concat(r.size.wUnit),height:"".concat(r.size.h).concat(r.size.hUnit),border:"1px dashed #000",color:"#000"},children:a.title}):""]})}},{key:"render",value:function(){var e=this,t=this.props.rootComponent.state,n=t.canvasInfo,o=t.layers,r=t.activeLayer;return Object(h.jsxs)("div",{style:T.container,onMouseMove:function(t){e.state.useMove&&(t=t.nativeEvent,T.canvas.transition="",e.setState({canvasViewOffsetX:e.state.canvasViewOffsetX+t.movementX,canvasViewOffsetY:e.state.canvasViewOffsetY+t.movementY}),document.body.style.cursor="move",console.log(t))},onMouseLeave:function(){return e.state.useMove?e.setState({useMove:!1}):0},onMouseUp:function(){return e.state.useMove?(e.setState({useMove:!1}),document.body.style.cursor="default"):0},onMouseDown:function(t){return 1===t.nativeEvent.button?e.setState({useMove:!0}):0},onWheel:function(t){var n=e.state.canvasViewScale-t.nativeEvent.deltaY/1e3;n<0&&(n=.01),e.setState({canvasViewScale:n}),T.canvas.transition="transform 0.1s"},children:[this.draw_canvasUI(),this.drawCall(n,o,t.bgColor,r)]})}}]),n}(r.a.Component),T={container:{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},canvas:{position:"absolute",top:"50%",left:"50%",overflow:"hidden",transition:"transform 0.01s"},itemContainer:{whiteSpace:"nowrap"}},A=n(487),F=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"ui_title",children:this.props.title})}}]),n}(r.a.Component),V=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(h.jsx)("input",{style:{width:"".concat(this.props.width||"")},type:"text",value:this.props.value,onInput:this.props.HD_onInput})}}]),n}(r.a.Component);var B,H,P,M,Y,X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"rgba(255,255,255,1)",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return{color:e,range:t}},G=function(e){if(console.log(P),P.current){var t=e.pageX-P.current.getBoundingClientRect().x,n=t/(P.current.clientWidth+16)*100;n=Math.max(Math.min(100,n),0),H.range=n,B.props.rootComponent.setState({}),console.log(t)}},W=function e(t){B.props.HD_sort(t),window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",e),requestAnimationFrame((function(){B.setState({activeIDX:B.getIndex()}),B=null,H=null,P=null}))},J=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={},o.refBar=r.a.createRef(),o}return Object(s.a)(n,[{key:"getIndex",value:function(){var e=this.props.rootComponent.state.activeSubData,t=this.props.colorData;return e.colorList.indexOf(t)}},{key:"render",value:function(){var e=this,t=this.props.rootComponent,n=t.state.activeSubData,o=this.props.colorData,r=this.props.activeYn,a=o.color;return Object(h.jsxs)("div",{style:{margin:"3px 0px",cursor:"pointer",border:r?"1px solid #5e7ade":"1px solid rgba(255,255,255,0.1)",borderRadius:"4px"},onClick:function(){return e.props.HD_active(e.getIndex())},onMouseDown:function(){return e.props.HD_active(e.getIndex())},children:[Object(h.jsx)("button",{style:q.add,onClick:function(){var r=n.colorList[e.getIndex()-1],a=o.range,i=a;r&&r.xUnit===o.xUnit&&(i=a-.5*(a-r.range));var c=new X(o.color,i);n.colorList.splice(e.getIndex(),0,c),t.setState({})},children:"+"}),Object(h.jsxs)("div",{style:{display:"flex",padding:"4px 4px 0px"},children:[Object(h.jsx)("div",{className:"transparent"===a?"transparent_checker":"",style:{background:"transparent"===a?"":a,width:"25px",height:"25px",borderRadius:"4px",border:"1px solid #000",marginRight:"10px"},onClick:function(){return e.setState({openColorPicker:o})}}),Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{width:"auto",value:o.range||0,HD_onInput:function(r){o.range=+r.target.value;for(var a=n.colorList.length;a--;)n.colorList[a]===o&&e.props.HD_active(e.getIndex());t.setState({})},HD_blur:function(t){e.props.HD_sort(t),e.props.HD_active(e.getIndex())}}),Object(h.jsx)("button",{style:q.del,onClick:function(){n.colorList.splice(e.getIndex(),1),t.setState({})},children:"Del"}),Object(h.jsx)("button",{style:q.lock,onClick:function(){},children:"Todo Lock"}),Object(h.jsxs)("div",{children:[o.color," ",Object(h.jsx)("span",{className:"todo",children:"Todo - \ub2e8\uc704\uc120\ud0dd \uc6d0\ubcf5"})]})]})]}),Object(h.jsxs)("div",{style:{margin:"8px 8px",alignItems:"center"},children:[Object(h.jsx)("div",{style:q.line,ref:this.refBar}),Object(h.jsx)("div",{style:Object(p.a)(Object(p.a)({},q.ball),{},{left:"".concat(o.range,"%"),background:r?"#5e7ade":"#fff"}),onMouseDown:function(){B=e,H=o,P=e.refBar,window.addEventListener("mousemove",G),window.addEventListener("mouseup",W)}})]}),this.state.openColorPicker?Object(h.jsxs)("div",{style:q.colorPicker,children:[Object(h.jsx)(_.a,{width:250,color:this.state.openColorPicker.color,onChange:function(n){e.state.openColorPicker.color="rgba(".concat(n.rgb.r,",").concat(n.rgb.g,",").concat(n.rgb.b,",").concat(n.rgb.a,")"),t.setState({})}}),Object(h.jsx)("div",{style:q.complete,onClick:function(){return e.setState({openColorPicker:null})},children:"\uc644\ub8cc"})]}):""]})}}]),n}(r.a.Component),q={container:{paddingTop:"10px"},colorPicker:{zIndex:1,position:"absolute",top:0,left:"50%",transform:"translate(-50% , -50%)",boxShadow:"0px 0px 16px rgba(0,0,0,0.5)",background:"#fff",borderRadius:"8px",overflow:"hidden"},complete:{padding:"4px",background:"#5e7ade",cursor:"pointer",textAlign:"center"},line:{height:"10px",background:"rgba(255,255,255,0.25)",borderRadius:"5px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 0px 10px inset",border:"1px solid rgb(31, 31, 31)"},add:{position:"absolute",width:"20px",height:"16px",lineHeight:1,top:0,right:0,background:"#5e7ade",borderRadius:"4px",color:"#fff",fontSize:"11px",border:"1px solid #000",transform:"translate(50%,-50%)",cursor:"pointer",boxShadow:"0px 0px 10px rgba(0,0,0,0.46)"},ball:{position:"absolute",height:"25px",top:"50%",borderRadius:"50%",width:"25px",border:"1px solid #000",transform:"translate(-50%,-50%)",textAlign:"center",cursor:"pointer",transition:"background 0.2s, top 0.2s, bottom 0.2s",boxShadow:"0px 0px 10px rgba(0,0,0,0.46)"},del:{fontSize:"11px",color:"#fff",background:"#5e7ade",outline:"none",border:"1px solid #000",borderRadius:"4px",height:"23px",cursor:"pointer"},lock:{fontSize:"11px",color:"#fff",background:"red",outline:"none",border:"1px solid #000",borderRadius:"4px",height:"23px",cursor:"pointer"}},K=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={activeIDX:0},o.refBar=r.a.createRef(),o}return Object(s.a)(n,[{key:"renderGradientColorList",value:function(e){var t=this,n=[],o=e.colorList.map((function(e,o){var r,a=t.state.activeIDX===o;return r="".concat(e.range,"%"),n.push(t.renderColorStep(e,o,a)),"".concat(e.color," ").concat(r)})),r="".concat(u.LINEAR,"(90deg, ").concat(o,")");return Object(h.jsx)("div",{style:{height:"55px",background:r,transition:"background 0.2s"},children:n})}},{key:"renderColorStep",value:function(e,t,n){var o;return o="".concat(e.range,"%"),Object(h.jsx)("div",{style:{position:"absolute",height:"10px",bottom:0,left:o,borderRadius:"4px",width:"4px",background:n?"#5e7ade":"#fff",border:"1px solid #000",transform:"translate(-50%,100%)",textAlign:"center",cursor:"pointer",transition:"background 0.2s, top 0.2s, bottom 0.2s",boxShadow:"0px 0px 10px rgba(0,0,0,0.46)"}})}},{key:"sortColorList",value:function(){this.props.rootComponent.state.activeSubData.colorList.sort((function(e,t){var n=e.range,o=t.range;return n>o?1:n<o?-1:0}))}},{key:"render",value:function(){var e=this,t=this.props.rootComponent,n=t.state.activeSubData;return Object(h.jsxs)("div",{style:Q.container,children:[Object(h.jsx)("div",{ref:this.refBar,className:"transparent_checker",style:{border:"1px solid rgba(0,0,0,1)"},children:this.renderGradientColorList(n)}),Object(h.jsx)("div",{style:{marginTop:"20px"},children:n.colorList.map((function(n,o){return Object(h.jsx)(J,{rootComponent:t,colorData:n,activeYn:e.state.activeIDX===o,HD_active:function(t){e.setState({activeIDX:t})},HD_sort:function(){e.sortColorList()}})}))})]})}}]),n}(r.a.Component),Q={container:{paddingTop:"10px"}},Z=100,$=function(e){M.calcSize(e)},ee=function e(){window.removeEventListener("mousemove",$),window.removeEventListener("mouseup",e)},te=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).refRect=r.a.createRef(),o}return Object(s.a)(n,[{key:"calcSize",value:function(e){var t=M.props.rootComponent,n=t.state,o=n.activeSubData,r=n.activeLayer.size,a=n.canvasInfo,i=M.refRect.current.getBoundingClientRect(),c=e.pageX-i.x,s=e.pageY-i.y,l="%"===r.wUnit?a.width*r.w/100:r.w,d="%"===r.hUnit?a.height*r.h/100:r.h,p="%"===o.position.xUnit?c/Z*100:c*l/Z,u="%"===o.position.yUnit?s/Z*100:s*d/Z;o.position.x=p,o.position.y=u,t.setState({})}},{key:"render",value:function(){var e=this,t=this.props.rootComponent.state,n=t.activeSubData,o=t.activeLayer.size,r=n.position,a=t.canvasInfo,i="%"===o.wUnit?a.width*o.w/100:o.w,c="%"===o.hUnit?a.height*o.h/100:o.h,s="%"===r.xUnit?r.x/100*Z%100:r.x/i*100%100,l="%"===r.yUnit?r.y/100*Z%100:r.y/c*100%100;return s<0&&(s=100+s),l<0&&(l=100+l),Object(h.jsx)("div",{children:Object(h.jsx)("div",{ref:this.refRect,className:"grid",style:ne.box,onMouseDown:function(){M=e,window.addEventListener("mousemove",$),window.addEventListener("mouseup",ee)},onClick:function(t){M=e,e.calcSize(t.nativeEvent)},children:Object(h.jsx)("div",{style:Object(p.a)(Object(p.a)({},ne.degreeItem),{},{top:"".concat(l,"%"),left:"".concat(s,"%")})})})})}}]),n}(r.a.Component),ne={box:{display:"inline-block",margin:"5px",width:"".concat(Z,"px"),height:"".concat(Z,"px"),border:"1px solid #5e7ade",borderRadius:"4px",cursor:"pointer"},degreeItem:{width:"10px",height:"10px",border:"1px solid #5e7ade",borderRadius:"50%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}},oe=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={},o}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.rootComponent,t=e.state.activeSubData;return Object(h.jsxs)("div",{children:["Type",Object(h.jsx)(v,{value:t.type.split("-")[0].toUpperCase(),options:Object.keys(u),HD_change:function(n){t.type=u[n.target.value],e.setState({})}})]})}}]),n}(r.a.Component),re=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={},o}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.rootComponent,t=e.state.activeSubData;return Object(h.jsxs)("div",{children:["Start Position",Object(h.jsxs)("div",{children:[Object(h.jsx)(j,{width:"80px",value:t.position.x||0,HD_onInput:function(n){t.position.x=n.target.value,e.setState({})}}),Object(h.jsx)(v,{value:t.position.xUnit,options:["px","%"],HD_change:function(n){t.position.xUnit=n.target.value,e.setState({})}}),Object(h.jsx)(j,{width:"80px",value:t.position.y||0,HD_onInput:function(n){t.position.y=n.target.value,e.setState({})}}),Object(h.jsx)(v,{value:t.position.yUnit,options:["px","%"],HD_change:function(n){t.position.yUnit=n.target.value,e.setState({})}})]})]})}}]),n}(r.a.Component),ae=function(e){Y.calcDegree(e)},ie=function e(){window.removeEventListener("mousemove",ae),window.removeEventListener("mouseup",e)},ce=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).refCenter=r.a.createRef(),o}return Object(s.a)(n,[{key:"calcDegree",value:function(e){var t=Y.props.rootComponent,n=t.state.activeSubData,o=Y.refCenter.current.getBoundingClientRect(),r=e.pageX-(o.x+o.width/2),a=e.pageY-(o.y+o.height/2),i=Math.atan2(a,r);n.deg=180*i/Math.PI,n.deg+=90,n.deg<0&&(n.deg+=360),n.deg=n.deg%360,t.setState({})}},{key:"render",value:function(){var e=this,t=this.props.rootComponent,n=t.state.activeSubData,o=n.deg;return Object(h.jsx)("div",{children:n.type===u.LINEAR?Object(h.jsxs)(h.Fragment,{children:["Deg ",Object(h.jsx)(j,{width:"71px",value:o||0,HD_onInput:function(e){n.deg=e.target.value,t.setState({})}}),Object(h.jsx)("div",{style:{textAlign:"center"},children:Object(h.jsxs)("div",{style:se.box,onMouseDown:function(){Y=e,window.addEventListener("mousemove",ae),window.addEventListener("mouseup",ie)},onClick:function(t){Y=e,e.calcDegree(t.nativeEvent)},children:[Object(h.jsx)("div",{style:se.centerItem,ref:this.refCenter}),Object(h.jsx)("div",{style:Object(p.a)(Object(p.a)({},se.degreeItem),{},{top:"calc(50% + ".concat(50*Math.sin(Math.PI/180*(o-90))/3,"px)"),left:"calc(50% + ".concat(50*Math.cos(Math.PI/180*(o-90))/3,"px)")})})]})})]}):""})}}]),n}(r.a.Component),se={box:{display:"inline-block",margin:"5px",width:"".concat(50,"px"),height:"".concat(50,"px"),border:"1px solid #5e7ade",borderRadius:"50%",cursor:"pointer"},centerItem:{width:"5px",height:"5px",background:"#5e7ade",borderRadius:"50%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"},degreeItem:{width:"10px",height:"10px",border:"1px solid #5e7ade",borderRadius:"50%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}},le=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){return Object(c.a)(this,n),t.call(this,e)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.rootComponent,t=e.state.activeSubData;return Object(h.jsxs)("div",{children:["Repeat",Object(h.jsx)(v,{value:t.repeatType.replace("-","_").toUpperCase(),options:Object.keys(C),HD_change:function(n){t.repeatType=C[n.target.value],e.setState({})}})]})}}]),n}(r.a.Component),de=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.rootComponent,t=e.state,n=t.activeLayer,o=t.activeSubData;return Object(h.jsxs)("div",{style:pe.container,children:[Object(h.jsx)(F,{title:"RedPropertyEdit"}),Object(h.jsxs)("div",{style:pe.contentWrap,children:[Object(h.jsx)("div",{children:Object(h.jsxs)("div",{style:Object(p.a)(Object(p.a)({},pe.itemContainer),{},{display:"flex"}),children:[Object(h.jsxs)("div",{style:{flexGrow:100,marginRight:"5px"},children:[Object(h.jsx)("div",{children:"Title"}),Object(h.jsx)(V,{width:"calc(100% - 4px)",value:o.title,HD_onInput:function(t){o.title=t.target.value,e.setState({})}}),Object(h.jsx)(oe,{rootComponent:e}),Object(h.jsx)(re,{rootComponent:e}),Object(h.jsx)(le,{rootComponent:e}),Object(h.jsx)("div",{className:"todo",children:"TODO - Radial\uc77c\ub54c \uc13c\ud130 \ud3ec\uc9c0\uc158? \uc124\uc815\ubd84\ub9ac\ud574\uc57c\ud568 "}),Object(h.jsx)("div",{className:"todo",children:"TODO - conic \ud0c0\uc785\ucd94\uac00 "})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:"Start Position"}),Object(h.jsx)(te,{rootComponent:e}),Object(h.jsx)("div",{style:{height:"5px"}}),Object(h.jsx)(ce,{rootComponent:e})]})]})}),Object(h.jsxs)("div",{style:pe.itemContainer,children:["Gradient ColorRange",Object(h.jsx)(K,{rootComponent:e})]}),Object(h.jsxs)("div",{style:pe.itemContainer,children:[Object(h.jsx)("div",{children:"Current Data"}),Object(h.jsx)(A.a,{language:"css",wrapLongLines:"pre",children:JSON.stringify(L.calcGradientItem(o,!1,n)).replace(/"/g,"")}),Object(h.jsx)(A.a,{language:"javascript",wrapLongLines:"pre",children:JSON.stringify(o,null,2)})]})]})]})}}]),n}(r.a.Component),pe={container:{width:"350px",borderRight:"1px solid #000",overflowX:"hidden",overflowY:"auto"},contentWrap:{padding:"10px 10px"},layer:{height:"30px"},itemContainer:{padding:"4px 0px",borderBottom:"1px solid rgba(0,0,0,0.5)"}},ue=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={canvasInfo:{width:300,height:300},activeLayer:null,activeSubData:null,bgColor:"#fff",layers:[{title:"testLayer sdfsdfsdfsdf",visible:!0,openYn:!0,size:{w:100,wUnit:"px",h:100,hUnit:"px"},items:[{title:"test1",type:"linear-gradient",repeatType:"repeat",deg:45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},colorList:[{color:"transparent",range:0},{color:"transparent",range:24.1867043847},{color:"#FFEA53",range:25.6011315417},{color:"#FFEA53",range:25.6011315417},{color:"transparent",range:25.6011315417},{color:"transparent",range:74.3988684583},{color:"#FFEA53",range:74.3988684583},{color:"#FFEA53",range:75.8132956153},{color:"transparent",range:75.8132956153},{color:"transparent",range:100}]},{title:"test2",type:"linear-gradient",repeatType:"repeat",deg:-45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},colorList:[{color:"transparent",range:0},{color:"transparent",range:24.1867043847},{color:"#FFEA53",range:25.6011315417},{color:"#FFEA53",range:25.6011315417},{color:"transparent",range:25.6011315417},{color:"transparent",range:74.3988684583},{color:"#FFEA53",range:74.3988684583},{color:"#FFEA53",range:75.8132956153},{color:"transparent",range:75.8132956153},{color:"transparent",range:100}]},{title:"test3",type:"linear-gradient",repeatType:"repeat",deg:45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},colorList:[{color:"#8F225C",range:0},{color:"#8F225C",range:12.4469589816},{color:"#FFEA53",range:12.4469589816},{color:"#FFEA53",range:13.8613861386},{color:"transparent",range:13.8613861386},{color:"transparent",range:86.1386138614},{color:"#FFEA53",range:86.1386138614},{color:"#FFEA53",range:87.5530410184},{color:"#8F225C",range:87.5530410184},{color:"#8F225C",range:100}]}]},{title:"testLayer ",visible:!0,openYn:!0,size:{w:50,wUnit:"px",h:50,hUnit:"px"},items:[{title:"test",type:"radial-gradient",repeatType:"no-repeat",deg:45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},colorList:[{color:"rgba(255,255,0,0.9)",range:25},{color:"rgba(255,0,0,0.5)",range:55},{color:"transparent",range:75},{color:"transparent",range:100}]}]}]},o.state.activeLayer=o.state.layers[0],o.state.activeSubData=o.state.activeLayer.items[0],o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.setState({})}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"frame",children:[Object(h.jsxs)("div",{className:"frame_main_menu",children:["frame Main Menu",Object(h.jsx)("div",{style:be.test,children:"\uc5ec\uae30\ub2e4\uac00 \uba54\ub274\ub97c \ub9cc\ub4e4\uc5b4\uc57c\uaca0\ub139"}),Object(h.jsx)("div",{style:be.test,children:"\ub2e8\ucd95\ud0a4\ub3c4 \ud574\uc57c\ud558\ub098 -_-"}),Object(h.jsx)("div",{style:be.test,children:"\uc5f4\uae30"}),Object(h.jsx)("div",{style:be.test,children:"\uc800\uc7a5"}),Object(h.jsx)("div",{style:be.test,children:"\uc5b8\ub450/\ub9ac\ub450"})]}),Object(h.jsxs)("div",{className:"frame_toolbar",children:["frame ToolBar",Object(h.jsx)("div",{style:be.test,children:"\ud234\ubc14 \uc544\uc774\ud15c"}),Object(h.jsx)("div",{style:be.test,children:"\ud234\ubc14 \uc544\uc774\ud15c"})]}),Object(h.jsx)("div",{className:"frame_middle",children:Object(h.jsxs)("div",{className:"frame_middle_container",children:[Object(h.jsxs)("div",{className:"frame_left",children:["frame Left",Object(h.jsx)("div",{className:"todo",children:"\ud504\ub9ac\uc14b\uacf5\uac04"}),Object(h.jsx)("div",{className:"todo",children:"Todo - Rect"}),Object(h.jsx)("div",{className:"todo",children:"Todo - Circle"}),Object(h.jsx)("div",{className:"todo",children:"Todo - Line"}),Object(h.jsx)("div",{className:"todo",children:"Todo - Etc"})]}),Object(h.jsx)("div",{className:"frame_center",children:Object(h.jsx)(z,{rootComponent:this})}),Object(h.jsx)("div",{className:"frame_right",children:Object(h.jsxs)("div",{style:{display:"flex",height:"100%"},children:[Object(h.jsx)(L,{rootComponent:this}),this.state.activeSubData?Object(h.jsx)(de,{rootComponent:this}):""]})})]})}),Object(h.jsxs)("div",{className:"frame_bottom",style:{height:"500px",maxHeight:"500px",overflow:"auto"},children:["frame Bottom",Object(h.jsx)("div",{style:be.test,children:"\uacb0\uacfc \ud14c\uc2a4\ud2b8"}),Object(h.jsx)(A.a,{language:"css",wrapLongLines:"pre",children:JSON.stringify(L.calcGradients(this.state.layers),null,2,this.state.bgColor)})]}),Object(h.jsxs)("div",{className:"frame_status",children:["frame Status",Object(h.jsx)("div",{style:be.test,children:"\uc0c1\ud0dc \uc544\uc774\ud15c"}),Object(h.jsx)("div",{style:be.test,children:"\uc0c1\ud0dc \uc544\uc774\ud15c"})]})]})}}]),n}(r.a.Component),be={test:{background:"#5e7ade",margin:"1px"}},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,488)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),o(e),r(e),a(e),i(e)}))};i.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(ue,{})}),document.getElementById("root")),xe()}},[[485,1,2]]]);
//# sourceMappingURL=main.57ae4cc3.chunk.js.map