import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/const";
import { toast } from "react-toastify";
export const AdminContext = React.createContext();

const INIT_STATE = {
  prducts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addProduct = async (newProduct) => {
    try {
      await axios.post(API, { ...newProduct, price: +newProduct.price });
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedProduch = async (products) => {
    try {
      await axios.patch(`${API}/${products.id}`, {
        ...products,
        price: +products.price,
      });
      getProducts();
      toast.success("Edited!", {
        pauseOnHover: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API} /${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addProduct: addProduct,
        getProducts: getProducts,
        saveEditedProduch: saveEditedProduch,
        deleteProduct: deleteProduct,
        products: state.products,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
