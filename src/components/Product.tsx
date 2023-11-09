import { Link } from "react-router-dom";

type ProductProps = {
  name: string;
  id: string;
  user_id: number;
  category_id: number;
  images: string[];
  description: string;
  price: number;
  quantity: number;
  sku: string;
  weight: string;
};

const Product = (props: ProductProps) => {
  const { id, images, name, price } = props;

  return (
    <Link to={`/${id}`}>
      <article className="grid-item">
        <img src={images[0]} alt={name} />
        <p className="text-sm">{name}</p>
        <h4 className="font-bold text-gray-800">Ksh {price}</h4>
      </article>
    </Link>
  );
};

export default Product;
