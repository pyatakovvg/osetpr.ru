
import { createType, deleteType, getAllTypes, updateType } from "../controllers/type";
import { createBrand, deleteBrand, getAllBrands, updateBrand } from "../controllers/brand";

import { getAllUnits, createUnit, updateUnit, deleteUnits } from '../controllers/unit';
import { getAllCategories, createCategory, updateCategory, deleteCategories } from '../controllers/category';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrencies } from '../controllers/currency';
import { getAllAttributes, deleteAttributes, updateAttribute, createAttribute } from '../controllers/attribute';

import { getProducts, createProduct, deleteProductById, updateProductById, updateProperty } from '../controllers/product';
import { getTypesCount, getBrandsCount, getCategoriesCount,getAttributesCount, copyProductById } from '../controllers/product';

import { getAllComments, deleteComments, createComment, updateComment } from '../controllers/comment';


export default (router) => {

  router.get('/v1/api/brands', getAllBrands());
  router.post('/v1/api/brands', createBrand());
  router.put('/v1/api/brands/:id', updateBrand());
  router.delete('/v1/api/brands', deleteBrand());

  router.get('/v1/api/types', getAllTypes());
  router.post('/v1/api/types', createType());
  router.put('/v1/api/types/:id', updateType());
  router.delete('/v1/api/types', deleteType());

  router.get('/v1/api/categories', getAllCategories());
  router.post('/v1/api/categories', createCategory());
  router.put('/v1/api/categories/:id', updateCategory());
  router.delete('/v1/api/categories', deleteCategories());

  router.get('/v1/api/attributes', getAllAttributes());
  router.post('/v1/api/attributes', createAttribute());
  router.put('/v1/api/attributes/:id', updateAttribute());
  router.delete('/v1/api/attributes', deleteAttributes());

  router.get('/v1/api/currencies', getAllCurrencies());
  router.post('/v1/api/currencies', createCurrency());
  router.put('/v1/api/currencies/:id', updateCurrency());
  router.delete('/v1/api/currencies', deleteCurrencies());

  router.get('/v1/api/units', getAllUnits());
  router.post('/v1/api/units', createUnit());
  router.put('/v1/api/units/:id', updateUnit());
  router.delete('/v1/api/units', deleteUnits());

  router.get('/v1/api/products/types', getTypesCount());
  router.get('/v1/api/products/brands', getBrandsCount());
  router.get('/v1/api/products/categories', getCategoriesCount());
  router.get('/v1/api/products/attributes', getAttributesCount());

  router.get('/v1/api/products', getProducts());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:uuid', updateProductById());
  router.delete('/v1/api/products', deleteProductById());
  router.post('/v1/api/products/:uuid/copy', copyProductById());
  router.put('/v1/api/products/:uuid/properties', updateProperty());

  router.get('/v1/api/comments', getAllComments());
  router.post('/v1/api/comments', createComment());
  router.put('/v1/api/comments/:id', updateComment());
  router.delete('/v1/api/comments', deleteComments());
};
