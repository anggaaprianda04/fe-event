import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface Proptypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: Proptypes) => {
  const { title, children } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;
