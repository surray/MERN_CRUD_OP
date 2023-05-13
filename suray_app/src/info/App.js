import React from "react";
import InfoForm from "./form";
import InfoTable from "./table";
import {axiosInstance} from "../config";
import "./App.css"

class App extends React.Component
{
    constructor()
    {
        super();        
        this.state={
            data:[],
            editData:[]
        }
    }

    create =data=>
    {
        if(!data.isEdit)
        {
          axiosInstance.post("/",data).then(res=>{
            this.getAll();})
        }
        else
        {
            axiosInstance.put("/update",data).then(res=>{
            this.getAll();})

        } 
    
        
    }

    //hooks get the data from DB
    componentDidMount()
    {
        this.getAll(); 
    }

    getAll()
    {
        axiosInstance.get("/").then(res=>{
            
            this.setState({
                data:Array.from(res.data)
                //data:res.data

            })

        })
    }

    update = data=>
    {
        
        this.setState({
            editData:Array.from(data)
            //editData:data
        })
    }
    
    del = data=>

    {
        var option =window.confirm(`Are you sure to delete ${data.Name}`)
        if(option)
        {
            axiosInstance.delete(`/del/${data._id}`).then(res=>{
                console.log(res);
                this.getAll();
            })
        }
    }



    render()
    {
      return(
            <div className="container">
                <div className="row">
                    <div className="col-6">
                    <h2 >Simple CRUD operation add your datas below</h2>
                       <InfoForm myData={this.create} setForm={this.state.editData}/>
                    </div>
                    <div className="col-6">
                    <h2>Your datas are stored in DB and displayed below</h2>
                       <InfoTable getData={this.state.data} setData={this.update} del={this.del}
                       />
                    </div>
                </div>
            </div>
          )
    }
}

export default App;