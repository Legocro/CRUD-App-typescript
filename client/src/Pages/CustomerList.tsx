import React, { useEffect, useState, ChangeEvent } from "react";
import CustomerData from '../Types/CustomerData';
import CustomerService from "../Services/CustomerService";
import { JsxElement } from "typescript";
import { useNavigate } from "react-router-dom";
import '../Styles/CustomerList.css';

function CustomerList(props: any) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Array<CustomerData>>([]);
    const [tableRows, setRows] = useState<Array<React.ReactElement>>([]);
    const [customerAmount, setAmount] = useState<number>(0);

    useEffect(() => {
        getCustomers();
    }, [customers, tableRows]);

    const getCustomers = async () => {
        const allCustomers: Array<CustomerData> = (await CustomerService.GetAll()).data;
        if (customerAmount !== allCustomers.length)
        {
            setupTableRows(allCustomers);
            setCustomers(allCustomers);
            setAmount(customers.length);
        }
    }
    const getDetails = (id: string) => {
        navigate(`/customers/${id}`);
    }
    const setupTableRows = async (data: Array<CustomerData>): Promise<void> => {
        var rows: Array<React.ReactElement> = [];
        rows = data.map(customer => {
            return (
                <tr>
                    <td>{customer.name}</td>
                    <td>{customer.surname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.DoB}</td>
                    <td>{customer.city}</td>
                    <td><a className="details" onClick={e => { getDetails(customer.id) }}>Details</a></td>
                </tr>
            )
        })
        setRows(rows);
    }


    if (customers.length === 0) {
        return (
            <div>Gathering data...</div>
        )
    } else {
        return (
            <table id="customerList" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Date of birth</th>
                        <th>City</th>
                        <th></th>
                    </tr>
                </thead>
                <>{tableRows}</>
            </table>
        )
    }
}

export default CustomerList;