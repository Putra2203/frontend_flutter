import axios from "axios";

function Header() {
  return (
    <header className="flex justify-end p-4 bg-white shadow">
      <button className="px-4 py-2 text-white bg-blue-800 rounded">
        Logout
      </button>
    </header>
  );
}

export default Header;
