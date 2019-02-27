import React from 'react';
import PropTypes from 'prop-types';

function AddItem(props) {
  const { onChange, addItem, inputValue } = props;
  return (
    <>
      <input
        className="form-Add-Item__input"
        type="text"
        placeholder="add new todo here"
        value={inputValue}
        onChange={onChange}
      />
      <input
        className="form-Add-Item__btn"
        type="submit"
        value="add"
        onClick={(event) => {
          event.preventDefault();
          addItem();
        }}
      />
    </>
  );
}

AddItem.propTypes = {
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  addItem: PropTypes.func,
};

AddItem.defaultProps = {
  inputValue: '',
  addItem: () => (console.log("addItem didn't pass")),
  onChange: () => (console.log("onChange didn't pass")),
};

export default AddItem;
