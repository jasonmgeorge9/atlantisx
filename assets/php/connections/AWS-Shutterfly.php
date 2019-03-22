<?php
ini_set('display_errors', '1');

include '../helperCurl.php';
include '../helperVault.php';

$sql = $_POST["sql"];

$apiVault = apiVault();
$hostname="jdbc:redshift://10.143.183.36:5439/dwhprod?ssl=true&sslfactory=com.amazon.redshift.ssl.NonValidatingFactory";
$username = "appcia_tableau_rs";
$password = $apiVault["aws_shutterfly"];
$dbname="dwhprod";

$mysqli = new mysqli($hostname, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}


$data = mysqli_query($mysqli, $sql) or
# And then, you'll have my permission to...
die(json_encode(array("error" => mysqli_error($mysqli))));

$resultArr = array();

if ($data->num_rows > 0) {
    // output data of each row
    while($row = $data->fetch_assoc()) {

        $row = array_map('utf8_encode', $row);
        $row = array_map("checkStr", $row);

    	$resultArr[] = $row;

    }
} else {

  # and you'll still have my permission to...
  die(json_encode(array("info" => "This SQL returned zero results.")));

}

$mysqli->close();


foreach (array_keys($resultArr[0]) as $value) {
  $headers[] = $value;
}

$output[] = $headers;

for ($j = 0; $j < count($resultArr); $j++) {
	for ($i = 0; $i < count($headers); $i++) {
		$row[] = $resultArr[$j][$headers[$i]];
	}
	$output[] = $row;
	unset($row);
}

echo json_encode($output);


function checkStr($str)
{
 
  if (is_numeric($str))
  {
    return($str + 0);
  }

return $str;

}


?>