import { Router, Express } from "express"
import controller from '../Controllers/customerDataController';
const routes: Router = Router();

const setupRoutes = (server: Express) => {
    routes.get('/', controller.GetAll);
    routes.post('/', controller.CreateNew);

    routes.get('/:id', controller.GetById);
    routes.delete('/:id', controller.DeleteById);
    routes.put('/:id', controller.UpdateById);
    
    routes.get('/insurance/:id', controller.GetInsuranceById);
    server.use('/api/customers', routes);
};

export default setupRoutes;