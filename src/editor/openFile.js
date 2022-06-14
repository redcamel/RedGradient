/**
 * 파일 열기 매서드
 * @param actions
 */
import DataRedGradient from "../data/DataRedGradient";
import {toast} from "react-toastify";
import RedToastSkin from "./core/RedToastSkin";

const openFile = (actions) => {
	const a = document.createElement('input');
	a.setAttribute('accept', '.json');
	a.setAttribute('type', 'file');
	a.click();
	a.onchange = e => {

		const fileName = e.target.files[0]['name']
		let fileReader = new FileReader();
		fileReader.onload = evt => {

			requestAnimationFrame(() => {
				const checkValidate = (v, testBase) => {
					let result = v

					for (const k in testBase) {
						console.log(k)
						if (!result.hasOwnProperty(k)) {
							if (k === 'snapToContainer' || k === 'borderGradientInfo') {
								result[k] = testBase[k]
								console.log(k, '채워줌')
							} else {
								result = null
								break
							}
						} else {
							const type = typeof result[k]
							console.log(k, type)
							if (type === "object") {
								checkValidate(result[k], testBase[k])
							}
						}
					}
					return result
				}
				const testBase = new DataRedGradient()
				const result = checkValidate(JSON.parse(evt.target.result), testBase);
				// console.log(actions, result)
				if (result) {
					actions.loadData(result)
					toast.dark(
						<RedToastSkin title={'Open Gradient Project'} text={fileName}/>,
						{
							position: 'bottom-right'
						}
					);
				} else alert('RedGradient 형식의 파일이 아닙니다.');

			});
		};
		fileReader.readAsText(e.target.files[0]);
	};
}
export default openFile