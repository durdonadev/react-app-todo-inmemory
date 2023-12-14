import React from "react";
import { v4 as uuid } from "uuid";

import "./App.css";

const todos = [{ id: 1, todo: "text", isDone: true }];

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            inputValue: ""
        };
    }

    addTodo = (e) => {
        e.preventDefault();
        console.log(this.state.inputValue);
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

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputValue: value
        });
    };

    render() {
        return (
            <main>
                <form onSubmit={this.addTodo}>
                    <input
                        onChange={this.handleOnChange}
                        value={this.state.inputValue}
                        type="text"
                        placeholder="What is your mind"
                    />
                    <input type="submit" value="Add Todo" />
                </form>
            </main>
        );
    }
}

export default App;
