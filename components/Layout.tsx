import { FC } from "react";
import Container from "./Container";
// import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      {children}
      {/* <Footer /> */}
    </Container>
  );
};

export default Layout;
