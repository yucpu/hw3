import React from 'react';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';



class ItemCard extends React.Component {
    
    setColor = (e) =>{
        if(e){
            //document.getElementById("Status_color").style.color = '#00FF40';
            
            // return "Completed"
            let color ={
                color:"#2e7d32"
            }
            return <div className ="completed" style ={color}>
                    Completed
                    </div>
        }else{
            //document.getElementById("Status_color").style.color = '#FF0000';
            let color = {
                color:'#FF0000'
            }
            return <div className ="completed" style = {color}>
                    isPending
                    </div>
        }
    }
    move_up = ()=> {
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items
        let id = this.props.item.key
        tempItems.forEach(element => {
            delete element.id
        });
        if(id != 0){
            let prevObj = tempItems[id-1]
            let obj = tempItems[id]
            let Obj1 = {
                assigned_to: prevObj.assigned_to,
                completed: prevObj.completed,
                description: prevObj.description,
                due_date: prevObj.due_date,
                key: obj.key
            }
            let Obj2 = {
                assigned_to: obj.assigned_to,
                completed: obj.completed,
                description: obj.description,
                due_date: obj.due_date,
                key: prevObj.key
            }
            tempItems[id-1] = Obj2
            tempItems[id] = Obj1
            ref.update({
                "items" : tempItems
            }).then(console.log("Successfully update new Data"))
        }else{
            console.log("first element")
        }
        
    }
    move_down = () => {
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items
        let id = this.props.item.key
        tempItems.forEach(element => {
            delete element.id
        });
        if(id != tempItems.length-1){
            let prevObj = tempItems[id+1]
            let obj = tempItems[id]
            let Obj1 = {
                assigned_to: prevObj.assigned_to,
                completed: prevObj.completed,
                description: prevObj.description,
                due_date: prevObj.due_date,
                key: obj.key
            }
            let Obj2 = {
                assigned_to: obj.assigned_to,
                completed: obj.completed,
                description: obj.description,
                due_date: obj.due_date,
                key: prevObj.key
            }
            tempItems[id+1] = Obj2
            tempItems[id] = Obj1
            ref.update({
                "items" : tempItems
            }).then(console.log("Successfully update new Data"))
        
        }else{
            console.log("Last element")
        }

    }
    deleteItme=()=>{
        let ref = this.props.firestore.collection("todoLists").doc(this.props.todoList.id);
        let tempItems = this.props.todoList.items
        let id = this.props.item.key
        tempItems.forEach(element => {
            delete element.id
        });
        tempItems.splice(id,1)
        console.log(tempItems)
        for (let i=0;i<tempItems.length;i++){
            tempItems[i].key = i;
        }
        ref.update({
            "items" : tempItems
        }).then(console.log("Successfully update new Data"))
        
    }
    editCard = (e) =>{
        //return <Link to ="/todoList/:id/newItem"/>
        console.log("up")
    }
    buttonCreator=(type)=>{
        if(type == 'up'){
            return <button  className="speicalB btn-floating btn-small waves-effect waves-light blue lighten-1" 
                            onClick = {this.move_up}
                            disabled = {this.props.item.key==0 ? true: false}>
                            <i class="material-icons">keyboard_arrow_up</i>
                    </button>
        }else if(type == 'down'){
            return <button className="speicalB btn-floating btn-small waves-effect waves-light yellow lighten-1" 
                           onClick = {this.move_down}
                           disabled = {this.props.item.key == this.props.todoList.items.length-1 ? true:false}
                           >
                           <i class="material-icons">keyboard_arrow_down</i>
                    </button>
        }
    }

    render() {
        const { item } = this.props; 
        return (
            
                <div className="card z-depth-0 todo-list-link pink lighten-3" >
                <div className=" teal lighten-4">
                    <span className="card-title float">
                        <div className="description">{item.description}</div>
                        <div className="due_date">{item.due_date}</div>
                        {this.setColor(item.completed)}
                                
                                
                                <div className="navBar"  > 
                                    <div className="anim"> 
                                    
                                        {/* <button  className="speicalB btn-floating btn-small waves-effect waves-light blue lighten-1" onClick = {this.move_up}><i class="material-icons">keyboard_arrow_up</i></button>
                                        
                                        <button className="speicalB btn-floating btn-small waves-effect waves-light yellow lighten-1" onClick = {this.move_down}><i class="material-icons">keyboard_arrow_down</i></button> */}
                                        {this.buttonCreator("up")}

                                        {this.buttonCreator("down")}

                                        <button  className="speicalB btn-floating btn-small waves-effect waves-light green lighten-1" onClick = {this.deleteItme}><i class="material-icons">clear</i></button>
                                        
                                        <a  href={'/todoList/'+this.props.todoList.id+"/"+item.key+'/newItem' } className="speicalB btn-floating btn-small waves-effect waves-light purple lighten-1" >
                                            <i className="material-icons">edit</i>
                                        </a>
                                        <button className="speicalB btn-floating btn-small waves-effect waves-light pink lighten-1"  ><i className="material-icons">menu</i></button>
                                    </div>
                                </div>   
                    </span>
                    <div className="card-content text-darken-3">{"Assigned_to:   "+ item.assigned_to}</div>   
                </div>
            </div>
        
        );
    }
}


const mapStateToProps = (state) => {
    return {
       
      auth: state.firebase.auth,
    };
  };
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemCard);