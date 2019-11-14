import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
export class ItemScreen extends Component {
    render() {
        const item = this.props.item
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={item ? item.description:""} placeholder="" id="first_name" type="text" className="active validate"/>
                            <label for="first_name" className="active">Description: </label>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={item ? item.assigned_to:""} id="last_name" type="text" className="validate"/>
                            <label for="last_name" className="active">Assigned To: </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="Due_date" type="date" className="datepicker" value ={item ? item.due_date:""}/>
                            <label for="Due_date" class="active">Due Date</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label>
                                    <input id="Completetd"type="checkbox" checked = {item ? item.completed: false}/>
                                    <span>Completed</span>
                            </label>
                        
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="input-field col s12">
                            <a>submit</a>
                            <a href="javascript:window.history.back(-1)" target="_self">Cancel</a>
                        </div>
                    </div>
                </form>
          </div>          
        )
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

