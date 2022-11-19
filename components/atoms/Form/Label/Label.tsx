import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  label: string;
  htmlFor?: string;
}

const Label = (props: Props) => {
  const { label = "", htmlFor = "" } = props;

  return <Form.Label htmlFor={htmlFor}>{label}: </Form.Label>;
};

export default Label;
