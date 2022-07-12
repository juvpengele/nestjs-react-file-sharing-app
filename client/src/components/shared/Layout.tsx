import { ReactElement, FC } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }): ReactElement => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 w-full h-full flex">
        <div className="w-full flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
