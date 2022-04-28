import React from "react";
import InfoForm from "./form";
import InfoTable from "./table";
import axiosInstance from "../config";

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
          axiosInstance.post("http://localhost:5000/info/",data).then(res=>{
            this.getAll();})
        }
        else
        {
            axiosInstance.put("http://localhost:5000/info/update",data).then(res=>{
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
        axiosInstance.get("http://localhost:5000/info/").then(res=>{
            
            this.setState({
                data:res.data

            })

        })
    }

    update = data=>
    {
        
        this.setState({
            editData:data
        })
    }
    
    del = data=>

    {
        var option =window.confirm(`Are you sure to delete ${data.Name}`)
        if(option)
        {
            axiosInstance.delete(`http://localhost:5000/info/del/${data._id}`).then(res=>{
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
                       <InfoForm myData={this.create} setForm={this.state.editData}/>
                    </div>
                    <div className="col-6">
                       <InfoTable getData={this.state.data} setData={this.update} del={this.del}
                       />
                    </div>
                </div>
            </div>
          )
    }
}

export default App;