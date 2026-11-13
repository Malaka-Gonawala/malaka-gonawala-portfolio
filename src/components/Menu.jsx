// Flip menu: a PowerShell pane on phones (#menu), a tab overview on wide screens (#tabs).
const Row = () => (
  <div className="row">
    <span>EN · IT</span>
    <button className="th">Dark / Light</button>
    <span className="mono" style={{ color: "var(--sig)" }}>
      CCNA · Security + AI (planned)
    </span>
  </div>
);

export default function Menu() {
  return (
    <>
      <div id="menu" className="g" hidden>
        <div>
          <p>
            <span className="ps">PS C:\Users\Malaka&gt; </span>
            <span id="cmd"></span>
          </p>
          <nav id="ls" aria-label="Main"></nav>
          <p id="p2" hidden>
            <span className="ps">PS C:\Users\Malaka\site&gt; </span>
            <span id="cmd2"></span>
            <i className="cur"></i>
          </p>
        </div>
        <Row />
      </div>
      <nav id="tabs" aria-label="Main" hidden>
        <div className="bk"></div>
        <Row />
      </nav>
      <span className="here" id="here" aria-hidden="true">
        you are here
      </span>
    </>
  );
}
