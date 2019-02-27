/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';


function TodoList(props) {
  const { todo, onChange } = props;
  return (
    <ul className="todo__list">
      {
        todo.map(item => (
          <li key={item.id}>
            <label>
              <input
                disabled={item.disabled}
                type="checkbox"
                checked={item.checked}
                onChange={() => onChange(item)}
              />
              <span>{item.value}</span>
            </label>
          </li>
        ))
      }
    </ul>
  );
}

TodoList.propTypes = {
  todo: PropTypes.array,
  onChange: PropTypes.func,
};

TodoList.defaultProps = {
  todo: [],
  onChange: () => (console.log("onChange didn't pass")),
};

export default TodoList;
