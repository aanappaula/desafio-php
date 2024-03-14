import Button from "react-bootstrap/Button";

function ButtonCancel() {
  const cancelCompra = () => {
    const response = confirm("Deseja realmente cancelar o seu carrinho?");
    if (response);
    window.location.reload();
  };
  return (
    <Button
      className="btn-secondary"
      onClick={() => cancelCompra()}
      type="button"
    >
      Cancel
    </Button>
  );
}

export default ButtonCancel;
