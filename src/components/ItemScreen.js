import React, { Component } from 'react'

export class ItemScreen extends Component {
    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input value="" placeholder="" id="first_name" type="text" className="active validate"/>
                            <label for="first_name" className="active">Description: </label>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value="" id="last_name" type="text" className="validate"/>
                            <label for="last_name" className="active">Assigned To: </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="Due_date" type="date" className="datepicker"/>
                            <label for="Due_date" class="active">Due Date</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label>
                                    <input id="Completetd"type="checkbox" />
                                    <span>Completed</span>
                            </label>
                        
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="input-field col s12">
                            <button>submit</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </form>
          </div>          
        )
    }
}

export default ItemScreen
