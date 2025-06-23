import { FC, PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};
