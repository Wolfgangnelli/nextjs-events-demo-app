import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { MonthOptions } from "../../../utils/types";
import { Label, Select, Button } from "../../atoms";
import styles from "./FormSearchEvents.module.sass";

interface Props {
  months: MonthOptions[];
  years: number[];
  onSearch: (year: string, month: string) => void;
}

const FormSearchEvents = (props: Props) => {
  const { months = null, years = null, onSearch = () => undefined } = props;

  const yearRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const monthRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSearch(yearRef.current.value, monthRef.current.value);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      {!!years && (
        <Form.Group>
          <Label label="Year" />
          <Select options={years} selectRef={yearRef} id="year" />
        </Form.Group>
      )}
      {!!months && (
        <Form.Group>
          <Label label="Month" />
          <Select options={months} selectRef={monthRef} id="month" />
        </Form.Group>
      )}
      <Button label="Submit" type="submit" />
    </Form>
  );
};

export default FormSearchEvents;
