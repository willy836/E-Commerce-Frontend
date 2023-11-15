import { useState, FormEvent } from "react";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  const { productsData } = useAppSelector((state) => state.products);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState("");

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
          "https://tide-web-app.azurewebsites.net/api/products",
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
      } catch (error: unknown) {
        throw error instanceof Error
          ? new Error(`Failed to create the product. Error: ${error.message}`)
          : new Error("Unknown error");
      }
    }
  };

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("delete");
  };
  return (
    <section className="py-7 px-5 dashboard min-page-height">
      <h1 className="uppercase text-center text-xl">Admin dashboard</h1>
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
                  <button className="">update</button>
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
        <form className="w-full flex flex-col gap-2">
          <div>
            <input
              type="text"
              name="name"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="number"
              name="category_id"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="text"
              name="images"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="text"
              name="sku"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
            />
          </div>
          <div>
            <input
              type="decimal"
              name="weight"
              className="border border-gray-400 bg-gray-700 text-gray-200 rounded p-1 w-full"
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
