import React from "react";

import "./App.css"
class InfoForm extends React.Component
{
    constructor()
    {
        super();
        this.state={
            _id:"",
            Name:"",
            Age:"",
            City:"",
            isEdit:false
        }
    }

    infoChange=event=>
    {
        const{name,value}=event.target;
        this.setState({
            [name]:value
        })
    }

    infoSubmit =event=>
    {
        if(!this.state.isEdit)
        {
            let data={
                isEdit:this.state.isEdit,
                Name:this.state.Name,
                Age:this.state.Age,
                City:this.state.City
            }
            this.props.myData(data);  
        }
        else
        {
            let data={
            isEdit:this.state.isEdit,
            _id:this.state._id,
            Name:this.state.Name,
            Age:this.state.Age,
            City:this.state.City
            }
            this.props.myData(data);
        }
    }

    componentWillReceiveProps(props)
    {
        if(props.setForm._id!=null)
        {
            this.setState({
                isEdit:true, 
                _id: props.setForm._id,
                Name:props.setForm.Name,
                City:props.setForm.City,
                Age:props.setForm.Age

            })
        }
    }

    render()
    {
      return(
        <form onSubmit={this.infoSubmit} autoComplete="off">
        <div className="form-group col-sm-10">
          
          <input type="text" className="form-control" placeholder="Enter name"
          onChange={this.infoChange}
          name="Name"
          value={this.state.Name}
          required/>
          
        </div>
        <div className="form-group col-sm-10">
          
          <input type="text" className="form-control" placeholder="Enter City"
           onChange={this.infoChange}
           name="City"
           value={this.state.City}
           required/>
        </div>
        <div className="form-group col-sm-10">
            <p>Age: {this.state.Age}</p>
            <input  type="range" min="1" max="100" class="slider" id="myRange"
            onChange={this.infoChange}
            name="Age"
            value={this.state.Age}
            required/>           
        </div>
        
        <div className="form-group col-sm-10">
      
            <button className="btn btn-success" type="submit" >{this.state.isEdit ? 'Update' :'Create'}
           
            </button>
       </div>
      </form>
      )
    }
}

export default InfoForm;
