import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import "./App.css";

const AppFunction = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [inputEditValue, setInputEditValue] = useState("");
    const [editingTodoId, setEditingTodoId] = useState("");

    const handleOnChange = (e) => {
        const { value } = e.target;
        setInputValue(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const addTodo = (e) => {
        e.preventDefault();

        if (inputValue.length <= 1) {
            setInputValue(true);
            return;
        }

        const newTodo = {
            id: uuid(),
            text: inputValue,
            isDone: false
        };

        setTodos((prevTodos) => {
            const copyTodos = [...prevTodos, newTodo];
            return copyTodos;
        });
        setInputValue("");
    };

    const updateTodo = (isDone, todoId) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) => {
                if (todo.id === todoId) {
                    const copy = { ...todo, isDone: isDone };
                    return copy;
                }
                return todo;
            });
            return updatedTodos;
        });
    };

    const deleteTodo = (todoId) => {
        setTodos((prevTodos) => {
            const keptTodos = prevTodos.filter((todo) => todo.id !== todoId);
            return keptTodos;
        });
    };

    const editTodo = (todoId) => {
        setShowEditModal(true);
        let todoText = "";
        for (const todo of todos) {
            if (todo.id === todoId) {
                todoText = todo.text;
                break;
            }
        }

        setInputEditValue(todoText);
        setEditingTodoId(todoId);
    };

    const handleInputEdit = (e) => {
        setInputEditValue(e.target.value);
    };

    const submitEdit = () => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) => {
                if (todo.id === editingTodoId) {
                    const copy = { ...todo, text: inputEditValue };
                    return copy;
                }
                return todo;
            });
            return updatedTodos;
        });
        setShowEditModal(false);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <main>
            <h1>Todo List</h1>
            <form onSubmit={addTodo}>
                <div className="form-control">
                    <input
                        onChange={handleOnChange}
                        value={inputValue}
                        type="text"
                        placeholder="What is your mind"
                    />
                    <input type="submit" value="Add Todo" />
                    {inputError && (
                        <span className="error-message">Invalid Todo!</span>
                    )}
                </div>
            </form>
            <ul>
                {todos.length >= 1 &&
                    todos.map((todo) => {
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
                                        updateTodo(e.target.checked, todo.id);
                                    }}
                                />

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        deleteTodo(todo.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        editTodo(todo.id);
                                    }}
                                >
                                    Edit
                                </button>
                            </li>
                        );
                    })}
            </ul>

            <Dialog open={showEditModal} onClose={closeEditModal}>
                <div className="edit-form">
                    <DialogTitle id="alert-dialog-title">Edit Todo</DialogTitle>
                    <span className="close-icon" onClick={closeEditModal}>
                        &times;
                    </span>
                    <input
                        type="text"
                        value={inputEditValue}
                        onChange={handleInputEdit}
                    />
                    <button className="save-btn" onClick={submitEdit}>
                        Save
                    </button>
                </div>
            </Dialog>
        </main>
    );
};

export default AppFunction;
