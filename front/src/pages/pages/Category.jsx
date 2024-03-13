import { useState, useEffect } from "react";
import NavBar from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [tax, setTax] = useState([]);
 
  useEffect(() => {
    updateTable();
  }, []);
 
  const readCategory = async () => {
    try {
      const response = await fetch("http://localhost/routes/category.php");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Erro ao carregar categorias", error);
    }
  };
 
const saveCategory = (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append("name", name)
    data.append("tax", tax)
    fetch("http://localhost/routes/category.php", {
      method: "POST",
      body: data
    }); window.location.reload()
    console.log(categories)
  };
 
 
 
  const updateTable = async () => {
    const dbCategory = await readCategory();
    setCategories(dbCategory);
  };
 
  const deletarCategory = async (id) => {
    try {
      await fetch(`http://localhost/routes/category.php?id=${id}`, {
        method: "DELETE",
      });
      if(window.confirm('Deseja apagar esse produto?'))
      updateTable();
    } catch (error) {
      console.log("Erro ao excluir categoria", error);
    }
  };
 
  return (
    <>
      <NavBar />
      <Container>
      <div className="teste">
        <div className="teste container  justify-content-center row d-flex">
          <div className="col-6">
          <Form onSubmit={saveCategory}>
            <Form.Control
              className="m-3"
              id="name"
              required
              size="md"
              type="text"
              placeholder="Categoria"
              value={name}
              onChange={(e) =>
                setName(e.target.value )}
              
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
              onChange={(e) =>
                setTax(e.target.value )}
              
            />
            <Button
              className="inputSalvar m-3"
              as="input"
              type="submit"
              value="Adicionar"
            />
            </Form>
          </div>
          <div className="col-6">
            <Table className="m-3" bordered hover size="lg" responsive="sm">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Categoria</th>
                  <th>Taxa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <tr key={category.code}>
                    <td>{category.code}</td>
                    <td>{category.name}</td>
                    <td> {category.tax}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        size="sm"
                        onClick={() => deletarCategory(category.code)}
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
      </Container>
    </>
  );
};
export default Category;
 