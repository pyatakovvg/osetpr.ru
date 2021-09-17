
import { getAllCustomers, updateCustomers } from '../controllers/customer';

import { getAll as getOperations, getById as getOperationById, create as createOperation, updateById as updateOperationById } from '../controllers/order';

import { getAllBrands, createBrand, updateBrand, deleteBrands } from '../controllers/brand';
import { getAllTypes, createType, updateType, deleteType } from '../controllers/type';
import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/unit';
import { getAllPayments, updatePayment } from '../controllers/payment';
import { getAllDeliveries, updateDelivery } from '../controllers/delivery';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/category';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/currency';
import { getAllAttributes, createAttribute, deleteAttributes, updateAttribute } from '../controllers/attribute';

import { getProducts, getProduct,  createProduct, updateProduct, copyProduct, updateStatusProduct, deleteProducts } from '../controllers/product';
import { getAllPromotions, deletePromotions, updatePromotion, createPromotion } from '../controllers/promotion';

import { getImages, getImage, createImage, updateImage, deleteImages } from '../controllers/gallery';
import { getComments, createComment, updateComment, deleteComments } from '../controllers/comment';
import { getShops, createShop, updateShop, deleteShops } from '../controllers/shop';

import { getAllStatuses } from '../controllers/status';

import { signOut } from '../controllers/identity';
import { getSettings } from '../controllers/settings';
import { getProfile, updateProfile } from '../controllers/profile';


export default (router) => {

  router.get('/statuses', getAllStatuses());

  router.get('/shops', getShops());
  router.post('/shops', createShop());
  router.put('/shops/:id', updateShop());
  router.delete('/shops', deleteShops());

  router.get('/brands', getAllBrands());
  router.post('/brands', createBrand());
  router.put('/brands/:id', updateBrand());
  router.delete('/brands', deleteBrands());

  router.get('/types', getAllTypes());
  router.post('/types', createType());
  router.put('/types/:id', updateType());
  router.delete('/types', deleteType());

  router.get('/payments', getAllPayments());
  router.put('/payments/:code', updatePayment());

  router.get('/deliveries', getAllDeliveries());
  router.put('/deliveries/:code', updateDelivery());

  router.get('/promotions', getAllPromotions());
  router.post('/promotions', createPromotion());
  router.put('/promotions/:id', updatePromotion());
  router.delete('/promotions', deletePromotions());

  router.get('/categories', getAllCategories());
  router.post('/categories', createCategory());
  router.put('/categories/:id', updateCategory());
  router.delete('/categories', deleteCategories());

  router.get('/attributes', getAllAttributes());
  router.post('/attributes', createAttribute());
  router.put('/attributes/:id', updateAttribute());
  router.delete('/attributes', deleteAttributes());

  router.get('/currencies', getAllCurrencies());
  router.post('/currencies', createCurrency());
  router.put('/currencies/:id', updateCurrency());
  router.delete('/currencies', deleteCurrencies());

  router.get('/units', getAllUnits());
  router.post('/units', createUnit());
  router.put('/units/:id', updateUnit());
  router.delete('/units', deleteUnits());

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProduct());
  router.post('/products', createProduct());
  router.delete('/products', deleteProducts());
  router.put('/products/:uuid', updateProduct());
  router.post('/products/:uuid/copy', copyProduct());
  router.put('/products/:uuid/status', updateStatusProduct());

  router.get('/operations', getOperations());
  router.get('/operations/:operationId', getOperationById());
  router.post('/operations', createOperation());
  router.put('/operations/:externalId', updateOperationById());

  router.get('/comments', getComments());
  router.post('/comments', createComment());
  router.put('/comments/:id', updateComment());
  router.delete('/comments', deleteComments());

  router.get('/gallery', getImages());
  router.get('/gallery/:id', getImage());
  router.post('/gallery', createImage());
  router.put('/gallery/:uuid', updateImage());
  router.delete('/gallery', deleteImages());

  router.post('/sign-out', signOut());

  router.get('/profile', getProfile());
  router.put('/profile/:id', updateProfile());

  router.get('/customers', getAllCustomers());
  router.put('/customers/:id', updateCustomers());

  router.get('/settings', getSettings());
};
