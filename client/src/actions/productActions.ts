import { ProductDetailsActionTypes } from "./../types/ProductDetails";
import axios from "axios";
import { AppThunk } from "../store";
import { ProductListActionTypes } from "../types/ProductList";
import { errorHandler } from "./errorHandler";
import {
  ProductCreateActionTypes,
  ProductCreateReviewActionTypes,
  ProductDeleteActionTypes,
  ProductUpdateActionTypes,
  TemporaryProduct,
} from "../types/";
import { ProductTopActionTypes } from "../types/ProductTop";

export const listProducts =
  (keyword = "", pageNumber = ""): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductListActionTypes.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductListActionTypes.PRODUCT_LIST_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const listProductDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({
        type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const deleteProduct =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const createProduct = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_FAILURE,
      payload: errorHandler(error),
    });
  }
};

export const updateProduct =
  (product: TemporaryProduct): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS });
    } catch (error) {
      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const createProductReview =
  (productId: string, review: { rating: number; comment: string }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
      });

      dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS });
    } catch (error) {
      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const listTopProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: ProductTopActionTypes.PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: ProductTopActionTypes.PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductTopActionTypes.PRODUCT_TOP_FAILURE,
      payload: errorHandler(error),
    });
  }
};
