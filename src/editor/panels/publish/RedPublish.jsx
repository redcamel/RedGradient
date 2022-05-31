import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport} from "@fortawesome/free-solid-svg-icons";
import './RedPublish.css'
import RedWindow from "../../basicUI/window/RedWindow";
import ContextWindows from "../../contexts/window/ContextWindows";
import {useContext, useEffect} from "react";
import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey";
import PARSER_CONTAINER_CSS from "../../contexts/system/PARSER_CONTAINER_CSS";
import calcLayerGradient from "../layer/calcLayerGradient";
import calcLayerGradientBlendMode from "../layer/calcLayerGradientBlendMode";
import getCalcedContainerEditorLayoutInfo_pixel from "../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel";
import ContextGradient from "../../contexts/system/ContextGradient";
import RedCssPreview from "../css/RedCssPreview";
import {toast} from "react-toastify";
import RedToastSkin from "../../core/RedToastSkin";

const RedPublish = () => {
	const {actions: windowActions} = useContext(ContextWindows)
	const HD_Publish = () => {
		windowActions.addWindow({
			contents: <RedWindow><RedPublishContents/></RedWindow>
		})
	}
	return <div className={'RedPublishButton'} onClick={HD_Publish}>
		<FontAwesomeIcon icon={faFileExport}/>Publish
	</div>
}

export default RedPublish

const RedPublishContents = () => {
	const {actions: windowActions} = useContext(ContextWindows)
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const calcedLayoutSize = getCalcedContainerEditorLayoutInfo_pixel(state, 1)

	const getCode = (viewKey) => {
		const targetView = state.canvasInfo[viewKey]
		return [
			PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'container'),
			PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'border'),
			PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'filter'),
		].join(' ')
	}
	const getGradientCode = (viewKey) => {
		const targetView = state.canvasInfo[viewKey]
		const current_LayoutInfo = calcedLayoutSize[viewKey]
		return {
			background: targetView.layerGroupInfo.groupList.map(v => {
				return v['visibleYn'] ? v.children.map((v2, layerIndex) => {
					return v2['visibleYn'] ? calcLayerGradient(v2, state.timelineInfo.time, current_LayoutInfo, 1) : null
				}).filter(Boolean).join(',') : null
			}).filter(Boolean).join(',') + `, ${targetView.containerInfo['backgroundColor']}`,
			backgroundBlendMode: calcLayerGradientBlendMode(targetView.layerGroupInfo.groupList)
		}
	}
	const makeCssText = PARSER_CONTAINER_CSS.makeCssText
	const resultCss = [
		`.red_gradient_result_css {${getCode(ConstCanvasViewKey.MAIN)};${makeCssText(getGradientCode(ConstCanvasViewKey.MAIN))}}`,
		`.red_gradient_result_css::before {content:"";${getCode(ConstCanvasViewKey.BEFORE)};${makeCssText(getGradientCode(ConstCanvasViewKey.BEFORE))}}`,
		`.red_gradient_result_css::after {content:"";${getCode(ConstCanvasViewKey.AFTER)};${makeCssText(getGradientCode(ConstCanvasViewKey.AFTER))}}`,
	].join('\n')
	document.getElementById('red_gradient_result').textContent = resultCss
	useEffect(() => {

	}, [])
	return <div className={'RedPublishRoot'}>
		<div className={'RedPublishContainerParent'}>
			<div className={'RedPublishContainer'}>
				<div className={'RedPublishBoxList'}>
					{
						Object.values(ConstCanvasViewKey).map(viewKey => {
							return <div className={'RedPublishBox'}>
								<div className={'RedPublishBoxTitle'}>{viewKey}</div>
								<RedCssPreview
									label={`${viewKey} Container Css Preview`}
									codeStr={getCode(viewKey)}
								/>
								<RedCssPreview
									label={`${viewKey} Gradient Css Preview`}
									codeStr={makeCssText(getGradientCode(viewKey))}
								/>
							</div>
						})
					}
				</div>
				<div className={'RedPublishResultBox'} style={{overflow: 'auto'}}>
					<div className={'red_gradient_result_css'}/>
				</div>
			</div>
			<div className={'RedPublishCommandBox'}>
				<div className={'RedPublishCommandBt'} onClick={() => {
					windowActions.removeLastWindow()
				}}>닫기
				</div>
				<div className={'RedPublishCommandBt'} onClick={() => {
					const tempElem = document.createElement('textarea');
					tempElem.value = resultCss
					document.body.appendChild(tempElem);
					tempElem.select();
					document.execCommand("copy");
					document.body.removeChild(tempElem);
					toast.dark(
						<RedToastSkin title={'Copy Result Css!'} text={<></>}/>
						, {
							position: 'bottom-left'
						});
				}}>Copy Result Css
				</div>
				<div className={'RedPublishCommandBt'} onClick={() => {
					const t0 = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>RedGradient</title>
    <style id="red_gradient_result">
    ${resultCss}
</style>
  </head>
  <body>
			<div class="red_gradient_result_css">    
  </body>
</html>
`
					const data = t0
					const a = document.createElement('a');
					const file = new Blob([data], {type: 'text/plane'});
					console.log('file', file)
					a.href = URL.createObjectURL(file);
					a.download = `RedGradient.html`;
					a.click();
					// var zip = new JSZip();
					// zip.file("index.html",t0);
					// zip.generateAsync({type: "blob"})
					// 	.then(function (content) {
					// 		console.log(content)
					// 		const a = document.createElement('a');
					// 		console.log('content', content)
					// 		a.href = URL.createObjectURL(content);
					// 		a.download = `RedGradient.html`;
					// 		a.click();
					// 	});
				}}>Export Html
				</div>
			</div>
		</div>
	</div>
}