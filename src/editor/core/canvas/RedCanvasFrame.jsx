import {useContext} from "react";
import RedCanvasWindow from "./canvasWindow/RedCanvasWindow.jsx";
import {faExpand, faFilm, faSquarePollHorizontal, faSquarePollVertical} from "@fortawesome/free-solid-svg-icons";
import RedToolTipIcon from "../../basicUI/icon/RedToolTipIcon.jsx";
import '../splitterLayout/stylesheets/index.css';
import SplitterLayout from "../splitterLayout/SplitterLayout.js";
import './RedCanvasFrame.css'
import ConstCanvasFrameLayout from "../../../data/const/ConstCanvasFrameLayout.js";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import RedDeviceInfo from "./RedDeviceInfo.jsx";

/**
 * 캔버스 프레임설정을 담당
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasFrame = () => {
	const {state: {systemFrameLayoutInfo}, actions: gradientActions} = useContext(ContextGradient)
	const {activeLayoutKey} = systemFrameLayoutInfo
	const {SINGLE, VERTICAL, HORIZON, TRIPLE} = ConstCanvasFrameLayout
	const makeGetLayout = (data) => {
		return data.viewList.map((frameViewKey, index) => {
			const activeYn = index === activeWindowIndex
			return <RedCanvasWindow
				key={frameViewKey}
				frameViewKey={frameViewKey}
				activeYn={activeYn}
				onClick={() => setActiveWindowIndex(index)}
				setLayout={value => setFrameLayoutData(index, value)}
			/>
		})
	}
	const frameInfo = {
		[SINGLE]: {
			icon: faExpand,
			toolTip: SINGLE,
			getLayout: () => makeGetLayout(systemFrameLayoutInfo[SINGLE])
		},
		[VERTICAL]: {
			icon: faSquarePollHorizontal,
			toolTip: VERTICAL,
			getLayout: () => <SplitterLayout
				vertical percentage
				primaryMinSize={10}
				secondaryMinSize={10} secondaryInitialSize={50}
			>
				{makeGetLayout(systemFrameLayoutInfo[VERTICAL])}
			</SplitterLayout>
		},
		[HORIZON]: {
			icon: faSquarePollVertical,
			toolTip: HORIZON,
			getLayout: () => <SplitterLayout
				percentage
				primaryMinSize={10}
				secondaryInitialSize={50} secondaryMinSize={10}
			>
				{makeGetLayout(systemFrameLayoutInfo[HORIZON])}
			</SplitterLayout>
		},
		[TRIPLE]: {
			icon: faFilm,
			toolTip: [TRIPLE],
			getLayout: () => <SplitterLayout
				percentage
				primaryMinSize={10}
				secondaryMinSize={10} secondaryInitialSize={50}
			>
				<SplitterLayout
					vertical percentage
					primaryMinSize={10}
					secondaryInitialSize={50} secondaryMinSize={10}
				>
					<RedCanvasWindow
						frameViewKey={systemFrameLayoutInfo[TRIPLE].viewList[0]}
						activeYn={0 === activeWindowIndex}
						onClick={() => setActiveWindowIndex(0)}
						setLayout={value => setFrameLayoutData(0, value)}
					/>
					<SplitterLayout
						vertical percentage
						primaryMinSize={10}
						secondaryInitialSize={50} secondaryMinSize={10}
					>
						<RedCanvasWindow
							frameViewKey={systemFrameLayoutInfo[TRIPLE].viewList[1]}
							activeYn={1 === activeWindowIndex}
							onClick={() => setActiveWindowIndex(1)}
							setLayout={value => setFrameLayoutData(1, value)}
						/>
					</SplitterLayout>
				</SplitterLayout>
				<RedCanvasWindow
					frameViewKey={systemFrameLayoutInfo[TRIPLE].viewList[2]}
					activeYn={2 === activeWindowIndex}
					onClick={() => setActiveWindowIndex(2)}
					setLayout={value => setFrameLayoutData(2, value)}
				/>
			</SplitterLayout>
		}
	}
	const activeWindowIndex = systemFrameLayoutInfo[activeLayoutKey]['activeWindowIndex']
	const setActiveWindowIndex = (value) => gradientActions.setActiveWindowIndex({value})
	const setFrameLayoutData = (index, value) => {
		gradientActions.setFrameLayoutData({
			layoutKey: activeLayoutKey,
			index,
			value
		})
	}
	const setActiveFrameLayoutKey = (key, icon) => gradientActions.setActiveFrameLayoutKey({key, icon})
	const entries = Object.entries(frameInfo)
	const renderWindows = () => {
		return <div className={'RedCanvasFrame_layoutContainer'} key={activeLayoutKey}>
			{frameInfo[activeLayoutKey].getLayout()}
		</div>
	}
	return (
		<div className={'RedCanvasFrame_container'}>
			<RedDeviceInfo>
				<div style={{display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'}}>
					{
						entries.map(entry => {
							const key = entry[0]
							const value = entry[1]
							return <RedToolTipIcon
								icon={value['icon']}
								activeYn={activeLayoutKey === key}
								onClick={() => setActiveFrameLayoutKey(key, value['icon'])}
								toolTip={value['toolTip']}
								key={entry}
							/>
						})
					}
				</div>
			</RedDeviceInfo>

			{renderWindows()}
		</div>
	)
}
export default RedCanvasFrame