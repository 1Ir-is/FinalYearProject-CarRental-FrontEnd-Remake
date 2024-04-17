import { Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RentalDetail = () => {
  const { rentalId } = useParams();
  const [rentalDetails, setRentalDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(rentalDetails);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/GetRentalDetailsByVehicleId/${rentalId}`);
        if (response.status === 200) {
          setRentalDetails(response.data);
          setLoading(false);
        } else if (response.status === 404) {
          setRentalDetails(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching rental details:', error);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchRentalDetails();
  }, [rentalId]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    // Add more columns as needed
  ];



  return (
    <div className="container-xl px-4 mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <hr className="mt-0 mb-4"/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Renter List</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="table-responsive">
              {rentalDetails && rentalDetails.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={rentalDetails.map(rental => ({
                    key: rental.id,
                    name: rental.name,
                    email: rental.email,
                    vehicleName: rental.vehicleName,
                    note: rental.note,
                    startDate: rental.startDate,
                    endDate: rental.endDate,
                    totalPrice: rental.totalPrice,
                    // Add more data fields as needed
                  }))}
                />
              ) : (
                <p>Rental details not found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalDetail;
