<?php

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE');
header ('Access-Control-Allow-Headers: X-Requested-With');
include "../services/productServices.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar produto <br/>';
 
    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $amount = filter_var($_POST["amount"]);
    $price = filter_var($_POST["price"]);
    $category= filter_var($_POST["category"], FILTER_SANITIZE_NUMBER_INT);
    $result = createProduct($name, $amount, $price, $category);
    echo $result;
}
 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readProducts();
    echo json_encode($data);
}
 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteProduct($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>