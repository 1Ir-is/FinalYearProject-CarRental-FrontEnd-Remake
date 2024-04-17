import React, { useState } from 'react';
import { Form, FormGroup, Label, Button, FormFeedback } from 'reactstrap';
import { message } from 'antd';

const BookingForm = ({ submitHandler }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [phone, setPhone] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    // Clear date error when user selects a new start date
    setDateError('');
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    // Check if end date is greater than start date
    if (startDate && new Date(e.target.value) <= new Date(startDate)) {
      setDateError('End date must be greater than start date');
    } else {
      setDateError('');
    }
  };

  const handleEndDateBlur = (e) => {
    // Check end date validity when user leaves the end date input field
    handleEndDateChange(e);
  };

  const handlePhoneChange = (e) => {
    // Allow only numeric characters in phone number field
    const phoneNumber = e.target.value;
    if (/^\d+$/.test(phoneNumber) || phoneNumber === '') {
      setPhone(phoneNumber);
    } else {
      // Display alert if non-numeric characters are entered
      message.warning('Please enter only numeric characters for the phone number');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateError) {
      // Proceed with form submission if there's no date error
      submitHandler(e);
    } else {
      // Display alert message if there's a date error
      message.warning('End date should be greater than start date');
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Label for="name">Name</Label>
        <input type="text" placeholder="Name" name="name" id="name" required/>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="phone">Phone Number</Label>
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
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
        <input
          type="datetime-local"
          placeholder="Start Date"
          name="startDate"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Label for="endDate">End Date</Label>
        <input
          type="datetime-local"
          placeholder="End Date"
          name="endDate"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          onBlur={handleEndDateBlur} // Handle blur event for immediate validation feedback
          required
        />
        {dateError && <FormFeedback>{dateError}</FormFeedback>}
      </FormGroup>

      <Button type="submit" color="primary">Reserve Now</Button>
    </Form>
  );
};

export default BookingForm;
