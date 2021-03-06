import React, { useRef } from "react"
import PropTypes from "prop-types"

const cssUrl = "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";

export default function HTML(props) {
  // const linkRef = useRef(null);
  // const onLoadHandler = () => {
  //   linkRef.onLoad = null;
  //   linkRef.rel = 'stylesheet'
  //   alert('onload')
  // };

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" type="text/css" href={cssUrl} />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
