import * as config from "../data/config.json";
import { Request, Response } from "express";
import CustomerModel from '../Models/DBModel';
import { Customer } from '../Models/Customer';
import util from '../Controllers/utilityController';

interface Controller extends Object {
    GetAll: (req: Request, res: Response) => Promise<void>;
    GetById: (req: Request, res: Response) => Promise<void>;
    CreateNew: (req: Request, res: Response) => Promise<void>;
    DeleteById: (req: Request, res: Response) => Promise<void>;
    GetInsuranceById: (req: Request, res: Response) => Promise<void>;
    UpdateById: (req: Request, res: Response) => Promise<void>;
    DocumentToCustomer: (doc: any, res: Response) => Customer | void;
}
const controller: Controller = {
    GetAll: async (req: Request, res: Response) => {
        const allDocuments = await CustomerModel.find({});
        const allCustomers: Array<Customer | void> = allDocuments.map((document) => {
            return controller.DocumentToCustomer(document, res);
        });
        res.send(allCustomers);
    },

    GetById: async (req: Request, res: Response) => {
        try {
            const document = await CustomerModel.findById(req.params.id);
            const customer: Customer | void = controller.DocumentToCustomer(document, res);
            if (customer)
                res.send(customer.toObject());
        } catch (err: any) {
            res.sendStatus(404);
            res.redirect('/');
            console.error(err.message);
        }
    },
    CreateNew: async (req: Request, res: Response) => {
        const newCustomer: Customer = new Customer();
        newCustomer.addDataFromObject(req.body);
        await CustomerModel.create(newCustomer.toObject());
        res.redirect('/');
    },
    DeleteById: async (req: Request, res: Response) => {
        const document = await CustomerModel.findByIdAndDelete(req.params.id);
        if (document == undefined)
        {
            res.status(404).send({
                message: "Unable to delete customer"
            });
        } else 
        {
            res.send({
                message: "Successfully deleted"
            });
        }
    },
    GetInsuranceById: async (req: Request, res: Response) => {
        const document = await CustomerModel.findById(req.params.id);
        const customer = controller.DocumentToCustomer(document, res);
        if (customer == null) {
            return;
        }
        const insurance: number = util.GetInsurance(customer);
        res.send(insurance.toString());
    },
    UpdateById: async (req: Request, res: Response) => {
        if (!req.body) {
            res.status(400).send({
                message: "Data to update can not be empty!"
            });
            return;
        }

        const id = req.params.id;

        try {
            const document = await CustomerModel.findByIdAndUpdate(id, req.body);
            if (document == undefined) {
                res.status(404).send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
                  });
            } else {
                res.send({messsage: "Customer was updated"});
            }
        } catch (e: any)
        {
            console.error(e.message);
            res.status(500).send({message: "Error updating Customer"});
        }

    },

    DocumentToCustomer: (doc: any, res: Response): Customer | void => {
        if (doc == null) {
            console.log("NO DOCUMENTS FOUND");
            res.sendStatus(404);
            res.redirect('/');
            return;
        }
        const newCustomer: Customer = new Customer();
        newCustomer.addDataFromObject(doc.toJSON());
        return newCustomer;
    }
}





export default controller;