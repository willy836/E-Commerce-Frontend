import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal } from "../redux/modal/modalSlice";
import { removeItem } from "../redux/products/productsSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { itemId } = useAppSelector((state) => state.modal);

  return (
    <aside className="modal-container">
      <div className="modal px-6 py-3 rounded">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-xl text-gray-700 pt-1">
            Remove from cart
          </h4>
          <span
            className="font-medium text-4xl cursor-pointer"
            onClick={() => dispatch(closeModal())}
          >
            &times;
          </span>
        </div>
        <p className="py-3 mb-2 font-light">
          Do you really want to remove this item from cart?
        </p>
        <div>
          <button
            style={{ letterSpacing: "2px" }}
            className="w-full uppercase bg-orange-500 text-white p-3 mb-4 rounded"
            onClick={() => {
              if (itemId !== null) {
                dispatch(removeItem(itemId));
                dispatch(closeModal());
              }
            }}
          >
            remove item
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
