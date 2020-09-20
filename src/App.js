import React, { Component } from 'react'
import Todos from './Components/Todos'
import Head from "./Components/layout/Header"
import AddTodo from './Components/AddTodo';
import {v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './Components/pages/About';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }

  markComplete = idx => {
    this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === idx) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    //this.setState({todos: [...this.state.todos.filter( todo => todo.id !== id)] });
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  }

  addTodo = title => {
    // const newTodo = {
    //   id : uuidv4(),
    //   title : title,
    //   completed: false
    // }
    // this.setState({todos: [...this.state.todos, newTodo]});
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => {
        res.data.id = uuidv4();
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  }
  render(){
    console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Head />
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
      // <div className="App">
      //   <div className="container">
      //     <Head/>
      //     <AddTodo addTodo={this.addTodo}/>
      //     <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
      //   </div>
      // </div>
    );
  }
}
export default App;
