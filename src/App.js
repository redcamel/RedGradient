import './App.css';
import RedFrameStatus from "./editor/frame/RedFrameStatus";
import RedFrameTop from "./editor/frame/RedFrameTop.jsx";
import RedContextMenu from "./editor/core/contextMenu/RedContextMenu";
import ContextMenu from "./editor/contexts/contextMenu/ContextMenu";
import RedStart from "./editor/start/RedStart";
import useContextMenuReducer from "./editor/contexts/contextMenu/useContextMenuReducer";
import ContextGradient from "./editor/contexts/system/ContextGradient";
import useContextGradientReducer from "./editor/contexts/system/useContextGradientReducer";
import RedFrameCenter from "./editor/frame/RedFrameCenter";
import RedFrameRight from "./editor/frame/RedFrameRight";
import RedFrameLeft from "./editor/frame/RedFrameLeft";
import RedFrameLayout from "./editor/core/RedFrameLayout.jsx";
import RedFrameBottom from "./editor/frame/RedFrameBottom.jsx";
import ContextColorPicker from "./editor/contexts/contextColorPicker/ContextColorPicker.js";
import useContextColorPickerReducer from "./editor/contexts/contextColorPicker/useContextColorPickerReducer.js";
import RedColorPicker from "./editor/core/colorPicker/RedColorPicker.jsx";
import useContextWindowReducer from "./editor/contexts/window/useContextWindowReducer.js";
import ContextWindows from "./editor/contexts/window/ContextWindows.js";
import RedWindowRender from "./editor/basicUI/window/RedWindowRender.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const reducerMenu = useContextMenuReducer();
	const reducerGradient = useContextGradientReducer();
	const reducerColorPicker = useContextColorPickerReducer();
	const reducerWindow = useContextWindowReducer();
	console.log('reducerGradient', reducerGradient)
	// console.log(reducerColorPicker, reducerColorPicker.state.openYn)
	console.log(reducerWindow.state)
	const startYn = !reducerGradient.state
	return (
		<div className={'app_root'}>
			<ContextGradient.Provider value={reducerGradient}>
				<ContextColorPicker.Provider value={reducerColorPicker}>
					<ContextMenu.Provider value={reducerMenu}>
						<ContextWindows.Provider value={reducerWindow}>
							{
								startYn
									? <RedStart/>
									: <>
										<RedFrameLayout
											top={<RedFrameTop/>}
											left={<RedFrameLeft/>}
											center={<RedFrameCenter/>}
											right={<RedFrameRight/>}
											bottom={<RedFrameBottom/>}
											status={<RedFrameStatus/>}
										/>
										<RedContextMenu/>
									</>
							}
							<RedWindowRender/>
							<RedColorPicker/>

						</ContextWindows.Provider>
					</ContextMenu.Provider>
				</ContextColorPicker.Provider>
			</ContextGradient.Provider>
			<ToastContainer
				hideProgressBar={true}
			/>
		</div>
	);
}

export default App;