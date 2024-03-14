import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function TableCat() {
  const [categories, setCategories] = useState([]);

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
  const deletarCategory = async (id) => {
    try {
      await fetch(`http://localhost/routes/category.php?id=${id}`, {
        method: "DELETE",
      });
      if (window.confirm("Deseja apagar esse produto?"))
        window.location.reload();
    } catch (error) {
      console.log("Erro ao excluir categoria", error);
    }
  };
  return (
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
  );
}
export default TableCat;
