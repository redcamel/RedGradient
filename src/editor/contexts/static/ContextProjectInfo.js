import React from "react";

const version = '1.0.0'
const ContextProjectInfo = React.createContext({
	projectName: 'RedGradient',
	author: 'RedCamel',
	version: version,
	email: 'webseon@gmail.com',
	github: 'https://github.com/redcamel/RedGradient',
	authorGithub: 'https://github.com/redcamel'
});
ContextProjectInfo.version = version
export default ContextProjectInfo