import { ReactElement, FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = (): ReactElement => {
  return (
    <div className="flex border border-b border-b-gray-300 border-dashed py-4">
      <div className="container mx-auto h-full flex justify-between">
        <Link to="/">Home</Link>
        <div >
          <ul className="flex">
            <li className="ml-8">
              <Link to="/auth/register">Register</Link>
            </li>
            <li className="ml-8">
              <Link to="/auth/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
