import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
export class ItemScreen extends Component {
    state = {
        description: '',
        assigned_to: '',
        Due_date: '',
        Completetd: false,
    }
    descriptionChange = (e) =>{

        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        let attr = target.id;
        console.log(attr)
        if(this.props.item){
            if(attr == 'description'){
                this.props.item.description = target.value
            }else if(attr == 'assigned_to'){
                this.props.item.assigned_to = target.value
            }else if(attr == 'Due_date'){
                this.props.item.due_date = target.value
            }else{
                this.props.item.completed = target.checked
                
            }
        }else{
            
        }
        
          
    }
    submitPage=(e)=>{
        let ref = this.props.firestore.collection("todoLists").doc(this.props.idOfTodoLists);
        let tempItems = this.props.todoList.items
        if(this.props.item){
            let d = this.props.item.id
            let obj = {
                assigned_to: this.props.item.assigned_to,
                completed: this.props.item.completed,
                description: this.props.item.description,
                due_date: this.props.item.due_date,
                key: this.props.item.key
            }
            tempItems[d] = obj
            ref.update({
                "items" : tempItems
            }).then(console.log("Successfully update previous data"))
        }else{
            let obj = {
                assigned_to: document.getElementById("assigned_to").value,
                completed: document.getElementById("Completetd").checked ? true:false,
                description: document.getElementById("description").value,
                due_date: document.getElementById("Due_date").value,
                key: tempItems.length
            }
            tempItems[tempItems.length] = obj
            ref.update({
                "items" : tempItems
            }).then(console.log("Successfully update new Data"))
        }
        setTimeout(this.back, 500)
        //window.history.back(-1)
    }
    back=(e) =>{
        window.location.href = "http://localhost:3000/todoList/"+ this.props.idOfTodoLists

    }
    render() {
        const item = this.props.item
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if(item){
            return (
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input  value={item.description} 
                                        onChange={this.descriptionChange}
                                        placeholder="" 
                                        id="description" 
                                        type="text" 
                                        className="active validate"/>
                                <label for="first_name" className="active">Description: </label>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={item.assigned_to} 
                                    onChange={this.descriptionChange}
                                    id="assigned_to" 
                                    type="text" 
                                    className="validate"/>
                                <label for="last_name" className="active">Assigned To: </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="Due_date" 
                                    onChange={this.descriptionChange}
                                        type="date" 
                                        className="datepicker" 
                                        value ={item.due_date}/>
                                <label for="Due_date" class="active">Due Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label>
                                        <input 
                                            id="Completetd"
                                            type="checkbox" 
                                            onChange={this.descriptionChange}
                                            checked = {item.completed}/>
                                        <span>Completed</span>
                                </label>
                            
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="input-field col s12">
                                <a href ="#" onClick ={this.submitPage} target = "_self" className="waves-effect waves-light btn-small">submit
                                <i className="material-icons right">send</i></a>
                                <a href={'/todoList/'+this.props.idOfTodoLists} className="waves-effect waves-light btn-small">Cancel
                                <i className="material-icons">  cancel_schedule_send</i></a>
                            </div>
                        </div>
                    </form>
            </div>          
            )
        }else{
            return (
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input   
                                        onChange={this.descriptionChange}
                                        placeholder="" 
                                        id="description" 
                                        type="text" 
                                        className="active validate"/>
                                <label for="first_name" className="active">Description: </label>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    onChange={this.descriptionChange}
                                    id="assigned_to" 
                                    type="text" 
                                    className="validate"/>
                                <label for="last_name" className="active">Assigned To: </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="Due_date" 
                                    onChange={this.descriptionChange}
                                        type="date" 
                                        className="datepicker" 
                                        />
                                <label for="Due_date" class="active">Due Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label>
                                        <input 
                                            id="Completetd"
                                            type="checkbox" 
                                            onChange={this.descriptionChange}
                                            />
                                        <span>Completed</span>
                                </label>
                            
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="input-field col s12">
                            <a href ="#" onClick ={this.submitPage} target = "_self" className="waves-effect waves-light btn-small">submit
                                <i className="material-icons right">radio_button_checked</i></a>
                                <a href={'/todoList/'+this.props.idOfTodoLists} className="waves-effect waves-light btn-small">Cancel
                                <i className="material-icons">  radio_button_unchecked</i></a>
                            </div>
                        </div>
                    </form>
            </div>          
            )
        }
    }
}


const mapStateToProps = (state,ownProps) => {
    const{ id } = ownProps.match.params;
    const{ url } = ownProps.match;
    const idOfTodoLists = url.split("/")[2]
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[idOfTodoLists] : null;
    const item = todoList ? todoList.items[id] : null;
    
    if(item)
        item.id = id;
    // const{items} = state.firestore.ordered;
    // const item = items ? items[id] : undefined
    return {
      item,
      idOfTodoLists,
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
)(ItemScreen);

