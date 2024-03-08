import BasicExample from "../../navbar/navbar";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

function Detail() {
  return (
    <>
      <BasicExample />
      <div className="teste container  justify-content-center row d-flex">
      <div className="col-12">
        <Table className="m-3" mt-5 bordered hover size="lg" responsive="sm">
          <thead>
            <tr>
              <th>Código</th>
              <th>Taxa</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>20</td>
              <td>31</td>
              <td>
                {" "}
                <button
                  type="button "
                  className="btn btn-success btn-sm"
                  size="sm"
                >
                    <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/detail">View</NavLink>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>30</td>
              <td>111</td>
              <td>
                {" "}
                <button
                  type="button "
                  className="btn btn-success btn-sm"
                  size="sm"
                >
                    <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/detail">View</NavLink>
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>50</td>
              <td>238</td>
              <td>
                {" "}
                <button
                  type="button "
                  className="btn btn-success btn-sm"
                  size="sm"
                >
                <NavLink className="text-white m-3" style={{ textDecoration: 'none' }} to="/detail">View</NavLink>
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </div>
    </>
  );
}
export default Detail;
