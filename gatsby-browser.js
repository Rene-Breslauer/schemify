/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css";
// gatsby-browser.js
import ReactGA from "react-ga4"

const GA_ID = "G-088EW7RFFR"

// This runs once when the browser loads your app
export const onClientEntry = () => {
  ReactGA.initialize(GA_ID)
}

// This runs on every client‑side route change
export const onRouteUpdate = ({ location }) => {
  ReactGA.send({ hitType: "pageview", page: location.pathname })
}
