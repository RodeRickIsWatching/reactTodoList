import React from "react"
import ReactDom  from "react-dom"
import App from "./App"
import "./utils/css/reset.css"

let dom = (<div><App/></div>)


ReactDom.render(dom, document.getElementById("root"))