import React from 'react';
import TodoList from './TodoList';
import AddItem from './AddItem';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [
        { id: 'asdf1234', value: 'build an AngularJS app', checked: false },
        { id: 'dfsdf343', value: 'build an ReactJS app', checked: true },
      ],
      inputValue: '',
    };

    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.handleIinputChange = this.handleIinputChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  changeCheckbox(data) {
    this.setState((prevState) => {
      const selectedItem = prevState.todo.find(item => item.id === data.id);
      selectedItem.checked = !data.checked;
      return { ...prevState };
    });
  }

  addItem() {
    const newId = new Date().getTime();
    this.setState((prevState) => {
      const newItem = { id: newId, value: prevState.inputValue, checked: false };
      return { todo: [...prevState.todo, newItem], inputValue: '' };
    });
  }

  handleIinputChange(event) {
    const { target } = event;
    this.setState({ inputValue: target.value });
  }

  render() {
    const { todo, inputValue } = this.state;
    return (
      <section className="todo-wrapper">
        <h2>Todo</h2>
        <div className="todo__info">
          <p>2 of 2 remaining</p>
          [
          <span> archive </span>
          ]
        </div>
        <TodoList todo={todo} onChange={this.changeCheckbox} />
        <form className="form-Add-Item">
          <AddItem
            addItem={this.addItem}
            onChange={this.handleIinputChange}
            inputValue={inputValue}
          />
          <div className="form-Add-Item__filter">
            <input className="form-Add-Item__btn" type="submit" value="All" />
            <input className="form-Add-Item__btn" type="submit" value="Done" />
            <input
              className="form-Add-Item__btn"
              type="submit"
              value="Active"
            />
            <input
              className="form-Add-Item__btn"
              type="submit"
              value="Archived"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default Todo;
