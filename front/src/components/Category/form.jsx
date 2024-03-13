import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";

function FormCat() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [tax, setTax] = useState([]);


  useEffect(() => {
    readCategory();
  }, []);

  const readCategory = async () => {
    try {
      const response = await axios.get("http://localhost/routes/category.php");
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.log("Erro ao carregar categorias", error);
    }
  };

  const saveCategory = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("tax", tax);
    fetch("http://localhost/routes/category.php", {
      method: "POST",
      body: data,
    });
    window.location.reload();
    console.log(categories);
  };

return (
    <Form onSubmit={saveCategory}>
      <Form.Control
        className="m-3"
        id="name"
        required
        size="md"
        type="text"
        placeholder="Categoria"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Control
        className="m-3"
        id="tax"
        required
        size="md"
        type="number"
        min="1"
        placeholder="Taxa"
        value={tax}
        onChange={(e) => setTax(e.target.value)}
      />
      <Button
        className="inputSalvar m-3"
        as="input"
        type="submit"
        value="Adicionar"
      />
    </Form>
);
}

export default FormCat;