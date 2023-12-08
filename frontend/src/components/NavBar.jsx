import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-4 md:px-0">
        <Link to="/">
          <h2 className=" my-1 rounded px-3 py-2 text-3xl font-semibold text-black hover:bg-black hover:text-white ">
            Brew Beans Brewery
          </h2>
        </Link>

        <div>
          <Link
            to="/add-item"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Add Item
          </Link>
          <Link
            to="/sale-checker"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Sale
          </Link>
          <Link
            to="/update-description"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Update Description
          </Link>
          <Link
            to="/tax-calculator"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Tax Calculator
          </Link>
          <Link
            to="/update-order-status"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Update Order
          </Link>
          <Link
            to="/reports"
            className="rounded px-3 py-2 font-semibold text-black hover:bg-black hover:text-white"
          >
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
