import React from "react";
import { Page } from "../../organisms";

const HomeTemplate = (props: any) => {
  const { children } = props;
  return (
    <Page>
      <div>{children}</div>
    </Page>
  );
};

export default HomeTemplate;
