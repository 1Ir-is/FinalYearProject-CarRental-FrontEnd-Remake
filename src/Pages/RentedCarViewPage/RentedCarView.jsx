import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./RentedCarView.css";
import CustomNavLinks from "../../Components/CustomNavlink/CustomNavlink";

const RentedCarView = () => {
  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: "70vh" }}>
     <CustomNavLinks />
      <hr className="mt-0 mb-4" />

      {/* DataTales Example */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Rental List</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered display nowrap" id="dataTable" cellSpacing="0" style={{ width: "100%" }}>
              <thead>
                <tr>
                    <th>Id</th>
                    <th>Vehicle Name</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Price</th>
                    <th>Pick-up Date</th>
                    <th>Return Date</th>
                    <th>Booking Date</th>
                    <th>Action</th>
                </tr>

              </thead>
              <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link className="btn btn-outline-danger">Vehicle Details</Link>
                    </td>

                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentedCarView;
