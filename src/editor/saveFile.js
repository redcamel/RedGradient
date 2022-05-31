import ContextProjectInfo from "./contexts/static/ContextProjectInfo";

/**
 * 파일 저장 담당
 * @param data
 */
const saveFile = (data) => {
	data = JSON.parse(JSON.stringify(data))
	data['version'] = ContextProjectInfo.version
	data['lastUpdate'] = (new Date()).getTime()
	const a = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
	console.log('file', file)
	a.href = URL.createObjectURL(file);
	a.download = `RedGradient_${data.projectName}.json`;
	a.click();

}
export default saveFile