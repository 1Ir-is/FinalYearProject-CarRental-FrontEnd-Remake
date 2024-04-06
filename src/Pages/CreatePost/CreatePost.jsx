import React from 'react';

const CreatePostPage = () => {
    return (
        <div className="container">
            <a href="/posts" className="btn btn-outline-danger mb-3 mt-5">
                Go back
            </a>
            <form className="user mb-5" action="/create-post" method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label>Vehicle Name</label>
                    <input type="text" name="VehicleName" className="form-control form-control-user mb-3"
                           required placeholder="Vehicle Name" />
                    <label>Fuel Type</label>
                    <input type="text" name="VehicleFuel" className="form-control form-control-user mb-3"
                           required placeholder="Fuel Type" />
                    <label>Vehicle Type</label>
                    <input type="text" name="VehicleType" className="form-control form-control-user mb-3"
                           required placeholder="Vehicle Type" />
                    <label>Manufacturing Year</label>
                    <input type="text" name="VehicleYear" className="form-control form-control-user mb-3"
                           required placeholder="Manufacturing Year" />
                    <label>Number of Seats</label>
                    <input type="text" name="VehicleSeat" className="form-control form-control-user mb-3"
                           required placeholder="Number of Seats" />
                    <label>Title</label>
                    <input type="text" name="Title" className="form-control form-control-user mb-3"
                           required placeholder="Title" />
                    <label>Description</label>
                    <input type="text" name="Description" className="form-control form-control-user mb-3"
                           required placeholder="Description" />
                    <label>Image</label>
                    <input type="file" name="Image" required placeholder="Image" />
                    <div>
                        <label>Category</label>
                        <select name="Category" required>
                            <option value="Car">Car</option>
                            <option value="Motorbike">Motorbike</option>
                        </select>
                    </div>
                    <label>Price</label>
                    <input type="text" name="Price" className="form-control form-control-user mb-3"
                           required placeholder="Price" />
                    <label>Address</label>
                    <input type="text" name="Address" className="form-control form-control-user mb-3"
                           required placeholder="Address" />
                    <label>PlaceId</label>
                    <input type="text" name="PlaceId" className="form-control form-control-user mb-3"
                           required placeholder="PlaceId" />
                    <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank">Get your address PlaceId</a>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <button type="submit" className="w-50 btn btn-primary btn-user btn-block">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage;
