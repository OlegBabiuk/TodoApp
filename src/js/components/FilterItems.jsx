import React from 'react';
import PropTypes from 'prop-types';

function FilterItems(props) {
  const { changeFilter } = props;
  const handlerClick = (event) => {
    event.preventDefault();
    changeFilter(event.target.value);
  };

  return (
    <div className="form-Add-Item__filter">
      <input
        className="form-Add-Item__btn"
        type="submit"
        value="All"
        onClick={handlerClick}
      />
      <input
        className="form-Add-Item__btn"
        type="submit"
        value="Done"
        onClick={handlerClick}
      />
      <input
        className="form-Add-Item__btn"
        type="submit"
        value="Active"
        onClick={handlerClick}
      />
      <input
        className="form-Add-Item__btn"
        type="submit"
        value="Archived"
        onClick={handlerClick}
      />
    </div>
  );
}

FilterItems.propTypes = {
  changeFilter: PropTypes.func,
};

FilterItems.defaultProps = {
  changeFilter: () => (console.log("changeFilter didn't pass")),
};

export default FilterItems;
