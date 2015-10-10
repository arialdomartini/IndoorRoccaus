<?php
define("TOURNAMENT_FILE", "./players.txt");
define("NUMBEROFACCEPTEDPLAYERS", 16);

date_default_timezone_set("UTC");

if(!file_exists(TOURNAMENT_FILE)) {
  save_tournament(array("players" => array(), "waiters" => array()));
}
  
function read_tournament() {
  $filecontent = file_get_contents(TOURNAMENT_FILE);
  return json_decode($filecontent, true);
}

function save_tournament($tournament) {
  file_put_contents(TOURNAMENT_FILE, json_encode($tournament, JSON_UNESCAPED_UNICODE));
}