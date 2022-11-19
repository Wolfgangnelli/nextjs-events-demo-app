import React from "react";
import Link from "next/link";
import { Button as BootstrapButton } from "react-bootstrap";
import styles from "./Button.module.sass";

interface Props {
  label: string;
  active?: boolean;
  disable?: boolean;
  href?: string;
  size?: "sm" | "lg";
  type?: "button" | "reset" | "submit" | undefined;
  variant?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: Props) => {
  const {
    label = "",
    href = undefined,
    icon = null,
    onClick = undefined,
    type = "button",
  } = props;

  return href ? (
    <Link href={href}>
      <BootstrapButton className={styles.btn}>
        <span>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </BootstrapButton>
    </Link>
  ) : (
    <BootstrapButton className={styles.btn} onClick={onClick} type={type}>
      <span>{label}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </BootstrapButton>
  );
};

export default Button;
