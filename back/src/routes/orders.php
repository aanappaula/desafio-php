<?php
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header ('Access-Control-Allow-Headers: *');
header("Content-Type: application/json");

include "../services/ordersServices.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // echo 'Criar compra <br/>';
 
    $total = $_POST["total"];
    $tax = $_POST["tax"];
 
    $result = createOrders($total, $tax);
    echo $result;
}
 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readOrders();
    echo json_encode($data);
}
 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteOrders($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>