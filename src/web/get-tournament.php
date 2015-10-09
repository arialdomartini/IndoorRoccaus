<?php
require_once("service.php");
header('Content-Type: application/json');
echo json_encode(read_tournament());