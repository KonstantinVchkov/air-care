import Link from "next/link";
import React from "react";
import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    // <div className="Footer">
     
    //   <div className="secondDiv">
    //     <h2>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
    //       soluta?
    //     </h2>
    //     <Link href={"/sign-up"}>
    //     <button className="btn btn-success">Регистрирај се</button>
    //     </Link>
    //   </div>
    // </div>

    <div className={`${styles.container}`}>
      <div className="row mt-5">
        <div className="col-5 mt-5 border-right">
          <ul>
          <li>За нас</li>
          <li>Блог</li>
          <li>Полиса на приватност</li>
          <li>Легални аспекти</li>
          <li>Контакт</li>
        </ul>
        </div>
        <div className="col-7 mt-5"><h5>ТИ ВЕЛАТ ДЕКА НЕ МОЖЕШ НИШТО ?</h5><h5> ТЕ ЛАЖАТ.</h5> <h5> ДИШИ СЛОБОДНО.</h5>
        <Link href={"/sign-up"}>
        <button className="btn btn-success">Регистрирај се</button>
        </Link>
        </div>
        <div className="col-12  border-top text-center ">
          <p>Следи не на социјални мрежи</p>  
          {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
          
          </div>
      </div>
    </div>

   
  );
};

export default Footer;
