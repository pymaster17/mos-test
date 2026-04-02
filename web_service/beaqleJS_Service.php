<?php	
    // BeaqleJS web service
    // 
    // Receives a JSON fromatted data structure containing listening test results and writes them to a text file.

    //error_reporting(-1);
    //ini_set('display_errors', true);

    // subfolder for results, folder has to exist and needs proper write permissions
    // --->
    $results_prefix = "./results/";
    // <---

    // bypass any (proxy) caching
    header("Cache-Control: no-cache, must-revalidate");    

    function sanitize_username($raw_name) {
        $username = str_replace(' ', '_', $raw_name);
        return preg_replace('/[^a-zA-Z0-9_-]/s', '', $username);
    }

    function build_filename($results_prefix, $username) {
        $filename = date("Ymd-Hi")."_".$username;
        $filenumber = mt_rand();
        while (file_exists($results_prefix.$filename."_".dechex($filenumber).".txt")) {
            $filenumber++;
        }
        return $filename."_".dechex($filenumber).".txt";
    }

    // check if data was received by a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        // allow requests from any domain
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header('Content-type: application/json');

        $content_type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
        $raw_body = file_get_contents('php://input');
        $decoded_json = null;

        if (strpos($content_type, 'application/json') !== false && !empty($raw_body)) {
            $decoded_json = json_decode($raw_body, true);

            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded_json)) {
                $username = "";
                if (isset($decoded_json['participant']['userName']) && strlen($decoded_json['participant']['userName']) < 128) {
                    $username = sanitize_username($decoded_json['participant']['userName']);
                }

                $filename_data = build_filename($results_prefix, $username);
                $succ = file_put_contents(
                    $results_prefix.$filename_data,
                    json_encode($decoded_json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                );

                if ($succ === false) {
                    $return['error'] = true;
                    $return['message'] = "Error writing data to file! (".$results_prefix.$filename_data.")";
                } else {
                    $return['error'] = false;
                    $return['message'] = "Data is saved!";
                }
            } else {
                $return['error'] = true;
                $return['message'] = "Invalid JSON payload sent!";
            }
        }
        // backwards compatibility with the original BeaqleJS form payload
        else if (isset($_POST['testresults']) && (strlen($_POST['testresults'])<1024*64)) { // maximum allowed upload size is 64kB
            $testresults = $_POST['testresults'];
            
            if (isset($_POST['username']) && (strlen($_POST['username'])<128)) {
                $username = sanitize_username($_POST['username']);
            } else {
                $username = "";
            }

            $filename_data = build_filename($results_prefix, $username);
            $succ = file_put_contents($results_prefix.$filename_data, print_r($testresults, TRUE));

            if ($succ===false) {
                $return['error'] = true;
                $return['message'] = "Error writing data to file! (".$results_prefix.$filename_data.")";    
            } else {
                $return['error'] = false;
                $return['message'] = "Data is saved!";    
            }
        } else {
            $return['error'] = true;
            $return['message'] = "Invalid data sent!";
        }
        
        // return 
        echo json_encode($return);

    } else {
        // perform a little self test
        echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><title>BeaqleJS Web Service</title>';
        echo "<p>This is a <a href='https://github.com/HSU-ANT/beaqlejs'>BeaqleJS</a> web service to collect listening test results...</p>";
        echo "Self check: <ul>";
        if (version_compare(phpversion(), '5.0', '>')) {
            echo "<li>PHP version <b style='color:green'>OK</b>.</li>";
        } else {
            echo "<li>PHP <b style='color:red'>version too old</b>, at least PHP 5.0 is required.</li>";
        }
        if (file_exists($results_prefix) && is_writable(dirname($results_prefix."test.txt"))) {
            echo "<li>Results subfolder exists and has write permission, <b style='color:green'>OK</b>.</li>";
        } else {
            echo "<li>Results subfolder does not exists or no write permission, <b style='color:red'>ERROR</b>.</li>";
        }
        echo "</ul>";

    }
?>
