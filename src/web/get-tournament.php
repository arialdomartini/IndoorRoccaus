<?php
require_once("service.php");
header('Content-Type: application/json; charset=utf-8');
echo json_encode(read_tournament());