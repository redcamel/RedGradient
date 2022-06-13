/**
 * BoxShadow 값을 파싱함
 * @param gradientState
 */
import ConstBoxShadowType from "../../../data/const/ConstBoxShadowType.js";
import ConstFilterType from "../../../data/const/ConstFilterType.js";
import ConstBoxBorderPropertyModeType
	from "../../panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstUnitPxNumber from "../../../data/const/ConstUnitPxNumber.js";
import ConstBoxBorderModeType from "../../panels/container/cssProperty/border/ConstBoxBorderModeType.js";
import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey.js";
import ConstUnitPxPercent from "../../../data/const/ConstUnitPxPercent";
import calcGradientLayer from "../../panels/layer/js/calcGradientLayer";

const makeCssText = v => {
	const t0 = []
	Object.entries(v).forEach(v2 => {
		let key = v2[0]
		const value = v2[1]
		key = key.split('').map(v => {
			return v === v.toUpperCase() ? `-${v.toLowerCase()}` : v
		}).join('')
		t0.push(`${key} : ${value}`.trim())
	})
	return t0.join(';\n') + ';'
}
const PARSER_CONTAINER_CSS = {
	makeCssText: makeCssText,
	getPreviewCss: (targetView, previewKey) => {
		const {containerInfo, viewKey} = targetView

		const {positionInfo, sizeInfo} = containerInfo
		const mainYn = viewKey === ConstCanvasViewKey.MAIN
		const result = {
			position: mainYn ? 'relative' : 'absolute',
			// left: mainYn ? 0 : positionInfo.x + positionInfo.xUnit,
			left: positionInfo.x + positionInfo.xUnit,
			// top: mainYn ? 0 : positionInfo.y + positionInfo.yUnit,
			top: positionInfo.y + positionInfo.yUnit,
			width: sizeInfo.width + sizeInfo.widthUnit,
			height: sizeInfo.height + sizeInfo.heightUnit,
			...PARSER_CONTAINER_CSS.getBoxCss(targetView, false)
		}
		const checkList = Object.keys(result)
		switch (previewKey) {
			case 'container' :
				checkList.forEach(key => {
					if (key.includes('border') || key.includes('outline') || key.includes('filter')) delete result[key]
				})
				break
			case 'border' :
				checkList.forEach(key => {
					if (!(key.includes('border') || key.includes('outline'))) delete result[key]
				})
				break
			case 'filter' :
				checkList.forEach(key => {
					if (!key.includes('filter')) delete result[key]
				})
				break
			default :
				break;
		}
		return makeCssText(result)
	},
	getBoxCss: (targetView, forceYn, viewScale = 1) => {
		const {
			backgroundColor,
			mixBlendMode,
			boxSizing,
			boxShadowInfo,
			outlineInfo,
			borderInfo,
			filterInfo
		} = targetView.containerInfo
		const {mode: borderMode} = borderInfo

		return {
			display: targetView.viewKey === ConstCanvasViewKey.MAIN ? 'block' : 'flex',
			background: `${backgroundColor}`,
			boxSizing: boxSizing,
			mixBlendMode: mixBlendMode,
			boxShadow: PARSER_CONTAINER_CSS.getBoxShadowCss(boxShadowInfo, viewScale),
			//
			outline: PARSER_CONTAINER_CSS.getOutlineCss(outlineInfo, viewScale),
			outlineOffset: PARSER_CONTAINER_CSS.getOutlineOffsetCss(outlineInfo, viewScale),
			//
			borderRadius: PARSER_CONTAINER_CSS.getBorderRadiusCss(borderInfo.borderRadiusInfo, viewScale),
			borderWidth: PARSER_CONTAINER_CSS.getBorderWidthCss(borderInfo.borderWidthInfo, viewScale),

			borderStyle: PARSER_CONTAINER_CSS.getBorderStyleCss(borderInfo.borderStyleInfo),
			//
			...(
				borderMode === ConstBoxBorderModeType.BASIC
					? {borderColor: PARSER_CONTAINER_CSS.getBorderColorCss(borderInfo.borderColorInfo)}
					: {
						borderImageSource: calcGradientLayer(borderInfo.borderGradientInfo, undefined, undefined, viewScale, false, true),
						borderImageOutset: PARSER_CONTAINER_CSS.getBorderImageOutsetCss(borderInfo.borderImageOutsetInfo, viewScale),
						borderImageRepeat: PARSER_CONTAINER_CSS.getBorderImageRepeatCss(borderInfo.borderImageRepeatInfo),
						borderImageSlice: PARSER_CONTAINER_CSS.getBorderImageSliceCss(borderInfo.borderImageSliceInfo, viewScale),
					}
			),
			//
			...(filterInfo.length ? {filter: PARSER_CONTAINER_CSS.getFilterCss(filterInfo, forceYn)} : {})
		}
	},
	getBoxShadowCss: (boxShadowInfo, viewScale) => {
		const offsetX = boxShadowInfo['offsetX'] * viewScale
		const offsetY = boxShadowInfo['offsetY'] * viewScale
		const blur = boxShadowInfo['blur'] * viewScale
		const spread = boxShadowInfo['spread'] * viewScale
		return `${boxShadowInfo['type'] === ConstBoxShadowType.OUTSET ? '' : boxShadowInfo['type']} ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${boxShadowInfo['color']}`
	},
	getOutlineCss: (outlineInfo, viewScale) => {
		return `${outlineInfo['width'] * viewScale}px ${outlineInfo['type']} ${outlineInfo['color']}`
	},
	getOutlineOffsetCss: (outlineInfo, viewScale) => {
		return `${outlineInfo['offset'] * viewScale}px`
	},
	getBorderRadiusCss: (borderRadiusInfo, viewScale) => {
		const targetBorderRadiusData = borderRadiusInfo[borderRadiusInfo['mode']]
		if (borderRadiusInfo['mode'] === ConstBoxBorderPropertyModeType.MERGE) {
			const {borderRadius, borderRadiusUnit} = targetBorderRadiusData
			const scale = (borderRadiusUnit === ConstUnitPxPercent.PERCENT ? 1 : viewScale)
			return `${borderRadius * scale}${borderRadiusUnit}`
		} else {
			const {
				bl,
				blUnit,
				br,
				brUnit,
				tl,
				tlUnit,
				tr,
				trUnit
			} = targetBorderRadiusData
			const scaleBl = (blUnit === ConstUnitPxPercent.PERCENT ? 1 : viewScale)
			const scaleBr = (brUnit === ConstUnitPxPercent.PERCENT ? 1 : viewScale)
			const scaleTl = (tlUnit === ConstUnitPxPercent.PERCENT ? 1 : viewScale)
			const scaleTr = (trUnit === ConstUnitPxPercent.PERCENT ? 1 : viewScale)
			return `${tl * scaleTl}${tlUnit} ${tr * scaleTr}${trUnit} ${br * scaleBr}${brUnit} ${bl * scaleBl}${blUnit}`
		}
	},
	getBorderWidthCss: (borderWidthInfo, viewScale) => {
		const targetBorderWidthData = borderWidthInfo[borderWidthInfo['mode']]
		if (borderWidthInfo['mode'] === ConstBoxBorderPropertyModeType.MERGE) {
			const {borderWidth, borderWidthUnit} = targetBorderWidthData
			return `${borderWidth * viewScale}${borderWidthUnit}`
		} else {
			const {
				top,
				topUnit,
				right,
				rightUnit,
				bottom,
				bottomUnit,
				left,
				leftUnit
			} = targetBorderWidthData
			return `${top * viewScale}${topUnit} ${right * viewScale}${rightUnit} ${bottom * viewScale}${bottomUnit} ${left * viewScale}${leftUnit}`
		}
	},
	getBorderImageOutsetCss: (borderImageOutsetInfo, viewScale) => {
		const targetBorderImageOutsetData = borderImageOutsetInfo[borderImageOutsetInfo['mode']]
		const checkUnit = v => v === ConstUnitPxNumber.NUMBER ? '' : v
		if (borderImageOutsetInfo['mode'] === ConstBoxBorderPropertyModeType.MERGE) {
			const {borderImageOutset, borderImageOutsetUnit} = targetBorderImageOutsetData
			const scale = (borderImageOutsetUnit === ConstUnitPxNumber.NUMBER ? 1 : viewScale)
			return `${borderImageOutset * scale}${checkUnit(borderImageOutsetUnit)}`
		} else {
			const {
				top,
				topUnit,
				right,
				rightUnit,
				bottom,
				bottomUnit,
				left,
				leftUnit
			} = targetBorderImageOutsetData
			const scaleTop = (topUnit === ConstUnitPxNumber.NUMBER ? 1 : viewScale)
			const scaleRight = (rightUnit === ConstUnitPxNumber.NUMBER ? 1 : viewScale)
			const scaleBottom = (bottomUnit === ConstUnitPxNumber.NUMBER ? 1 : viewScale)
			const scaleLeft = (leftUnit === ConstUnitPxNumber.NUMBER ? 1 : viewScale)
			return `${top * scaleTop}${checkUnit(topUnit)} ${right * scaleRight}${checkUnit(rightUnit)} ${bottom * scaleBottom}${checkUnit(bottomUnit)} ${left * scaleLeft}${checkUnit(leftUnit)}`
		}
	},
	getBorderImageSliceCss: (borderImageSliceInfo, viewScale) => {
		const targetBorderImageSliceData = borderImageSliceInfo[borderImageSliceInfo['mode']]
		const checkUnit = v => v === ConstUnitPxNumber.NUMBER ? '' : v
		if (borderImageSliceInfo['mode'] === ConstBoxBorderPropertyModeType.MERGE) {
			const {borderImageSlice, borderImageSliceUnit, borderImageSliceFill} = targetBorderImageSliceData
			const scale = (borderImageSliceUnit === ConstUnitPxNumber.NUMBER ? Math.max(borderImageSlice * viewScale, 0.5) : borderImageSlice)
			return `${scale}${checkUnit(borderImageSliceUnit)} ${borderImageSliceFill ? 'fill' : ''}`
		} else {
			const {
				top,
				topUnit,
				right,
				rightUnit,
				bottom,
				bottomUnit,
				left,
				leftUnit,
				borderImageSliceFill
			} = targetBorderImageSliceData
			const scaleTop = (topUnit === ConstUnitPxNumber.NUMBER ? Math.max(top * viewScale, 0.5) : top)
			const scaleRight = (rightUnit === ConstUnitPxNumber.NUMBER ? Math.max(right * viewScale, 0.5) : right)
			const scaleBottom = (bottomUnit === ConstUnitPxNumber.NUMBER ? Math.max(bottom * viewScale, 0.5) : bottom)
			const scaleLeft = (leftUnit === ConstUnitPxNumber.NUMBER ? Math.max(left * viewScale, 0.5) : left)
			return `${scaleTop}${checkUnit(topUnit)} ${scaleRight}${checkUnit(rightUnit)} ${scaleBottom}${checkUnit(bottomUnit)} ${scaleLeft}${checkUnit(leftUnit)} ${borderImageSliceFill ? 'fill' : ''}`
		}
	},
	getBorderImageRepeatCss: (borderImageRepeatInfo) => {
		const {verticalRepeat, horizontalRepeat} = borderImageRepeatInfo
		return `${verticalRepeat} ${horizontalRepeat}`
	},
	getBorderStyleCss: (borderStyleInfo) => {
		const targetBorderWidthData = borderStyleInfo[borderStyleInfo['mode']]
		const {
			borderStyle = '',
			leftStyle = '',
			bottomStyle = '',
			topStyle = '',
			rightStyle = ''
		} = targetBorderWidthData
		return `${borderStyle} ${topStyle} ${rightStyle} ${bottomStyle} ${leftStyle}`.trim()
	},
	getBorderColorCss: (borderColorInfo) => {
		const targetBorderWidthData = borderColorInfo[borderColorInfo['mode']]
		const {
			borderColor = '',
			leftBorderColor = '',
			bottomBorderColor = '',
			topBorderColor = '',
			rightBorderColor = ''
		} = targetBorderWidthData
		return `${borderColor} ${topBorderColor} ${rightBorderColor} ${bottomBorderColor} ${leftBorderColor}`.trim()
	},
	getFilterCss: (filterInfo, forceYn) => {
		const result = []
		filterInfo.forEach(v => {
			const {type, setting, visibleYn} = v
			if (!visibleYn && !forceYn) return ''
			switch (type) {
				case ConstFilterType.BLUR:
					result.push(`blur(${setting['amount']}px)`)
					break;
				case ConstFilterType.BRIGHTNESS:
				case ConstFilterType.CONTRAST:
				case ConstFilterType.GRAYSCALE:
				case ConstFilterType.INVERT:
				case ConstFilterType.OPACITY:
				case ConstFilterType.SATURATE:
				case ConstFilterType.SEPIA:
					result.push(`${type}(${setting['amount']})`)
					break;
				case ConstFilterType.HUE_ROTATE:
					result.push(`${type}(${setting['deg']}deg)`)
					break;
				case ConstFilterType.DROP_SHADOW:
					result.push(`${type}(${setting['offsetX']}px ${setting['offsetY']}px ${setting['blur']}px ${setting['color']})`)
					break;
				default  :
					break
			}
		})
		return result.join(' ')
	}
}
export default PARSER_CONTAINER_CSS