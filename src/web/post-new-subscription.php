<?php
require_once("service.php");
header('Content-Type: application/json, charset=utf-8');
$request = json_decode(file_get_contents('php://input'), true);

$now = date("Y-m-d H:i:s", time());
$player = array(
                "id" => $request["id"],
                "registeredat" => $now,
                "firstname" => $request["firstname"],
                "lastname" => $request["lastname"],
                "phonenumber" => $request["phonenumber"]);

$tournment = read_tournament();

$result = array("result" => "");

if(count($tournment["players"]) < NUMBEROFACCEPTEDPLAYERS) {
  $tournment["players"][] = $player;
  $result = "player";
}
else {
  $tournment["waiters"][] = $player;
  $result = "waiter";
}


file_put_contents(TOURNAMENT_FILE, json_encode($tournment));

echo json_encode(array("result" => $result, "tournament" => $tournment));