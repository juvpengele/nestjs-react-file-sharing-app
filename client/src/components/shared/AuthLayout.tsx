import { ReactElement, FC } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

type Props = {
  children: ReactElement;
};

const AuthLayout: FC<Props> = ({ children }): ReactElement => {
  return (
    <Layout>
      <div className="flex flex-col flex-1 w-2/3 mx-auto">{children}</div>
    </Layout>
  );
};

export default AuthLayout;
