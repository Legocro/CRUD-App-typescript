import httpInterface from "./httpInterface";
import CustomerData from "../Types/CustomerData";

const GetAll = async () => {
    return await httpInterface.get<Array<CustomerData>>("/customers");
};
const GetById = async (id: string) => {
    return await httpInterface.get<CustomerData>(`/customers/${id}`);
}
const CreateCustomer = async (data: CustomerData) => {
    return await httpInterface.post<CustomerData>("/customers", data);
};

const UpdateCustomer = async (data: CustomerData, id: string) => {
    return await httpInterface.put<CustomerData>(`/customers/${id}`, data);
};

const DeleteCustomer = async (id: string) => {
    return await httpInterface.delete<string>(`/customers/${id}`);
};

const GetInsurance = async (id: string) => {
    return await httpInterface.get<string>(`customers/insurance/${id}`);
};

const CustomerService = 
{
    GetAll,
    GetById,
    CreateCustomer,
    UpdateCustomer,
    DeleteCustomer,
    GetInsurance
};

export default CustomerService;