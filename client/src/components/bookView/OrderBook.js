// import { useState } from "react";

// export function OrderBook({ book, handleOrderBook }) {
//   const [orderedQuantity, setOrderedQuantity] = useState(0);

//   const handleDecrease = () => {
//     if (orderedQuantity > 0) {
//       setOrderedQuantity((prevQuantity) => prevQuantity - 1);
//     }
//   };

//   const handleIncrease = () => {
//     setOrderedQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleOrder = () => {
//     if (orderedQuantity > 0) {
//       handleOrderBook({ ...book, quantity: orderedQuantity });
//       setOrderedQuantity(0);
//     }
//   };

//   return (
//     <div className="order-container">
//       <div className="amount-btn-container">
//         <button onClick={handleDecrease}>-</button>
//         <p>{orderedQuantity}</p>
//         <button onClick={handleIncrease}>+</button>
//       </div>
//       <div className="order-btn-container">
//         <button onClick={handleOrder}>Order</button>
//       </div>
//     </div>
//   );
// }
