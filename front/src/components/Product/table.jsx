import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function TableProd() {
  const [products, setProducts] = useState([]);
  const [setValues] = useState([]);

  const readProduct = async () => {
    try {
      const response = await axios.get("http://localhost/routes/product.php");
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readProduct();
    fetch("http://localhost/routes/category.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  const deletarProduct = async (id) => {
    try {
      await fetch(`http://localhost/routes/product.php?id=${id}`, {
        method: "DELETE",
      });
      if (window.confirm("Deseja apagar esse produto?"))
        window.location.reload();
    } catch (error) {
      console.log("Erro ao deletar produto", error);
    }
  };

  return (
    <Table className="m-3" size="lg" bordered hover responsive="sm">
      <thead>
        <tr>
          <th>Código</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.code}>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.amount}</td>
            <td> {product.price}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                size="sm"
                onClick={() => deletarProduct(product.code)}
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableProd;