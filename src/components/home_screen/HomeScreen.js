import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'


class HomeScreen extends Component {
    uniqueId=()=>{
        let id = "";
        
        for(let i=0;i<20;i++){
            let letterOrDigit = Math.floor(Math.random() * 3)
            if(letterOrDigit == 0){
                id+=String.fromCharCode(65 + Math.floor(Math.random() * 26))
            }else if(letterOrDigit ==1){
                id+=String.fromCharCode(97 + Math.floor(Math.random() * 26))
            }else{
                id+=Math.floor(Math.random() * 11)
            }
        }
        return id
        
    }
    handleNewList=()=>{
        let ref = this.props.firestore.collection("todoLists");
    
        var keys = Object.keys(this.props.data.todoLists);
        for(let i=0;i<keys.length;i++){
            let docRef = this.props.firestore.collection("todoLists").doc(keys[i]);
            docRef.update({
                'isRecent':false
            })
        }
        
        let id = this.uniqueId();
        
        let obj = {
            isRecent: true,
            items:[],
            name: id,
            owner:"No owner",
    
        }
        ref.doc(id).set(obj)
        
    }
    
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">
                <div className="row ">
                    <div className="col s12 m4 ">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner" >
                            @todo<br />
                            Your List
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button waves-effect waves-light btn-large teal lighten-2" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
   
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        data: state.firestore.data
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists',orderBy:['isRecent',"desc"]},
    ]),
)(HomeScreen);