import React, { Fragment, useState } from "react";
import axios from "axios";

function Person({ id, firstName, lastName, address, toggleHelper }) {
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = editForm;

  const editModeHelper = () => {
    setEditMode(!editMode);
  };

  const resetState = () => {
    setEditForm({
      praenomens: firstName,
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
    editModeHelper();
  };

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://localhost:8080/api/v1/people/${id}`,
      editForm
    );
    console.log(res);
    toggleHelper();
    editModeHelper();
  };

  const onDelete = async (id) => {
    const res = await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    console.log(res);
    toggleHelper();
  };

  return (
    <div>
      {!editMode ? (
        <Fragment>
          <h1>
            {id}: {firstName + " " + lastName}
          </h1>
          <p>
            {address.number} {address.street} {address.city} {address.state}{" "}
            {address.zip}
          </p>
          <button onClick={editModeHelper}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>{" "}
        </Fragment>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            placeholder="Praenomens"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            placeholder="Cognomen"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            placeholder="Number"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            placeholder="Street"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            placeholder="City"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            placeholder="State"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            placeholder="Zip"
            onChange={onChange}
            required
          />
          <button onClick={(e) => onSubmit(e, id)}>Submit Edit</button>
          <button onClick={resetState}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
