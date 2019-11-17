import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

var a = true;
var b = true;
var c = true;
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

    sortByTask =(e) =>{
        console.log("Task")
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items;
        if(a){
            tempItems.sort((a, b) => (a.description > b.description) ? 1 : -1)
            a = false
        }else{
            tempItems.sort((a, b) => (a.description > b.description) ? -1 : 1)
            a = true
        }
        for(let i = 0;i<tempItems.length;i++){
            tempItems[i].key = i;
            tempItems[i].id = i;
            // delete tempItems.id;
        }
        
        ref.update({
            "items" : tempItems
        }).then(console.log("Successfully update orderBy description"))
    }
    sortByDue =() =>{
        console.log("due")
        

        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items;
        if(b){
            tempItems.sort((a, b) => (a.due_date > b.due_date) ? 1 : -1)
            b = false
        }else{
            tempItems.sort((a, b) => (a.due_date > b.due_date) ? -1 : 1)
            b = true
        }
        for(let i = 0;i<tempItems.length;i++){
            tempItems[i].key = i;
            tempItems[i].id = i;
            // delete tempItems.key;
        }
        
        ref.update({
            "items" : tempItems
        }).then(console.log("Successfully update orderBy due"))
    }
    sortByStatus =() =>{
        console.log("Task")

        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items;
        if(c){
            tempItems.sort((a, b) => (a.completed > b.completed) ? 1 : -1) // asc
            c = false
        }else{
            tempItems.sort((a, b) => (a.completed > b.completed) ? -1 : 1) // des
            c = true
        }
        for(let i = 0;i<tempItems.length;i++){
            tempItems[i].key = i;
            tempItems[i].id = i;
            // delete tempItems.key;
        }
        
        ref.update({
            "items" : tempItems
        }).then(console.log("Successfully update orderBy status"))
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

            <div className="container light-blue lighten-5">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className = "active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <nav>
                <div className="nav-wrapper grey darken-3">
                    <div className="Task" onClick={this.sortByTask}>Task</div>
                    <div className="Due_Date" onClick={this.sortByDue}>Due Date</div>
                    <div className="Status" onClick={this.sortByStatus}>Status</div>
                </div>
                </nav>
                <ItemsList todoList={todoList} />
                <div>
                <a id="newListButtonPosition" class="btn-floating btn-middle waves-effect waves-light green" href = {'/todoList/'+todoList.id+'/temp/newItem'}>
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