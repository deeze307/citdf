<?php

function jwt_auth_function($data, $user) {
    //Obtenemos custom fields para usuario
    $url = home_url().'/wp-json/acf/v3/users/'.$user->ID;
    $response = wp_remote_get($url);
    if(is_array($response)){
        $custom_fields = json_decode( wp_remote_retrieve_body( $response ), true );
        $splitted = explode('<br />',$custom_fields['acf']['apt']);
        $data['custom_fields'] = $custom_fields['acf'];
        $formated = array();
        foreach($splitted as $item)
        {
            $item = str_replace("\r\n","",$item);
            array_push($formated,$item);
        }
        $data["user_roles"] = $user->roles;
        $data["custom_fields"]["user_email"] = $user->user_email;
        $data["custom_fields"]["url"] = $user->url;
        $data["custom_fields"]["name"] = $user->name;
        $data["custom_fields"]["description"] = $user->description;
        $data['custom_fields']['apt'] = $formated;
    }
    return $data;
}
add_filter( 'jwt_auth_token_before_dispatch', 'jwt_auth_function',10,2);




?>