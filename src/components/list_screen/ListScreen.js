import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {Modal,Button} from 'react-materialize';

var a = true;
var b = true;
var c = true;
var first_time = true;
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

    deleteList=()=>{
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);

        ref.delete().then(console.log("Successfully delete"))
        //console.log(Lists)
        
        setTimeout(this.back, 500)
    }
    back=(e) =>{
        window.location.href = "http://localhost:3000/";

    }
    order=()=>{
        var keys = Object.keys(this.props.data.todoLists);
        keys = keys.filter(item => item != this.props.todoList.id)
        
        for(let  i=0;i<keys.length;i++){
            let ref = this.props.firestore.collection("todoLists").doc(keys[i]);
            ref.update({
                'isRecent': false
            })
        }
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        ref.update({
            'isRecent': true
        })
        
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        
        if (!auth.uid) {
            return <Redirect to="/login" />;
        }
        if(!todoList)
            return <React.Fragment />
        this.order()
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
                <table>
                    <thead>
                    <tr>
                        <th className="Task" onClick ={this.sortByTask}>Task</th>
                        <th className="Due_Date" onClick ={this.sortByDue}>Due_Date</th>
                        <th className="Status" onClick ={this.sortByStatus}>Status</th>
                        <th></th>
                    </tr>
                    </thead>                    
                        <ItemsList todoList={todoList} />
                </table>
                <div>
                <a id="newListButtonPosition" class="btn-floating btn-middle waves-effect waves-light pink lighten-1" href = {'/todoList/'+todoList.id+'/temp/newItem'}>
                    <i class="material-icons">
                        add
                    </i>
                </a>
                </div>
                
                <Modal header="Delete List?" 
                        trigger={<Button className = "fixed-action-btn btn-large btn-floating pink lighten-1">
                                <i className='material-icons'>delete</i>
                                </Button>}
                        actions={
                            <div>
                              <Button modal="" waves="light" className="red" onClick={this.deleteList} >delete <i className='material-icons'>done</i></Button>
                              <Button modal="close" waves="light" className='green'>cancel <i className='material-icons'>clear</i></Button>
                            </div>
                          }
                        >  
                    <p>
                        List Name: {todoList.name}
                        <br/>
                        List Owner: {todoList.owner}
                    </p>
                    <p>
                        Are you sure you want to delete this List?
                    </p>
                </Modal>
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
    { collection: 'todoLists'},
  ]),
)(ListScreen);