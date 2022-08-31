import { FC } from "react";
import Container from "./Container";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
