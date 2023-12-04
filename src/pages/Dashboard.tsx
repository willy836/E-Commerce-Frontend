import { useState, FormEvent } from "react";
import { useAppSelector } from "../hooks";

type Product = {
  name: string;
  id: string;
  user_id: string;
  category_id: string;
  images: string[];
  description: string;
  price: string;
  quantity: string;
  sku: string;
  weight: string;
};

const Dashboard = () => {
  const { productsData } = useAppSelector((state) => state.products);

  // State for create product
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState("");

  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [showFlashMsg, setShowFlashMsg] = useState(false);

  // State for update product
  const [updateName, setUpdateName] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updateImages, setUpdateImages] = useState<string[]>([]);
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateSku, setUpdateSku] = useState("");
  const [updateWeight, setUpdateWeight] = useState("");
  const [productId, setProductId] = useState<string | null>(null);
  const [selectItem, setSelectItem] = useState<Product | null>(null);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let token;
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      token = userObj.token;
    }

    if (
      name &&
      categoryId &&
      images &&
      price &&
      quantity &&
      description &&
      sku &&
      weight
    ) {
      const product = {
        name,
        category_id: categoryId,
        images,
        price,
        quantity,
        description,
        weight,
        sku,
      };
      try {
        const response = await fetch(
          "https://tidecommerce.chickenkiller.com/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to create the product. Status ${response.status}`
          );
        }

        setFlashMessage("Product created successfully");
        setShowFlashMsg(true);

        setName("");
        setCategoryId("");
        setImages([]);
        setPrice("");
        setQuantity("");
        setDescription("");
        setSku("");
        setWeight("");

        setTimeout(() => {
          setShowFlashMsg(false);
        }, 5000);
      } catch (error: unknown) {
        throw error instanceof Error
          ? new Error(`Failed to create the product. Error: ${error.message}`)
          : new Error("Unknown error");
      }
    }
  };

  // Select clicked product to be updated
  const selectProduct = (product: Product) => {
    setSelectItem(product);
    setProductId(product.id);

    setUpdateName(product.name);
    setUpdateCategoryId(product.category_id);
    setUpdateImages(product.images);
    setUpdatePrice(product.price);
    setUpdateQuantity(product.quantity);
    setUpdateDescription(product.description);
    setUpdateSku(product.sku);
    setUpdateWeight(product.weight);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = productId;

    let token;
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      token = userObj.token;
    }

    if (selectItem) {
      const product = {
        name: updateName,
        category_id: updateCategoryId,
        images: updateImages,
        price: updatePrice,
        quantity: updateQuantity,
        description: updateDescription,
        sku: updateSku,
        weight: updateWeight,
      };

      try {
        const response = await fetch(
          `https://tidecommerce.chickenkiller.com/api/products/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to update product. Status ${response.status}`
          );
        }

        setFlashMessage("Product updated successfully");
        setShowFlashMsg(true);

        setUpdateName("");
        setUpdateCategoryId("");
        setUpdateImages([]);
        setUpdatePrice("");
        setUpdateQuantity("");
        setUpdateDescription("");
        setUpdateSku("");
        setUpdateWeight("");

        setTimeout(() => {
          setShowFlashMsg(false);
        }, 5000);
      } catch (error: unknown) {
        throw error instanceof Error
          ? new Error(`Failed to update the product. Error: ${error.message}`)
          : new Error("Unknown error");
      }
    }
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = productId;

    let token;
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      token = userObj.token;
    }

    try {
      const response = await fetch(
        `https://tidecommerce.chickenkiller.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete product. Status ${response.status}`);
      }

      setFlashMessage("Product deleted successfully");
      setShowFlashMsg(true);
      setTimeout(() => {
        setShowFlashMsg(false);
      }, 5000);
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Failed to delete product. Error: ${error.message}`)
        : new Error("Unknown error");
    }
  };
  return (
    <section className="py-7 px-5 dashboard min-page-height">
      <h1 className="uppercase text-center text-xl">Admin dashboard</h1>
      {showFlashMsg && (
        <div className="bg-green-500 text-white p-1 rounded my-1">
          {flashMessage}
        </div>
      )}
      <h3 className="capitalize text-xl">products</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>ACTION</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => {
            const { id, name, price } = product;
            return (
              <tr key={id}>
                <td className="px-2">{id}</td>
                <td className="px-2">{name}</td>
                <td className="px-2">Ksh {price}</td>
                <td className="text-center text-blue-500">
                  <button onClick={() => selectProduct(product)}>update</button>
                </td>
                <td className="text-center text-red-600">
                  <form onSubmit={handleDelete}>
                    <div>
                      <button type="submit">delete</button>
                    </div>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="capitalize text-xl mb-2">create</h3>
        <form onSubmit={handleCreate} className="w-full flex flex-col gap-2">
          <div>
            <input
              type="text"
              name="name"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Product name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="category_id"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="images"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Images URL(s) separated by commas"
              value={images}
              onChange={(e) => {
                setImages(e.target.value.split(",").map((url) => url.trim()));
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="quantity"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="sku"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="SKU"
              value={sku}
              onChange={(e) => {
                setSku(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="string"
              name="weight"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Weight (Kg)"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              create
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <h3 className="capitalize text-xl mb-2">update</h3>
        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-2">
          <div>
            <input
              type="text"
              name="name"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Product name"
              value={updateName}
              onChange={(e) => {
                setUpdateName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="category_id"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Category ID"
              value={updateCategoryId}
              onChange={(e) => {
                setUpdateCategoryId(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="images"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Images URL(s) separated by commas"
              value={updateImages}
              onChange={(e) => {
                setUpdateImages(
                  e.target.value.split(",").map((url) => url.trim())
                );
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Price"
              value={updatePrice}
              onChange={(e) => {
                setUpdatePrice(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="quantity"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Quantity"
              value={updateQuantity}
              onChange={(e) => {
                setUpdateQuantity(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Description"
              value={updateDescription}
              onChange={(e) => {
                setUpdateDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="sku"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="SKU"
              value={updateSku}
              onChange={(e) => {
                setUpdateSku(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="string"
              name="weight"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
              placeholder="Weight (Kg)"
              value={updateWeight}
              onChange={(e) => {
                setUpdateWeight(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
