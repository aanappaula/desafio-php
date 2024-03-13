// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; 
// import NavBar from "../../navbar/navbar";
// import Table from "react-bootstrap/Table";

// function OrderItem() {
//   const [orderItems, setOrderItems] = useState([]);
//   const [orderCode, setOrderCode] = useState('');
//   const { code } = useParams(); 

//   useEffect(() => {
//     const readItem = async () => {
//       try {
//         const response = await fetch("http://localhost/routes/orderItem.php");
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Erro ao ler itens da ordem:", error);
//         return [];
//       }
//     };

//     const updateTable = async () => {
//       const orderItem = await readItem();

//       setOrderCode(code);
//       setOrderItems(orderItem.filter(item => item.order_code === code));
//       console.log(code);
//     };
   
//     updateTable();
//   }, [code]); 

//   return (
//     <>
//       <NavBar />
//       <div className="teste container justify-content-center row d-flex">
//         <div className="col-6">
//           <Table className="m-3" bordered hover size="lg" responsive="sm">
//             <thead>
//               <tr>
//                 <th>Código</th>
//                 <th>Produto</th>
//                 <th>Quantidade</th>
//                 <th>Preço</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderItems?.map((item) => (
//                 <tr key={item.code}>
//                   <td>{item.product_code}</td>
//                   <td>{item.amount}</td>
//                   <td>{item.price}</td>
//                   <td>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrderItem;