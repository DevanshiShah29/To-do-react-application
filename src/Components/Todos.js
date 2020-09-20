import React, { Component } from 'react';
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types';


class Todos extends Component{
    render(){
        let todoVar = this.props.todos;
        return  todoVar.map((task) => (
        <TodoItem key={task.id} todo={task} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/> )
        )
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
}
  


export default Todos;
