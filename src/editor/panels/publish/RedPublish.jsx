import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport} from "@fortawesome/free-solid-svg-icons";
import './RedPublish.css'
import RedWindow from "../../basicUI/window/RedWindow";
import ContextWindows from "../../contexts/window/ContextWindows";
import {useContext, useEffect} from "react";
import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey";
import PARSER_CONTAINER_CSS from "../../contexts/system/PARSER_CONTAINER_CSS";
import calcGradientLayer from "../layer/js/calcGradientLayer";
import calcLayerGradientBlendMode from "../layer/js/calcLayerGradientBlendMode";
import getCalcedContainerEditorLayoutInfo_pixel from "../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel";
import ContextGradient from "../../contexts/system/ContextGradient";
import RedCssPreview from "../css/RedCssPreview";
import {toast} from "react-toastify";
import RedToastSkin from "../../core/RedToastSkin";
import DataRedGradientLayer from "../../../data/DataRedGradientLayer";
import calcGradientGroupList from "../layer/js/calcGradientGroupList";

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
	const {state} = useContext(ContextGradient)
	const calcedLayoutSize = getCalcedContainerEditorLayoutInfo_pixel(state, 1)

	const getCode = (viewKey) => {
		const targetView = state.canvasInfo[viewKey]
		const groupList = targetView.layerGroupInfo.groupList
		if (viewKey === ConstCanvasViewKey.MAIN || (groupList.length && groupList[0].children.length && calcGradientLayer(groupList[0].children[0], 0) !== calcGradientLayer(new DataRedGradientLayer(), 0))) {
			return [
				PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'container'),
				PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'border'),
				PARSER_CONTAINER_CSS.getPreviewCss(targetView, 'filter'),
			].join(' ')
		} else {
			return ''
		}
	}
	const getGradientCode = (viewKey) => {
		const targetView = state.canvasInfo[viewKey]
		const current_LayoutInfo = calcedLayoutSize[viewKey]
		const groupList = targetView.layerGroupInfo.groupList
		if (groupList.length && groupList[0].children.length && (calcGradientLayer(groupList[0].children[0], 0) !== calcGradientLayer(new DataRedGradientLayer(), 0))) {
			return {
				background: calcGradientGroupList(targetView, current_LayoutInfo, state.timelineInfo.time, 1),
				backgroundBlendMode: calcLayerGradientBlendMode(groupList)
			}
		} else {
			return {}
		}

	}
	const makeCssText = PARSER_CONTAINER_CSS.makeCssText
	const containerStr_MAIN = getCode(ConstCanvasViewKey.MAIN)
	const containerStr_BEFORE = getCode(ConstCanvasViewKey.BEFORE)
	const containerStr_AFTER = getCode(ConstCanvasViewKey.AFTER)
	const resultCss = [
		`.red_gradient_result_css {${containerStr_MAIN};${makeCssText(getGradientCode(ConstCanvasViewKey.MAIN))}}`,
		containerStr_BEFORE ? `.red_gradient_result_css::before {content:"";${containerStr_BEFORE};${makeCssText(getGradientCode(ConstCanvasViewKey.BEFORE))}}` : '',
		containerStr_AFTER ? `.red_gradient_result_css::after {content:"";${containerStr_AFTER};${makeCssText(getGradientCode(ConstCanvasViewKey.AFTER))}}` : '',
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
							const containerStr = getCode(viewKey)
							const gradientStr = makeCssText(getGradientCode(viewKey))
							return <div className={'RedPublishBox'} style={{opacity: containerStr ? 1 : 0.25}}>
								<div className={'RedPublishBoxTitle'}>{viewKey}</div>
								<RedCssPreview
									label={`${viewKey} Container Css Preview`}
									codeStr={containerStr}
								/>
								<RedCssPreview
									label={`${viewKey} Gradient Css Preview`}
									codeStr={gradientStr}
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
							position: 'bottom-right'
						});
				}}>Copy Result Css
				</div>
				<div className={'RedPublishCommandBt'} onClick={() => {
					const newCssStr = `
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
					const a = document.createElement('a');
					const file = new Blob([newCssStr], {type: 'text/plane'});

					a.href = URL.createObjectURL(file);
					a.download = `RedGradient.html`;
					a.click();

				}}>Export Html
				</div>
			</div>
		</div>
	</div>
}