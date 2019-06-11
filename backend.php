<?php
set_time_limit(0);
require __DIR__ . '/vendor/autoload.php';

$options = array(
  'cluster' => 'eu',
  'useTLS' => true
);
$pusher = new Pusher\Pusher(
  'bfb73ca0e0400e32b1e9',
  '3d01092c03e2489619cc',
  '794355',
  $options
);


$pusher->trigger('notify-channel', 'json-updated', "\0");

$pusher->$content = json_encode($jsonArray);
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/data.json", "wb");
fwrite($fp, $content);
fclose($fp);
