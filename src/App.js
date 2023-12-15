import React from "react";
import { v4 as uuid } from "uuid";

import "./App.css";

const todos = [{ id: 1, todo: "text", isDone: true }];

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            inputValue: "",
            inputError: false,
            showEditModel: false,
            inputEditValue: "",
            editingTodoId: ""
        };
    }

    addTodo = (e) => {
        e.preventDefault();

        if (this.state.inputValue.length <= 1) {
            this.setState({
                inputError: true
            });
            return;
        }

        const newTodo = {
            id: uuid(),
            text: this.state.inputValue,
            isDone: false
        };

        this.setState((prevState) => {
            const copyTodos = [...prevState.todos, newTodo];
            return {
                todos: copyTodos,
                inputValue: ""
            };
        });
    };

    updateTodo = (isDone, todoId) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === todoId) {
                    const copy = { ...todo, isDone: isDone };
                    return copy;
                }
                return todo;
            });
            return {
                todos: updatedTodos
            };
        });
    };

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputValue: value
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    deleteTodo = (todoId) => {
        this.setState((prevState) => {
            const keptTodos = prevState.todos.filter((todo) => {
                return todo.id !== todoId;
            });
            return {
                todos: keptTodos
            };
        });
    };

    editTodo = (todoId) => {
        this.setState({
            showEditModel: true
        });
        let todoText = "";
        for (const todo of this.state.todos) {
            if (todo.id === todoId) {
                todoText = todo.text;
                break;
            }
        }

        this.setState({
            inputEditValue: todoText,
            editingTodoId: todoId
        });
    };

    handleInputEdit = (e) => {
        this.setState({
            inputEditValue: e.target.value
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === this.state.editingTodoId) {
                    const copy = { ...todo, text: this.state.inputEditValue };
                    return copy;
                }
                return todo;
            });
            return {
                todos: updatedTodos,
                showEditModel: false
            };
        });
    };

    render() {
        return (
            <main>
                <h1>Todo List</h1>
                <form onSubmit={this.addTodo}>
                    <div className="form-control">
                        <input
                            onChange={this.handleOnChange}
                            value={this.state.inputValue}
                            type="text"
                            placeholder="What is your mind"
                        />{" "}
                        <input type="submit" value="Add Todo" />
                        {this.state.inputError && (
                            <span className="error-message">Invalid Todo!</span>
                        )}
                    </div>
                </form>
                <ul>
                    {this.state.todos.length >= 1 &&
                        this.state.todos.map((todo) => {
                            return (
                                <li
                                    key={todo.id}
                                    className={`todo ${
                                        todo.isDone ? "todo--done" : ""
                                    }`}
                                >
                                    <span>{todo.text}</span>

                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            this.updateTodo(
                                                e.target.checked,
                                                todo.id
                                            );
                                        }}
                                    />

                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            this.deleteTodo(todo.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            this.editTodo(todo.id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </li>
                            );
                        })}
                </ul>

                {this.state.showEditModel && (
                    <div className="modal">
                        <div className="modal-content">
                            <span
                                className="close-icon"
                                onClick={this.closeEditModal}
                            >
                                &times;
                            </span>
                            <input
                                type="text"
                                value={this.state.inputEditValue}
                                onChange={this.handleInputEdit}
                            />
                            <button
                                className="save-btn"
                                onClick={this.submitEdit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
