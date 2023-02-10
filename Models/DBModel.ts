import * as config from "../data/config.json";
import CustomerData from "../client/src/Types/CustomerData";
import { Schema, model, connect } from "mongoose";

const CustomerSchema: Schema<CustomerData> = new Schema<CustomerData>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    DoB: { type: String, required: true },
    email: {type: String, required: true}
})
CustomerSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id.toString();
    return object;
  });
const CustomerModel = model<CustomerData>("customer", CustomerSchema);
export default CustomerModel;