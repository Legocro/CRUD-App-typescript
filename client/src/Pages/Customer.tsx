import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../Services/CustomerService";
import CustomerData from "../Types/CustomerData";

function Customer(props: any) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<CustomerData>();
    const [updating, setUpdating] = useState<boolean>(false);
    const [insurance, setInsurance] = useState<string>("0");
    const [defaultsSet, setDefaults] = useState<boolean>(false);
    const [currentCustomer, setCustomer] = useState<CustomerData>();
    useEffect(() => {
        if (data == undefined) {
            getData();
        }
        const inputs = document.querySelectorAll("form input");
        if (!defaultsSet && inputs.length > 1) {
            setupDefaults();
        }

        if (parseInt(insurance) > 0) {
            getInsurance();
        }
    }, [data, updating, defaultsSet]);

    const setupDefaults = () => {
        const allInputs = document.querySelectorAll("form input");
        allInputs.forEach(inputElement => {
            inputElement.setAttribute("readonly", "true");
        });
        setDefaults(true);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (currentCustomer !== undefined) {
            setCustomer({ ...currentCustomer, [name]: value });
        }
    };

    const getData = async () => {
        if (!id) {
            return;
        }
        const user: CustomerData = (await CustomerService.GetById(id)).data;
        if (user !== undefined) {
            setData(user);
            setCustomer(user);

        }
    }

    const activateUpdate = () => {
        setUpdating(true);
        const allInputs = document.querySelectorAll("form input");
        allInputs.forEach(inputElement => {
            inputElement.removeAttribute("readonly");
        });
    }

    const updateUser = async () => {
        if (currentCustomer !== undefined && id !== undefined)
        {
            CustomerService.UpdateCustomer(currentCustomer, id);
        }
        const allInputs = document.querySelectorAll("form input");
        allInputs.forEach(inputElement => {
            inputElement.setAttribute("readonly", "true");
        });
        setUpdating(false);
    }
    const deleteUser = async () => {
        if (id !== undefined)
            await CustomerService.DeleteCustomer(id);
            navigate("/");
    }

    const getInsurance = async () => {
        const insuranceField: HTMLElement | null = document.getElementById("insuranceInput");
        if (!id) {

            return;
        }
        const insuranceAmount: string = (await CustomerService.GetInsurance(id)).data;
        if (parseInt(insuranceAmount) > 0) {
            insuranceField?.setAttribute("value", insuranceAmount);
            setInsurance(insuranceAmount)
        }
    }

    if (data == undefined) {
        return (
            <h2>Gathering data...</h2>
        );
    } else {
        return (
            <>
                <h2>{data.name + " " + data.surname}</h2>
                <form id="form" action="/api/customers" method="post">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-4 col-form-label">Name</label>
                        <div className="col-8">
                            <input onChange={e => {handleInputChange(e)}}id="name" name="name" placeholder="Your name..." type="text" className="form-control" defaultValue={data.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="surname" className="col-4 col-form-label">Surname</label>
                        <div className="col-8">
                            <input onChange={e => {handleInputChange(e)}}id="surname" name="surname" placeholder="Your surname..." type="text" className="form-control" defaultValue={data.surname} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-4 col-form-label">Email</label>
                        <div className="col-8">
                            <input onChange={e => {handleInputChange(e)}} id="email" name="email" placeholder="Your email..." type="text" className="form-control" defaultValue={data.email} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="City" className="col-4 col-form-label">City</label>
                        <div className="col-8">
                            <input onChange={e => {handleInputChange(e)}} id="city" name="city" placeholder="Your city..." type="text" className="form-control" defaultValue={data.city} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="DoB" className="col-4 col-form-label">Date of birth</label>
                        <div className="col-8">
                            <input onChange={e => {handleInputChange(e)}} id="DoB" name="DoB" type="date" className="form-control" defaultValue={data.DoB} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="insurance" className="col-4 col-form-label">Insurance</label>
                        <div className="col-8">
                            <input id="insuranceInput" name="insurance" type="text" className="form-control" readOnly/>
                            <button id="insurance" type="button" className="form-control" onClick={(e) => { getInsurance() }}>Get insurance</button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-4 col-8">
                            {
                                updating ? (<button id="Update" name="update" type="button" className="btn btn-primary" onClick={() => { console.log("YOO"); updateUser(); }}>Update</button>)
                                    : (<button id="edit" name="edit" type="button" className="btn btn-primary" onClick={() => { console.log("OOOO"); activateUpdate(); }}>Edit</button>)

                            }
                            <button id="delete" name="delete" type="button" className="btn btn-primary" onClick={()=>{deleteUser();}}>Delete</button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default Customer;