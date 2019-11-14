import React from 'react';


class ItemCard extends React.Component {
    setColor = (e) =>{
        if(e){
            //document.getElementById("Status_color").style.color = '#00FF40';
            
            // return "Completed"
            let color ={
                color:"#00FF40"
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

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title float">
                        <div className="description">{item.description}</div>
                        <div className="due_date">{item.due_date}</div>
                        {this.setColor(item.completed)}
                        <button id="move_up" class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">keyboard_arrow_up</i></button>
                        <button id="move_down" class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">keyboard_arrow_down</i></button>
                        <button id="delete" class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">clear</i></button>
                    </span>
                    <div className="card-content">{"Assigned_to:   "+ item.assigned_to}</div>        
                </div>
                <hr/>
            </div>
        );
    }
}
export default ItemCard;