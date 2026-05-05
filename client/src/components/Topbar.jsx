import { FiMenu } from "react-icons/fi";

export default function Topbar({ title, onMenuToggle }) {
  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onMenuToggle} type="button">
        <FiMenu />
      </button>
    </header>
  );
}
