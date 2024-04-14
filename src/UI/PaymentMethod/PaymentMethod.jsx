import React from "react";
import ac from "../../assets/client/static/img/ic-brakes.png";
import gps from "../../assets/client/static/img/ic-gprs.png";
import bluetooth from "../../assets/client/static/img/ic-bluetooth.png";
import usb from "../../assets/client/static/img/ic-usb.png";
import cmnd from "../../assets/client/static/img/CMND.png";
import residenceBook from "../../assets/client/static/img/ic-cmnd.png";
import drivingLicense from "../../assets/client/static/img/banglai.png";
import deposit from "../../assets/client/static/img/ic-money.png";

const PaymentMethod = () => {
  return (
    <>
      <div className="mb-md">
        <div className="booking__form d-inline-block me-4 mb-4 text-blue-900 font-bold">FEATURES</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center mb-4">
            <img src={ac} alt="Air Conditioning" className="w-8 h-8 mb-2" />
            <span>Air Conditioning</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={gps} alt="GPS Navigation" className="w-8 h-8 mb-2" />
            <span>GPS Navigation</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={bluetooth} alt="Bluetooth" className="w-8 h-8 mb-2" />
            <span>Bluetooth</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={usb} alt="USB Port" className="w-8 h-8 mb-2" />
            <span>USB Port</span>
          </div>
        </div>
      </div>

      <div className="mb-md">
        <div className="booking__form d-inline-block me-4 mb-4 text-blue-900 font-bold">PROCEDURES</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center mb-4">
            <img src={cmnd} alt="ID Card" className="w-8 h-8 mb-2" />
            <span>ID Card</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={residenceBook} alt="Residence Book" className="w-8 h-8 mb-2" />
            <span>Residence Book</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={drivingLicense} alt="Driving License" className="w-8 h-8 mb-2" />
            <span>Driving License</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <img src={deposit} alt="Deposit" className="w-8 h-8 mb-2" />
            <span>Deposit</span>
          </div>
        </div>
      </div>

      <div className="mb-md">
        <div className="booking__form d-inline-block me-4 mb-4 text-blue-900 font-bold">PAYMENT ACCEPTANCE</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center mb-4">
            <img src={deposit} alt="Pay Later" className="w-8 h-8 mb-2" />
            <span>Pay Later</span>
          </div>
        </div>
      </div>
      <div className="mb-md">
  <div className="b-tit text-blue-900 font-bold">NOTES</div>
  <div>
    <span className="mb-2 font-bold">- ID Card:</span>
    <span className="mb-2 pl-2">Original copy</span><br />
    <span className="mb-2 font-bold">- Residence Book:</span>
    <span className="mb-2 pl-2">Original copy or KT3</span><br />
    <span className="mb-2 font-bold">- Driving License:</span>
    <span className="mb-2 pl-2">Class B2 or higher</span><br />
    <span className="mb-2 font-bold">- Deposit:</span>
    <span className="mb-2 pl-2">Original vehicle + vehicle registration certificate or minimum cash deposit of 20 million</span><br />
  </div>
</div>


    </>
  );
};

export default PaymentMethod;
