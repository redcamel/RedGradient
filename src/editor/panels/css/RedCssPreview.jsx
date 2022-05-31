import {useEffect, useRef, useState} from "react";
import RedItemTitle from "../../basicUI/RedItemTitle.jsx";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const RedCssPreview = ({label, codeStr}) => {
	const ref = useRef()
	const [temp, setTemp] = useState()
	useEffect(() => {
		Prism.highlightElement(ref.current)
	}, []);
	useEffect(() => {
		clearTimeout(temp)
		setTemp(setTimeout(v => Prism.highlightElement(ref.current), 125))
		return () => clearTimeout(temp)
	}, [codeStr]);
	return <div>
		<RedItemTitle label={label} flexGrow={1}/>
		<div style={{whiteSpace: 'normal', wordBreak: 'break-word'}}>
      <pre>
        <code
					className="language-css" ref={ref}
					style={{fontFamily: `'Open Sans', sans-serif`, overflowX: 'hidden', whiteSpace: 'pre-line'}}
				>
          {codeStr}
        </code>
      </pre>
		</div>
	</div>
}
export default RedCssPreview