(this.webpackJsonpuntitled=this.webpackJsonpuntitled||[]).push([[0],{299:function(t,e,n){"use strict";n.r(e);var i=n(1),a=n.n(i),r=n(39),c=n.n(r),s=(n(49),n(2)),o=n(3),l=n(5),d=n(4),p=(n(50),n(0)),h=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsx)("input",{style:{width:"".concat(this.props.width||"")},type:"number",value:this.props.value,onInput:this.props.HD_onInput})}}]),n}(a.a.Component),j={LINEAR:"linear-gradient",RADIAL:"radial-gradient"},u=120,b=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var t=this.props.rootComponent,e=t.state,i=e.layers,a=e.canvasInfo;return Object(p.jsxs)("div",{style:x.container,children:[Object(p.jsx)("div",{className:"todo",children:"Todo - \ub808\uc774\uc5b4 \ucd94\uac00 \uc0ad\uc81c"}),Object(p.jsx)("div",{className:"todo",children:"Todo - \ub808\uc774\uc5b4 \uadf8\ub8f9 \uc5f4\uace0\ub2eb\uae30"}),Object(p.jsx)("div",{className:"todo",children:"Todo - \ub808\uc774\uc5b4 \ubc30\uacbd \uc0c9\uc0c1 \uc124\uc815"}),i.map((function(i,r){return Object(p.jsxs)("div",{style:{opacity:i.visible?1:.5,transition:"opacity 0.2s"},children:[Object(p.jsx)("div",{className:"layerItemTitle",children:i.title}),Object(p.jsxs)("div",{className:"transparent_checker",style:{width:"".concat(u,"px"),height:"".concat(a.height/a.width*u,"px"),cursor:"pointer",borderRadius:"4px",overflow:"hidden"},onClick:function(e){return t.setState({activeData:i,activeSubData:i.items[0]})},children:[Object(p.jsx)("div",{className:"layerItem",style:{background:n.calcGradientItems(i.items)}}),Object(p.jsx)("button",{className:"layerVisible",onClick:function(e){i.visible=!i.visible,t.setState({})},children:i.visible?"on":"off"})]}),Object(p.jsx)("div",{children:i.items.map((function(r){var c=e.activeSubData===r;return Object(p.jsxs)("div",{style:{opacity:r.visible?1:.5,transition:"opacity 0.2s"},children:[Object(p.jsx)("div",{className:"layerItemSubTitle",children:r.title}),Object(p.jsxs)("div",{className:"transparent_checker",style:{width:"".concat(100,"px"),height:"".concat(a.height/a.width*100,"px"),marginLeft:"".concat(20,"px"),cursor:"pointer",borderRadius:"4px",overflow:"hidden"},onClick:function(e){return t.setState({activeData:i,activeSubData:r})},children:[Object(p.jsx)("div",{className:"layerItem",style:{background:n.calcGradientItem(r)}}),Object(p.jsx)("button",{className:"layerVisible",onClick:function(e){r.visible=!r.visible,t.setState({})},children:r.visible?"on":"off"}),Object(p.jsx)("button",{className:"layerType",children:r.type.charAt(0).toUpperCase()}),Object(p.jsx)("div",{style:c?x.activeLine:x.deActiveLine})]})]})}))})]})}))]})}}]),n}(a.a.Component);b.calcGradients=function(t,e){return t.map((function(t){return b.calcGradientItems(t.items,e,t)})).join(",")},b.calcGradientItems=function(t,e,n){return t.map((function(t){return b.calcGradientItem(t,e,n)})).join(",")},b.calcGradientItem=function(t,e,n){if(!t)return"";if(e&&!t.visible)return"linear-gradient(45deg, transparent,transparent )";if(n&&!n.visible)return"linear-gradient(45deg, transparent,transparent )";if(t.type===j.LINEAR){var i=t.colorList.map((function(t){var e=void 0===t.range?"":"".concat(t.range).concat(t.rangeUnit);return"".concat(t.color," ").concat(e)})),a=t.position?" ".concat(t.position.x).concat(t.position.xUnit," ").concat(t.position.y).concat(t.position.yUnit):"",r=t.size?" ".concat(t.size.w).concat(t.size.wUnit," ").concat(t.size.h).concat(t.size.hUnit):"";return"".concat(t.type,"(").concat(t.deg,"deg, ").concat(i,") ").concat(a," / ").concat(r)}var c=t.colorList.map((function(t){var e=void 0===t.range?"":"".concat(t.range).concat(t.rangeUnit);return"".concat(t.color," ").concat(e)})),s=t.position?" ".concat(t.position.x).concat(t.position.xUnit," ").concat(t.position.y).concat(t.position.yUnit):"",o=t.size?" ".concat(t.size.w).concat(t.size.wUnit," ").concat(t.size.h).concat(t.size.hUnit):"";return"".concat(t.type,"(").concat(c,") ").concat(s," / ").concat(o)};var v=b,x={container:{borderRight:"1px solid #000",overflowX:"hidden",overflowY:"auto",padding:"10px ".concat(6,"px")},layerItem:{height:"35px",cursor:"pointer"},activeLine:{position:"absolute",top:0,left:0,right:0,bottom:0,border:"2px solid #5e7ade",transition:"border 0.2s"},deActiveLine:{border:"2px solid transparent"}},g=[{title:"512 x 512",width:512,height:512},{title:"Google Pixel 4, 4XL",width:412,height:870},{title:"iPhone 12 Pro Max",width:428,height:926},{title:"web 1366",width:1366,height:768},{title:"web 1920",width:1920,height:1080}],O=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var t=this.props.rootComponent,e=t.state,n=e.canvasInfo,i=e.layers;return console.log(v.calcGradients(i)),Object(p.jsxs)("div",{style:m.container,children:[Object(p.jsxs)("div",{style:m.canvasResizer,children:[Object(p.jsx)(h,{value:n.width,HD_onInput:function(e){n.width=e.target.value,t.setState({})}}),Object(p.jsx)(h,{value:n.height,HD_onInput:function(e){n.height=e.target.value,t.setState({})}}),Object(p.jsx)("div",{children:g.map((function(e){return Object(p.jsx)("button",{onClick:function(i){n.width=e.width,n.height=e.height,t.setState({})},children:Object(p.jsxs)("div",{children:[e.title,"(",e.width,"x",e.height,")"]})})}))}),Object(p.jsx)("div",{className:"todo",children:"Todo - \ub808\uc774\uc5b4\ub97c display item\ud654 \uc2dc\ucf1c\uc11c... \uac1d\uccb4 \uc5d0\ub514\ud305\uc73c\ub85c\ub3c4 \uac12 \ubcc0\uacbd\ud560\uc218\uc788\ub3c4\ub85d"}),Object(p.jsx)("div",{className:"todo",children:"Todo - \ud328\uc2a4\uae30\ubc18 \ub808\uc774\uc5b4\ub3c4 \ucd94\uac00\ud574\uc57c\ud558\ub294\ub370 \uc544\uc9c1 \uc624\ubb18..."}),Object(p.jsx)("div",{className:"todo",children:"Todo - \uce94\ubc84\uc2a4 \uc2a4\ucf00\uc77c\uae30\ubc18 Viewer"})]}),Object(p.jsx)("div",{style:m.canvas,className:"transparent_checker",children:Object(p.jsx)("div",{className:"transparent_checker",style:{width:"".concat(n.width,"px"),height:"".concat(n.height,"px"),background:v.calcGradients(i,!0),transition:"width 0.2s, height 0.2s"}})})]})}}]),n}(a.a.Component),m={container:{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},canvas:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",overflow:"auto"},canvasResizer:{position:"sticky",top:0,left:0,zIndex:1}},f=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsx)("div",{className:"ui_title",children:this.props.title})}}]),n}(a.a.Component),y=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsx)("input",{style:{width:"".concat(this.props.width||"")},type:"text",value:this.props.value,onInput:this.props.HD_onInput})}}]),n}(a.a.Component),w=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(p.jsx)("select",{style:{width:"".concat(this.props.width||"","px")},onChange:this.props.HD_change,children:(this.props.options||[]).map((function(e){var n=t.props.value===e;return console.log(e,n),Object(p.jsx)("option",{value:e,selected:n,children:e})}))})}}]),n}(a.a.Component),U=n(300),C=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={activeIDX:0},i}return Object(o.a)(n,[{key:"renderGradientColorList",value:function(t){var e=this,n=[],i=t.colorList.map((function(t,i){console.log("this.state.activeIDX === index",e.state.activeIDX===i);var a=e.state.activeIDX===i,r="".concat(t.range).concat(t.rangeUnit);return n.push(e.renderColorStep(t,i,a)),"".concat(t.color," ").concat(r)})),a="".concat(j.LINEAR,"(90deg, ").concat(i,")");return Object(p.jsx)("div",{style:{height:"35px",background:a},children:n})}},{key:"renderColorStep",value:function(t,e,n){var i=this;return Object(p.jsx)("div",{style:{position:"absolute",top:"-3px",bottom:"-3px",left:"".concat(t.range||0).concat(t.rangeUnit),borderRadius:"5px",width:"10px",background:n?"#5e7ade":"#fff",border:"1px solid #000",transform:"translate(-50%,0)",textAlign:"center",cursor:"pointer"},onClick:function(t){i.setState({activeIDX:e})},children:Object(p.jsxs)("div",{style:{position:"absolute",bottom:0,transform:"translate(-25%,100%)",textAlign:"center",fontSize:"9px",whiteSpace:"nowrap"},children:[t.range," ",t.rangeUnit]})})}},{key:"render",value:function(){var t=this,e=this.props.rootComponent.state.activeSubData;return Object(p.jsxs)("div",{style:D.container,children:[Object(p.jsx)("div",{className:"transparent_checker",children:this.renderGradientColorList(e)}),Object(p.jsx)("div",{style:{marginTop:"20px"},children:e.colorList.map((function(e,n){var i=t.state.activeIDX===n;return Object(p.jsx)("div",{style:{margin:"3px",border:i?"1px solid #5e7ade":"1px solid rgba(255,255,255,0.1)",padding:"4px"},children:Object(p.jsx)("div",{style:{display:"inline-block"},children:e.color})})}))})]})}}]),n}(a.a.Component),D={container:{paddingTop:"10px"}},N=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var t=this.props.rootComponent,e=t.state.activeSubData;return Object(p.jsxs)("div",{style:I.container,children:[Object(p.jsx)(f,{title:"Red_PropertyEdit"}),Object(p.jsxs)("div",{style:I.contentWrap,children:[Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{style:I.itemContainer,children:["\ud0c0\uc774\ud2c0",Object(p.jsx)("div",{children:Object(p.jsx)(y,{width:"calc(100% - 4px)",value:e.title,HD_onInput:function(n){e.title=n.target.value,t.setState({})}})})]}),Object(p.jsxs)("div",{style:I.itemContainer,children:["Gradient ColorRange",Object(p.jsx)(C,{rootComponent:t},Math.random()),Object(p.jsx)("div",{className:"todo",children:"Todo - \uc2a4\ud15d\ucd94\uac00/\uc0ad\uc81c, \uc774\ub3d9"}),Object(p.jsx)("div",{className:"todo",children:"Todo - \uceec\ub7ec\ubd84\ud574\uc2e0\uacf5\ub3c4 \ud544\uc694\ud568"}),Object(p.jsx)("div",{className:"todo",children:"TODO - \uadf8\ub77c\ub514\uc5b8\ud2b8 \uceec\ub7ec\uc140\ub809\ud130"})]}),Object(p.jsx)("div",{style:I.itemContainer,children:Object(p.jsx)("div",{className:"todo",children:Object(p.jsx)(w,{value:e.type,options:Object.keys(j),HD_change:function(n){e.type=j[n.target.value],t.setState({})}})})}),e.type===j.LINEAR?Object(p.jsxs)("div",{style:I.itemContainer,children:["Deg ",Object(p.jsx)(h,{width:"80px",value:e.deg||0,HD_onInput:function(n){e.deg=n.target.value,t.setState({})}})]}):"",Object(p.jsxs)("div",{style:I.itemContainer,children:["Position",Object(p.jsxs)("div",{children:[Object(p.jsx)(h,{width:"80px",value:e.position.x||0,HD_onInput:function(n){e.position.x=n.target.value,t.setState({})}}),Object(p.jsx)(w,{value:e.position.xUnit,options:["px","%"],HD_change:function(n){e.position.xUnit=n.target.value,t.setState({})}}),Object(p.jsx)(h,{width:"80px",value:e.position.y||0,HD_onInput:function(n){e.position.y=n.target.value,t.setState({})}}),Object(p.jsx)(w,{value:e.position.yUnit,options:["px","%"],HD_change:function(n){e.position.yUnit=n.target.value,t.setState({})}})]})]}),Object(p.jsxs)("div",{style:I.itemContainer,children:["Size",Object(p.jsxs)("div",{children:[Object(p.jsx)(h,{width:"80px",value:e.size.w||0,HD_onInput:function(n){e.size.w=n.target.value,t.setState({})}}),Object(p.jsx)(w,{value:e.size.wUnit,options:["px","%"],HD_change:function(n){e.size.wUnit=n.target.value,t.setState({})}}),Object(p.jsx)(h,{width:"80px",value:e.size.h||0,HD_onInput:function(n){e.size.h=n.target.value,t.setState({})}}),Object(p.jsx)(w,{value:e.size.hUnit,options:["px","%"],HD_change:function(n){e.size.hUnit=n.target.value,t.setState({})}})]})]}),Object(p.jsx)("div",{className:"todo",children:"TODO - \ubc18\ubcf5 Edit"})]}),Object(p.jsxs)("div",{style:I.itemContainer,children:[Object(p.jsx)("div",{children:"Current Data"}),Object(p.jsx)(U.a,{language:"javascript",wrapLongLines:"pre",children:JSON.stringify(e,null,2)})]})]})]})}}]),n}(a.a.Component),I={container:{width:"300px",borderRight:"1px solid #000",overflowX:"hidden",overflowY:"auto"},contentWrap:{padding:"10px 10px"},layer:{height:"30px"},itemContainer:{padding:"4px 0px",borderBottom:"1px solid rgba(0,0,0,0.5)"}},S=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={canvasInfo:{width:300,height:300},activeData:null,activeSubData:null,layers:[{title:"testLayer sdfsdfsdfsdf",visible:!0,items:[{title:"leftBottom",type:"linear-gradient",deg:45,visible:!0,position:{x:30,xUnit:"px",y:30,yUnit:"px"},size:{w:30,wUnit:"%",h:30,hUnit:"%"},colorList:[{color:"rgba(255,0,0,0.9)",range:25,rangeUnit:"%"},{color:"transparent",range:25,rangeUnit:"%"},{color:"transparent",range:100,rangeUnit:"%"}]},{title:"leftTop sdfsdfsdf",type:"linear-gradient",deg:-45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},size:{w:100,wUnit:"%",h:100,hUnit:"%"},colorList:[{color:"rgba(0,255,0,0.9)",range:25,rangeUnit:"%"},{color:"transparent",range:25,rangeUnit:"%"},{color:"transparent",range:100,rangeUnit:"%"}]},{title:"test",type:"linear-gradient",deg:90,visible:!0,position:{x:30,xUnit:"px",y:30,yUnit:"px"},size:{w:30,wUnit:"%",h:30,hUnit:"%"},colorList:[{color:"rgba(255,0,0,1)",range:0,rangeUnit:"%"},{color:"rgba(0,255,255,0.1)",range:35,rangeUnit:"%"},{color:"rgba(0,255,0,1)",range:100,rangeUnit:"%"}]},{title:"rightBottom",type:"linear-gradient",deg:-45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},size:{w:100,wUnit:"%",h:100,hUnit:"%"},colorList:[{color:"transparent",range:75,rangeUnit:"%"},{color:"rgba(0,0,255,0.9)",range:75,rangeUnit:"%"}]},{title:"rightTop",type:"linear-gradient",deg:45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},size:{w:100,wUnit:"%",h:100,hUnit:"%"},colorList:[{color:"transparent",range:75,rangeUnit:"%"},{color:"rgba(255,0,255,0.9)",range:75,rangeUnit:"%"}]}]},{title:"testLayer ",visible:!0,items:[{title:"test",type:"radial-gradient",deg:45,visible:!0,position:{x:0,xUnit:"px",y:0,yUnit:"px"},size:{w:100,wUnit:"%",h:100,hUnit:"%"},colorList:[{color:"rgba(255,255,0,0.9)",range:25,rangeUnit:"%"},{color:"transparent",range:50,rangeUnit:"%"},{color:"transparent",range:100,rangeUnit:"%"}]}]}]},i.state.activeData=i.state.layers[0],i.state.activeSubData=i.state.activeData.items[0],i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setState({})}},{key:"render",value:function(){return Object(p.jsxs)("div",{className:"frame",children:[Object(p.jsxs)("div",{className:"frame_main_menu",children:["frame Main Menu",Object(p.jsx)("div",{style:k.test,children:"\ucd5c\uc0c1\uc704 \uba54\ub274\uac00 \ub4e4\uc5b4\uac10"}),Object(p.jsx)("div",{style:k.test,children:"\ud14c\uc2a4\ud2b8 \uc544\uc774\ud15c"})]}),Object(p.jsxs)("div",{className:"frame_toolbar",children:["frame ToolBar",Object(p.jsx)("div",{style:k.test,children:"\ud234\ubc14 \uc544\uc774\ud15c"}),Object(p.jsx)("div",{style:k.test,children:"\ud234\ubc14 \uc544\uc774\ud15c"})]}),Object(p.jsx)("div",{className:"frame_middle",children:Object(p.jsxs)("div",{className:"frame_middle_container",children:[Object(p.jsxs)("div",{className:"frame_left",children:["frame Left",Object(p.jsxs)("div",{style:k.test,children:["\uc774\uacf5\uac04\uc774",Object(p.jsx)("br",{}),"\ud604\uc7ac\ub294",Object(p.jsx)("br",{}),"\uc4f8\ubaa8\uc5c6\uc73c\ub098...",Object(p.jsx)("br",{}),"\uc608\ube44\ub85c...\uad6c\uc131\ud568"]})]}),Object(p.jsx)("div",{className:"frame_center",children:Object(p.jsx)(O,{rootComponent:this})}),Object(p.jsx)("div",{className:"frame_right",children:Object(p.jsxs)("div",{style:{display:"flex",height:"100%"},children:[Object(p.jsx)(v,{rootComponent:this}),this.state.activeSubData?Object(p.jsx)(N,{rootComponent:this}):""]})})]})}),Object(p.jsxs)("div",{className:"frame_bottom",children:["frame Bottom",Object(p.jsx)("div",{className:"todo",children:"Todo - Animation Timeline"}),Object(p.jsx)("div",{style:k.test,children:"\uacb0\uacfc \ud14c\uc2a4\ud2b8"}),Object(p.jsx)(U.a,{language:"javascript",wrapLongLines:"pre",children:JSON.stringify(v.calcGradients(this.state.layers),null,2)})]}),Object(p.jsxs)("div",{className:"frame_status",children:["frame Status",Object(p.jsx)("div",{style:k.test,children:"\uc0c1\ud0dc \uc544\uc774\ud15c"}),Object(p.jsx)("div",{style:k.test,children:"\uc0c1\ud0dc \uc544\uc774\ud15c"})]})]})}}]),n}(a.a.Component),k={test:{background:"#5e7ade",margin:"1px"}},_=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,301)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),i(t),a(t),r(t),c(t)}))};c.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(S,{})}),document.getElementById("root")),_()},49:function(t,e,n){},50:function(t,e,n){}},[[299,1,2]]]);
//# sourceMappingURL=main.a05d7783.chunk.js.map