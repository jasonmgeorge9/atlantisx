<?php
//ini_set('display_errors', '1');
ini_set('memory_limit','256M');

include '../helperCurl.php';
include '../helperVault.php';

$sql = $_POST["sql"];

$apiVault = apiVault();
$hostname="localhost";
$username = "ulysses_admin";
$password = $apiVault["ulysses"];
$dbname="Ulysses";

$mysqli = new mysqli($hostname, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$data = mysqli_query($mysqli, $sql) or
# And then, you'll have my permission to...
die(json_encode(array("error" => mysqli_error($mysqli))));


if ($data->num_rows > 0) {
    // output data of each row
    $csv = fopen("php://output", "w");
    $i=0;

    while($row = $data->fetch_assoc()) {

        if ($i==0){
          fputcsv($csv, array_map('utf8_encode', array_keys($row)),',','"');
          $i++;
        }

        $row = array_map('utf8_encode', $row);
        $row = array_map("checkStr", $row);
        fputcsv($csv, $row, ',', '"');

    }

    fclose($csv);
} else {

  # and you'll still have my permission to...
  die(json_encode(array("info" => "This SQL returned zero results.")));

}

$mysqli->close();


function checkStr($str)
{
 
  if (is_numeric($str))
  {
    return($str + 0);
  }

return $str;

}


?>