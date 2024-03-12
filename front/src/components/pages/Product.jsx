import { useState, useEffect } from "react";
import NavBar from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");


  const readProduct = async () => {
    try {
      const response = await axios.get("http://localhost/routes/product.php");
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("amount", amount);
    data.append("price", price);
    data.append("category", category);
    fetch("http://localhost/routes/product.php", {
      method: "POST",
      body: data,
    }).then(readProduct());
    window.location.reload()
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
      if(window.confirm('Deseja apagar esse produto?'))
      window.location.reload()
    } catch (error) {
      console.log("Erro ao deletar produto", error);
    }
  };
 
  return (
    <>
      <NavBar />
      <div className="teste">
        <div className="teste container  justify-content-center row d-flex">
          <div className="col-6">
          <Form onSubmit={saveProduct}>

          <Form.Select
                className="select w-100 m-3"
                aria-label="Default select example"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Selecione uma categoria</option>
                {values.map((opts, i) => (
                  <option key={i} value={opts.code}>
                    {opts.name}
                  </option>
                ))}
              </Form.Select>
            <Form.Control
              className="m-3"
              id="name"
              onChange={(e) => 
              setName(e.target.value)}
              value={name}
              required
              size="md"
              type="text"
              placeholder="Produto"
            />
            <Form.Control
              className="m-3"
              id="amount"
              onChange={(e) => 
              setAmount(e.target.value)}
              value={amount}
              size="md"
              type="number"
              min="1"
              placeholder="Quantidade"
            />
            <Form.Control
              className="m-3"
              id="price"

              onChange={(e) => 
              setPrice(e.target.value)}
              value={price}
              size="md"
              type="number"
              min="1"
              placeholder="Preço"
            />
            <Button
              className="inputSalvar m-3"
              as="input"
              type="submit"
              value="Adicionar"
            />{" "}
            </Form>
          </div>

          <div className="col-6">
            <Table className="m-3" bordered hover size="lg" responsive="sm">
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
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
