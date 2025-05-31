import { Link } from "react-router-dom"
import React from "react"
function MyCard(props){

    return(
        <div className="card" >
            <h5 className="card-title">{props.name}</h5>
            <img src={props.img} className="card-img-top" alt="..." />
            <div className="card-body">
                
                {
                    props.path && <Link className="btn btn-primary" to={props.path}> View Details </Link> 
                }
                {
                    props.num &&  <h5> Size Of Company: {props.num} </h5>
                }

                {
                    props.info && <p className="card-text">Details Of Company: {props.info}</p>
                }
                {
                    props.loc && <h5> Location Of Company: {props.loc} </h5>
                }
            </div>
        </div>
    )

}


export default MyCard ;