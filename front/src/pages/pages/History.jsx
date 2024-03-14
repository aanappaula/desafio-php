import NavBar from "../../navbar/navbar";
import TableHist from "../../components/History/tableView";

const History = () => {
  return (
    <>
      <NavBar />
      <div className="teste container justify-content-center row d-flex">
        <div className="col-6">
          <TableHist />
        </div>
      </div>
    </>
  );
};
export default History;
