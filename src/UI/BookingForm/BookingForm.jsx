import React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';

const BookingForm = ({ submitHandler }) => {
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="name">Name</Label>
        <input type="text" placeholder="Name" name="name" id="name" required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="phone">Phone Number</Label>
        <input type="tel" placeholder="Phone Number" name="phone" id="phone" required />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="address">Address</Label>
        <input type="text" placeholder="Address" name="address" id="address" required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="email">Email</Label>
        <input type="email" placeholder="Email" name="email" id="email" required />
      </FormGroup>

      <FormGroup>
        <Label for="note">Note</Label>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Note"
          name="note"
          id="note"
        ></textarea>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="startDate">Start Date</Label>
        <input type="datetime-local" placeholder="Start Date" name="startDate" id="startDate" required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="endDate">End Date</Label>
        <input type="datetime-local" placeholder="End Date" name="endDate" id="endDate" required />
      </FormGroup>

      <Button type="submit" color="primary">Reserve Now</Button>
    </Form>
  );
};

export default BookingForm;
