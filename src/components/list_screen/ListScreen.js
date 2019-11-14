import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        data: this.props.data,
    }

    handleChange = (e) => {
        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        let attr = target.id;
        if(attr == 'name'){
            this.props.todoList.name = target.value
            this.fireUpdate(attr,target.value)
        }else{
            this.props.todoList.owner = target.value
            this.fireUpdate(attr,target.value) // Update firebase
        }


        // this.setState({[target.id]:target.value})
    }
    /**
     * @param attr- the doc we want to update
     *        data- doc's information
     * 
     */
    fireUpdate = (attr,data) =>{
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let att = attr
        ref.update({[att]:data})
    }
    
  

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
            return <React.Fragment />
        return (

            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className = "active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div className="Button_bar">
                    <div className="Task">Task</div>
                    <div className="Due_Date">Due Date</div>
                    <div className="Status">Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <div>
                <a id="newListButtonPosition" class="btn-floating btn-large waves-effect waves-light red" href = '/todoList/:id/newItem'>
                    <i class="material-icons">
                        add
                    </i>
                </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  
  if(todoList)
    todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth,
    data: state.firestore.data,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);