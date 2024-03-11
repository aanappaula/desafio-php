import NavBar from "../../navbar/navbar";
import Table from "react-bootstrap/Table";

function Detail() {
  return (
    <>
    <NavBar/>
    <div className="teste container  justify-content-center row d-flex">
      <div className="col-12">
        <Table className="m-3" mt-5 bordered hover size="lg" responsive="sm">
          <thead>
            <tr>
              <th>Código Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Taxa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>35</td>
              <td>5</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
      </div>
    </>
  );
}
export default Detail;
