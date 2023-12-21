//

import Link from "next/link";
import styles from "./styles.module.css";

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className={`${styles.logoCont}`}>
        <img
          className={`${styles.imgClass}`}
          src="../../images/logo_breathe.PNG"
          alt=""
        />
      </div>
    </Link>
  );
};
