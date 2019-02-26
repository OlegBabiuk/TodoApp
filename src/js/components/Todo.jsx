/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import TodoList from './TodoList';
import AddItem from './AddItem';
import FilterItems from './FilterItems';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      filterType: 'All',
      todo: [],
      todoActive: [],
      todoDone: [],
      todoArchive: [],
    };

    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.moveTotoArchive = this.moveTotoArchive.bind(this);
  }

  componentDidMount() {
    const savedTodo = JSON.parse(localStorage.getItem('todoItems'));
    this.setState({ todo: savedTodo || [] });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      todo, todoActive, todoDone,
    } = prevState;
    localStorage.setItem('todoItems', JSON.stringify(todo));
    const activ = todo.filter(item => item.checked === false);
    const done = todo.filter(item => item.checked === true);

    if (done.length !== todoDone.length || activ.length !== todoActive.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        { todoActive: [...activ], todoDone: [...done] },
      );
    }
  }

  changeCheckbox(data) {
    this.setState((prevState) => {
      const selectedItem = prevState.todo.find(item => item.id === data.id);
      selectedItem.checked = !data.checked;
      return { ...prevState };
    });
  }

  addItem() {
    const { inputValue } = this.state;

    if (!inputValue) {
      return;
    }

    const newId = new Date().getTime();
    this.setState((prevState) => {
      const newItem = {
        id: newId, value: prevState.inputValue, checked: false, disabled: false,
      };
      return { todo: [...prevState.todo, newItem], inputValue: '' };
    });
  }

  handlerInputChange(event) {
    const { target } = event;
    this.setState({ inputValue: target.value });
  }

  moveTotoArchive() {
    this.setState((prevState) => {
      const { todo, todoArchive } = prevState;
      const activ = todo.filter(item => item.checked === false);
      const archive = todo
        .filter(item => item.checked === true)
        .map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.disabled = true;
          return { ...item };
        });
      return { todo: [...activ], todoArchive: [...todoArchive, ...archive] };
    });
  }

  changeFilter(newFilterType) {
    this.setState({ filterType: newFilterType });
  }

  render() {
    const {
      todo, inputValue, filterType, todoDone, todoActive, todoArchive,
    } = this.state;
    let currenTodo = null;

    if (filterType === 'All') {
      currenTodo = todo;
    }
    if (filterType === 'Done') {
      currenTodo = todoDone;
    }
    if (filterType === 'Active') {
      currenTodo = todoActive;
    }
    if (filterType === 'Archived') {
      currenTodo = todoArchive;
    }

    return (
      <section className="todo-wrapper">
        <h2>Todo</h2>
        <div className="todo__info">
          <p>
            <span>
              {todoActive.length}
            </span>
            of
            <span>
              {todo.length}
            </span>
            remaining
          </p>
          {'['}
          <span onClick={this.moveTotoArchive}> archive </span>
          {']'}
        </div>
        <TodoList todo={currenTodo} onChange={this.changeCheckbox} />
        <form className="form-Add-Item">
          <AddItem
            addItem={this.addItem}
            onChange={this.handlerInputChange}
            inputValue={inputValue}
          />
          <FilterItems changeFilter={this.changeFilter} />
        </form>
      </section>
    );
  }
}

export default Todo;
