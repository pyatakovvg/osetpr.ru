
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import createUser from './user/create';
import deleteUser from './user/delete';
import connectUser from './user/connect';

import createCustomer from './customer/create';
import deleteCustomer from './customer/delete';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.createProcess(this.ctx);
    try {
      return await saga.execute(params);
    }
    catch (e) {
      console.log(e)
      if (e instanceof Sagas.SagaExecutionFailed) {
        throw new NetworkError({ code: '2.0.0', message: e['message'] });
      }
      if (e instanceof Sagas.SagaCompensationFailed) {
        throw new NetworkError({ code: '2.0.1', message: e['message'] });
      }
    }
  }

  async createProcess() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Create User')
      .invoke(async (params) => {
        logger.info('Create user');
        const uuid = await createUser(body);
        logger.info('User ' + uuid + ' has created');
        params.setUserUuid(uuid);
      })
      .withCompensation(async (params) => {
        logger.info('Delete user');
        const userUuid = params.getUserUuid();
        if (userUuid) {
          await deleteUser(userUuid);
          logger.info('User ' + userUuid + ' has deleted');
        }
      })

      .step('Create Customer')
      .invoke(async (params) => {
        logger.info('Create customer');
        const userUuid = params.getUserUuid();
        const customerUuid = await createCustomer(userUuid, body['customer']);
        params.setCustomerUuid(customerUuid);
        logger.info('Customer ' + customerUuid + ' has created');
      })
      .withCompensation(async (params) => {
        logger.info('Delete customer');
        const customerUuid = params.getCustomerUuid();
        if (customerUuid) {
          await deleteCustomer(customerUuid);
          logger.info('Customer ' + customerUuid + ' has deleted');
        }
      })

      .step('Authorize')
      .invoke(async (params) => {
        logger.info('Auth user');
        const userUuid = params.getUserUuid();
        const authData = await connectUser(this.ctx, userUuid);
        params.setAuthData(authData);
        logger.info('User has auth');
      })

      // .step('Send event')
      // .invoke(async (params) => {
      //   const product = params.getProduct();
      //   await sendEvent(process.env['EXCHANGE_PRODUCT_CREATE'], JSON.stringify(product));
      // })

      .build();
  }
}
