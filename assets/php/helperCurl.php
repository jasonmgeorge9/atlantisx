<?php 

function curlMe($url, $options) {

	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);

	foreach ($options as $key => $value) {
		curl_setopt($ch, $key, $value);
	}

    $response = curl_exec($ch);

    return $response;

}