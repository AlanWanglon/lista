import React, { Component } from "react";
import './Main.css';
import Form from './Form'
import Tarefas from './Tarefas'


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: '',
      tarefas: [],
      index: -1,
    };

    this.inputRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefas) {
      this.setState({ tarefas });
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;    
    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }



  handleSubmit(e) {
    e.preventDefault();
    const { tarefas, index, novaTarefa } = this.state;
    const novaTarefaTrimmed = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefaTrimmed) !== -1 || novaTarefaTrimmed === '') {
      return;
    }

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefaTrimmed],
        novaTarefa: ''
      });
    } else {
      novasTarefas[index] = novaTarefaTrimmed;
      this.setState({
        tarefas: novasTarefas,
        index: -1,
        novaTarefa: ''
      });
    }
  }

  handleChange(e) {
    this.setState({ novaTarefa: e.target.value });
  }

  handleDelete(e, index) {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({ tarefas: novasTarefas });
  }

  handleEdit(e, index) {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index]
    }, () => {
      this.inputRef.current.focus();
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form 
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        inputRef={this.inputRef}
        novaTarefa={novaTarefa}
        />
        
        <Tarefas 
        tarefas={tarefas}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        />
        
      </div>
    );
  }
}
