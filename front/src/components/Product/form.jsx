import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ButtonAdc from "../Buttons/adicionar";
import axios from "axios";

function FormProd() {
  const [setProducts] = useState([]);
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
    window.location.reload();
  };

  useEffect(() => {
    readProduct();
    fetch("http://localhost/routes/category.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  return (
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
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
        size="md"
        type="text"
        placeholder="Produto"
      />
      <Form.Control
        className="m-3"
        id="amount"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        size="md"
        type="number"
        min="1"
        placeholder="Quantidade"
      />
      <Form.Control
        className="m-3"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        size="md"
        type="number"
        min="1"
        placeholder="Preço"
      />
     <ButtonAdc/>
    </Form>
  );
}

export default FormProd;
