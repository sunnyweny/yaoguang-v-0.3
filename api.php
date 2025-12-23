<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$db_file = 'remote_db.json';

// 1. 如果文件不存在，或者文件内容为空，初始化为一个空数组的 JSON
if (!file_exists($db_file) || filesize($db_file) == 0) {
    file_put_contents($db_file, json_encode([]));
}

$method = $_SERVER['REQUEST_METHOD'];
$file_raw = file_get_contents($db_file);
$current_data = json_decode($file_raw, true);

//如果解析失败（得到 null），强制转为空数组
if (!is_array($current_data)) {
    $current_data = [];
}

if ($method === 'GET') {
    // 确保即使没有数据，也输出 [] 而不是 null
    echo json_encode($current_data);
    exit;
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['nfc_id'])) {
        $found = false;
        // 使用引用遍历，方便修改
        foreach ($current_data as &$item) {
            if ($item['nfc_id'] === $input['nfc_id']) {
                $item = $input; // 存在则覆盖
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            $current_data[] = $input; // 不存在则追加
        }
        
        // 保存回文件，使用 JSON_UNESCAPED_UNICODE 防止中文变成乱码
        file_put_contents($db_file, json_encode($current_data, JSON_UNESCAPED_UNICODE));
        echo json_encode(["status" => "success", "data" => $input]);
        exit;
    } else {
        echo json_encode(["status" => "error", "message" => "Missing nfc_id"]);
        exit;
    }
}