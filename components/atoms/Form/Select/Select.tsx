import React from "react";
import { Form } from "react-bootstrap";
import { MonthOptions } from "../../../../utils/types";

interface Props {
  options: MonthOptions[] | number[];
  name?: string;
  size?: "sm" | "lg" | undefined;
  id: string;
  selectRef?: React.MutableRefObject<HTMLSelectElement> | null;
}

const FormSelect = (props: Props) => {
  const {
    options = null,
    name = "",
    size = undefined,
    id = "",
    selectRef = null,
  } = props;

  return (
    <Form.Select size={size} id={id} name={name} ref={selectRef}>
      {!!options && !!options.length ? (
        options.map((option) =>
          typeof option === "object" ? (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ) : (
            <option key={option} value={+option}>
              {option}
            </option>
          )
        )
      ) : (
        <option>---</option>
      )}
    </Form.Select>
  );
};

export default FormSelect;
