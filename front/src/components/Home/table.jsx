// import { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import axios from "axios";

// function TableHome() {
// const [compras, setCompras] = useState([]);
//   const [products, setProducts] = useState("");
//   const [values, setValues] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [amount, setAmount] = useState("");
//   const [productData, setProductData] = useState({
//     price: "",
//     tax: "",
//   });
//   const [carrinhoTemporario, setCarrinhoTemporario] = useState([]);
// //   let sumTax = 0;
// //   let sumPrice = 0;

//     const readCompra = async () => {
//     try {
//       const response = await axios.get("http://localhost/routes/orders.php");
//       const data = response.data;
//       setCompras(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  
//   const showInput = async () => {
//     const response = await fetch("http://localhost/routes/product.php");
//     const dbProduct = await response.json();
//     const product = dbProduct.find((p) => String(p.code) === selectedProduct);

//     if (product) {
//       const taxValue = (product.tax_value) / 100;
//       const productPrice = product.price;

//       const totalTax = (taxValue * amount) * 100;
//       const totalPrice = productPrice * amount;
//       setProductData({
//         price: totalPrice,
//         tax: totalTax,
//       });
//     }
//   };

//     useEffect(() => {
//     readCompra();
//     fetch("http://localhost/routes/product.php")
//       .then((data) => data.json())
//       .then((val) => setValues(val));
//     showInput();
//   }, [selectedProduct, amount]);

//     const deletarCompra = (id) => {
//    const newCarrinhoTemporario = carrinhoTemporario.filter((item) => item.code !==id);
//    if(window.confirm('Deseja apagar esse produto?'))
//    setCarrinhoTemporario(newCarrinhoTemporario);
//   }
  
//     const finalizarCompra = async () => {
//       let sumPrice = 0;
//       let sumTax = 0;
  
//       if (carrinhoTemporario.length > 0) {
//         carrinhoTemporario.forEach(product => {
//           sumTax += parseFloat(product.tax);
//           sumPrice += parseFloat(product.price);
//         });
  
//         const response = window.confirm("Deseja finalizar sua compra?");
//         if (response) {
//           try {
//             const orderResponse = await fetch("http://localhost/routes/orders.php", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               body: new URLSearchParams({
//                 total: sumPrice,
//                 tax: sumTax,
//               }),
//             });
  
//             const { code } = await orderResponse.json();
  
//             await Promise.all(carrinhoTemporario.map(async product => {
//               let produto = new FormData();
//               produto.append("order_code", parseInt(code));
//               produto.append("product_code", product.code);
//               produto.append("amount", product.amount);
//               produto.append("tax", product.tax);
//               produto.append("price", product.price);
  
//               return fetch("http://localhost/routes/orderItem.php", {
//                 method: "POST",
//                 body: produto,
//               });
//             }));
  
//             setCarrinhoTemporario([]);
//             window.location.reload();
//           } catch (error) {
//             console.error("Erro ao finalizar a compra: ", error);
//             alert("Deu erro");
//           }
//         }
//       }
//     };

//     return (
//          <Table className="m-3" responsive="sm" bordered hover size="lg">
//               <thead>
//                 <tr>
//                   <th>Código</th>
//                   <th>Produto</th>
//                   <th>Quantidade</th>
//                   <th>Preço</th>
//                   <th>Tax</th>
//                   <th>Total</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {carrinhoTemporario.map((compra) => (
//                   <tr key={compra.code}>
//                     <td>{compra.code}</td>
//                     <td>{compra.name}</td>
//                     <td>{compra.amount}</td>
//                     <td> {compra.price}</td>
//                     <td> {compra.tax}</td>
//                     <td> {compra.total}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn btn-danger btn-sm"
//                         size="sm"
//                         onClick={() => deletarCompra(compra.code)}
//                       >
//                         Deletar
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//     );
// }

// export default TableHome;