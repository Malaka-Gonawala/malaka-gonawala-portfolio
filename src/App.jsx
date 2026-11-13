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
      <div id="cur" aria-hidden="true">
        Open
      </div>
    </>
  );
}
