<?php

define('USER', 'ginkgostreet');
define('PASS', '6584bxz');


$base_uri = 'https://services.onetcenter.org';
$base_path = str_replace("api_proxy", "", $_SERVER['REQUEST_URI']);
//'Authorization': 'Basic Z2lua2dvc3RyZWV0OjY1ODRieHo='
$auth = $_SERVER['HTTP_AUTHORIZATION'];


//This is allows any domain to access this proxy
header('Access-Control-Allow-Origin: *');

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $base_uri.$base_path);
curl_setopt($curl, CURLOPT_USERPWD, USER.":".PASS);

curl_exec ( $curl );
