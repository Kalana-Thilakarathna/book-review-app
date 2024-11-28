import React from "react";
import { Link, useParams } from "react-router-dom";

function Header() {
  return (
    <div className="bg-primary flex flex-row justify-between px-2 py-5">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-100" />
      </Link>
      <Link
        to="/create/"
        className="text-2xl  text-black hover:text-secondary transition-all duration-700 ease-in-out font-bold py-2 px-4 rounded"
      >
        Create
      </Link>
    </div>
  );
}

export default Header;
