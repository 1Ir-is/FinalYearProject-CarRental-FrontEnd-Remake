import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CustomNavLinks from '../../Components/CustomNavlink/CustomNavlink';


const FavoriteVehicleList = () => {
  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
     <CustomNavLinks />
      <hr className="mt-0 mb-4" />

      {/* DataTales Example */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Favorite List</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered display nowrap" id="dataTable" cellSpacing="0" style={{ width: '100%' }}>
              <thead>
                
                <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Vehicle Name</th>
                <th>Address</th>
                <th>Price</th>
                <th>Vehicle Type</th>
                <th>Action</th>
                </tr>
              </thead>
              <tbody>
               
                  <tr >
                    <td></td>
                    <td><img width="100" height="100" /></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link  className="btn btn-success">Delete</Link>
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

export default FavoriteVehicleList;
