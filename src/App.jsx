import { useEffect } from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Home from "@/components/Home";
import initSite from "@/lib/site";

// Same structure as the approved prototype: header, Flip menu, home, page view, page loader.
export default function App() {
  useEffect(initSite, []);
  return (
    <>
      <Header />
      <Menu />
      <Home />
      <main id="pageView" className="g" hidden></main>
      <span id="ubf" aria-hidden="true">
        <span></span>
        <span></span>
      </span>
      <div id="ub" aria-hidden="true">
        <span>
          malakagonawala.dev/<b id="ubp"></b>
          <i></i>
        </span>
        <kbd id="ent">↵</kbd>
        <span id="ubl"></span>
      </div>
      {/* R12: the letter waits 5 s before it is sent; Undo cancels it */}
      <div className="toast" id="toast">
        <p role="status" id="tst"></p>
        <span id="tn" aria-hidden="true"></span>
        <button id="undo">Undo</button>
        <ol className="stg" aria-hidden="true">
          <li>Waiting</li>
          <li>Sending</li>
        </ol>
        <i aria-hidden="true"></i>
      </div>
      <div id="cur" aria-hidden="true">
        Open
      </div>
    </>
  );
}
