import React from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer(props: any) {
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate("/");
    }
    return (
        <>
            <h1>Add new customer</h1>
            <form action="/api/customers" method="post">
                <div className="form-group row">
                    <label htmlFor="name" className="col-4 col-form-label">Name</label>
                    <div className="col-8">
                        <input id="name" name="name" placeholder="Your name..." type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="surname" className="col-4 col-form-label">Surname</label>
                    <div className="col-8">
                        <input id="surname" name="surname" placeholder="Your surname..." type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                        <input id="email" name="email" placeholder="Your email..." type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="City" className="col-4 col-form-label">City</label>
                    <div className="col-8">
                        <input id="city" name="city" placeholder="Your date of birth..." type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="DoB" className="col-4 col-form-label">Date of birth</label>
                    <div className="col-8">
                        <input id="DoB" name="DoB" type="date" className="form-control"/>    
                    </div>"
                </div>
                <div className="form-group row">
                    <div className="offset-4 col-8">
                        <button name="submit" type="submit" className="btn btn-primary" onClick={() => {onSubmit()}}>Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddCustomer;