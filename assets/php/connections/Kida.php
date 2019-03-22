<?php
//ini_set('display_errors', '1');

include '../helperCurl.php';
include '../helperVault.php';

$apiVault = apiVault();

$action = $_POST["action"];
$collection = $_POST["collection"];
$id = isset($_POST["id"]) ? $_POST["id"] : null;
$data = isset($_POST["data"]) ? $_POST["data"] : null;
$sort = isset($_POST["sort"]) ? $_POST["sort"] : null;

if ($action == 'read'){
	readMongo($collection, $data, $sort, $apiVault);
}
else if ($action == 'write'){
    writeMongo($collection, $id, $data, $apiVault);
}
else if ($action == 'delete'){
    deleteMongo($collection, $id, $apiVault);
}


function readMongo($collection, $data, $sort, $apiVault){

	$curlUrl = 'https://api.mlab.com/api/1/databases/kida/collections/'.$collection.'?q='.$data.'&s={"'.$sort.'":1}&apiKey='.$apiVault["kida"];

	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true
	);

    echo curlMe($curlUrl, $curlOptions);

}

function writeMongo($collection, $id, $data, $apiVault){

	$curlUrl = 'https://api.mlab.com/api/1/databases/kida/collections/'.$collection.'/'.$id.'?apiKey='.$apiVault["kida"];

	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true
		, CURLOPT_CUSTOMREQUEST => 'PUT'
		, CURLOPT_HTTPHEADER => array('Content-Type: application/json')
		, CURLOPT_POSTFIELDS => $data
	);

    echo curlMe($curlUrl, $curlOptions);


}

function deleteMongo($collection, $id, $apiVault){
    
    $curlUrl = 'https://api.mlab.com/api/1/databases/kida/collections/'.$collection.'/'.$id.'?apiKey='.$apiVault["kida"];

	$curlOptions = array(
		CURLOPT_RETURNTRANSFER => true
		, CURLOPT_CUSTOMREQUEST => 'DELETE'
		, CURLOPT_TIMEOUT => 300000
	);

    echo curlMe($curlUrl, $curlOptions);

}

