import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-end p-4 bg-white shadow">
      <div className="px-4 py-2 text-white bg-blue-800 rounded">
        <Link to={'/'}>Logout</Link>
      </div>
    </header>
  );
}

export default Header;
