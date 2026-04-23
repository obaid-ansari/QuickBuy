import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getProductById,
  getProducts,
  postProduct,
  updateProduct,
} from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [detailedProduct, setDetailedProduct] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: "",
    rating: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isFromActive, setIsFromActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // fetch all products
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // fetch single product
  const handlerGetProductsById = async (id) => {
    try {
      const response = await getProductById(id);
      if (response.status === 200) {
        setDetailedProduct(response.data.data);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  // update Product
  const handleUpdate = (product) => {
    setUpdateData(product);
    setIsEdit(true);
    setIsFromActive(true);
  };

  useEffect(() => {
    if (!updateData) return;

    setForm({
      name: updateData.name || "",
      description: updateData.description || "",
      price: updateData.price || "",
      category: updateData.category || "Electronics",
      stock: updateData.stock || "",
      rating: updateData.rating || "",
      image: null,
    });

    if (updateData.images) {
      setPreview(updateData.images[0]);
    }
  }, [updateData]);

  const updateProductHandler = async (id, formData) => {
    try {
      setLoading(true);
      const response = await updateProduct(id, formData);

      if (response.status === 200) {
        toast.success(response.data.message);

        await fetchProducts();
        setIsEdit(false);
        setIsFromActive(false);
        setUpdateData({});
        setPreview(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // add products

  /* Handle text inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Handle image upload */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const addProduct = async (formData) => {
    if (loading) return;

    try {
      setLoading(true); // start loading

      const response = await postProduct(formData);

      if (response.status === 201) {
        toast.success(response.data.message);

        await fetchProducts();

        setForm({
          name: "",
          description: "",
          price: "",
          category: "Electronics",
          stock: "",
          rating: "",
          image: null,
        });

        setIsFromActive(false);
        setPreview(null);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    const formData = new FormData();

    // Image required only when adding new product
    if (!isEdit && !form.image) {
      toast.error("Please provide Image.");
      return;
    }

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("rating", form.rating);
    formData.append("image", form.image);

    if (action === "Edit") {
      updateProductHandler(updateData._id, formData);
    } else {
      addProduct(formData);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        await fetchProducts();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  const cencelEdit = () => {
    setIsEdit(false);
    setIsFromActive(false);
    setUpdateData({});
    setPreview(null);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        handlerGetProductsById,
        detailedProduct,
        form,
        preview,
        handleImageChange,
        handleChange,
        handleSubmit,
        isFromActive,
        setIsFromActive,
        handleDeleteProduct,
        loading,
        handleUpdate,
        isEdit,
        cencelEdit
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
