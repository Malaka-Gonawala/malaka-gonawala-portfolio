// Name and "/ Section" on the left, the Flip button on the right (prototype header).
export default function Header() {
  return (
    <header className="hd g">
      <div>
        <a className="nm d" href="#top" aria-label="Malaka Gonawala, home">
          Malaka Gonawala
        </a>
        <span className="sec" id="sec" aria-live="polite">
          / Home
        </span>
      </div>
      <button
        className="flip"
        id="flip"
        aria-expanded="false"
        aria-controls="menu"
      >
        <span id="fl">Flip</span>
        <i aria-hidden="true"></i>
      </button>
    </header>
  );
}
