import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className=" flex justify-between items-center
     bg-stone-800 text-stone-200 text-sm
    uppercase px-4 py-4 sm:px-6 md:text-base " >
      <p className="font-semibold text-stone-300 
      space-x-4 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
