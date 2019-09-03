<?php
define( 'USER_AUTORITY_NAME', 'user_autority' );
define( 'USER_AUTORITY_META_KEY', '_user_autority' );

add_action( 'init', 'register_user_autority_taxonomy' );

function register_user_autority_taxonomy() {
	register_taxonomy(
		USER_AUTORITY_NAME, //taxonomy name
		'user', //object for which the taxonomy is created
		array( //taxonomy details
			'public' => true,
			'labels' => array(
				'name'		=> 'Autoridades',
				'singular_name'	=> 'Autoridad',
				'menu_name'	=> 'Autoridades',
				'search_items'	=> 'Buscar Autoridad',
				'popular_items' => 'Autoridades Populares',
				'all_items'	=> 'Todos las Autoridades',
				'edit_item'	=> 'Editar Autoridad',
				'update_item'	=> 'Actualizar Autoridad',
				'add_new_item'	=> 'Nueva Autoridad',
				'new_item_name'	=> 'Nombre de Nueva Autoridad',
			),
			'update_count_callback' => function() {
				return; //important
			}
		)
	);
}

add_action( 'admin_menu', 'add_user_autorities_admin_page' );

function add_user_autorities_admin_page() {
	$taxonomy = get_taxonomy( USER_AUTORITY_NAME );
	add_users_page(
		esc_attr( $taxonomy->labels->menu_name ),//page title
		esc_attr( $taxonomy->labels->menu_name ),//menu title
		$taxonomy->cap->manage_terms,//capability
		'edit-tags.php?taxonomy=' . $taxonomy->name//menu slug
	);
}

add_filter( 'submenu_file', 'set_user_autority_submenu_active' );

function set_user_autority_submenu_active( $submenu_file ) {
	global $parent_file;
	if( 'edit-tags.php?taxonomy=' . USER_AUTORITY_NAME == $submenu_file ) {
		$parent_file = 'users.php';
	}
	return $submenu_file;
}

add_action( 'show_user_profile', 'admin_user_profile_autority_select' );
add_action( 'edit_user_profile', 'admin_user_profile_autority_select' );

function admin_user_profile_autority_select( $user ) {
	$taxonomy = get_taxonomy( USER_AUTORITY_NAME );
	
	if ( !user_can( $user, 'author' ) ) {
		return;
	}
	?>
	<table class="form-table">
		<tr>
			<th>
				<label for="<?php echo USER_AUTORITY_META_KEY ?>">Autoridad</label>
			</th>
			<td>
				<?php
					$user_autority_terms = get_terms( array(
						'taxonomy' => USER_AUTORITY_NAME,
						'hide_empty' => 0
					) );
					
					$select_options = array();
					
					foreach ( $user_autority_terms as $term ) {
						$select_options[$term->term_id] = $term->name;
					}
					
					$meta_values = get_user_meta( $user->ID, USER_AUTORITY_META_KEY, true );
					
					echo custom_form_select_autority(
						USER_AUTORITY_META_KEY,
						$meta_values,
						$select_options,
						'',
						array( 'multiple' =>'multiple' )
					);
				?>
			</td>
		</tr>
	</table>
	<?php
}

function custom_form_select_autority( $name, $value, $options, $default_var ='', $html_params = array() ) {
	if( empty( $options ) ) {
		$options = array( '' => '-- Seleccione --');
	}

	$html_params_string = '';
	
	if( !empty( $html_params ) ) {
		if ( array_key_exists( 'multiple', $html_params ) ) {
			$name .= '[]';
		}
		foreach( $html_params as $html_params_key => $html_params_value ) {
			$html_params_string .= " {$html_params_key}='{$html_params_value}'";
		}
	}

	echo "<select name='{$name}'{$html_params_string}>";
	
	foreach( $options as $options_value => $options_label ) {
		if( ( is_array( $value ) && in_array( $options_value, $value ) )
			|| $options_value == $value ) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		if( empty( $value ) && !empty( $default_var ) && $options_value == $default_var ) {
			$selected = " selected='selected'";
		}
		echo "<option value='{$options_value}'{$selected}>{$options_label}</option>";
	}

	echo "</select>";
}

add_action( 'personal_options_update', 'admin_save_user_autorities' );
add_action( 'edit_user_profile_update', 'admin_save_user_autorities' );

function admin_save_user_autorities( $user_id ) {
	$tax = get_taxonomy( USER_AUTORITY_NAME );
	$user = get_userdata( $user_id );

	if ( !user_can( $user, 'author' ) ) {
		return false;
	}
	
	$new_autorities_ids = $_POST[USER_AUTORITY_META_KEY];
	$user_meta = get_user_meta( $user_id, USER_AUTORITY_META_KEY, true );
	$previous_autorities_ids = array();
	
	if( !empty( $user_meta ) ) {
		$previous_autorities_ids = (array)$user_meta;
	}

	if( ( current_user_can( 'administrator' ) && $_POST['role'] != 'matriculado' ) ) {
		delete_user_meta( $user_id, USER_AUTORITY_META_KEY );
		update_users_autorities_count( $previous_autorities_ids, array() );
	} else {
		update_user_meta( $user_id, USER_AUTORITY_META_KEY, $new_autorities_ids );
		update_users_autorities_count( $previous_autorities_ids, $new_autorities_ids );
	}
}

function update_users_autorities_count( $previous_terms_ids, $new_terms_ids ) {
	global $wpdb;

	$terms_ids = array_unique( array_merge( (array)$previous_terms_ids, (array)$new_terms_ids ) );
	
	if( count( $terms_ids ) < 1 ) { return; }
	
	foreach ( $terms_ids as $term_id ) {
		$count = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(*) FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value LIKE %s",
				USER_AUTORITY_META_KEY,
				'%"' . $term_id . '"%'
			)
		);
		$wpdb->update( $wpdb->term_taxonomy, array( 'count' => $count ), array( 'term_taxonomy_id' => $term_id ) );
	}
}
