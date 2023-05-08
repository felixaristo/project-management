import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import image from "../../assets/foto-banner.jpg";
import logo from "../../assets/logo-qubisa.png";
import dls from "../../assets/poweredbydls.png";

const Thankyou = () => {
  const [code, setCode] = useState("");
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}project/attendance/detail/b7991d06-065b-4da4-a973-c5d875548cdc`,
        {
          headers: {
            Authorization:
              "Basic " +
              btoa(
                `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
              ),
          },
        }
      )
      .then((res) => {
        setCode(res.data.data);
      });
  }, []);
  return (
    <div className="d-flex justify-content-center card p-5">
      <div className="d-flex justify-content-between">
        <img src={logo} alt="" width={120} height={40} />
        <img src={dls} alt="" width={100} />
      </div>
      <h3 className="text-center">Daftar Hadir Meeting</h3>
      <h4 className="text-center fst-italic">{code.topic}</h4>
      <div className="text-center mt-3">
        <Image className="rounded img-thankyou" src={image} alt=""/>
      </div>
    </div>
  );
};

export default Thankyou;
