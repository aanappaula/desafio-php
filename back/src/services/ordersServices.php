<?php
include '../index.php';
 
function createOrders(Float $total, Float $tax) {
    $createQuery = myPDO->prepare("insert into orders (total, tax) values ('{$total}', {$tax})");
    $createQuery->execute();
    $code = myPDO->lastInsertId();

    return json_encode(["code" => $code]);
};
 
function deleteOrders(Int $id) {
    $createQuery = myPDO->prepare("delete from orders where code={$id}");
    $createQuery->execute();
 
    return "order id={$id} deletada com sucesso";
};
 
function readOrders() {
    $readAllOrders = myPDO->query("SELECT * FROM orders");
    $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
?>