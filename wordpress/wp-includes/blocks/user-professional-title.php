<?php
define( 'USER_PROFESSION_NAME', 'user_profession' );
define( 'USER_PROFESSION_META_KEY', '_user_profession' );

add_action( 'init', 'register_user_profession_taxonomy' );

function register_user_profession_taxonomy() {
	register_taxonomy(
		USER_PROFESSION_NAME, //taxonomy name
		'user', //object for which the taxonomy is created
		array( //taxonomy details
			'public' => true,
			'labels' => array(
				'name'		=> 'Titulos Profesionales',
				'singular_name'	=> 'Titulo Profesional',
				'menu_name'	=> 'Titulos Profesionales',
				'search_items'	=> 'Buscar Titulo Profesional',
				'popular_items' => 'Titulos Populares',
				'all_items'	=> 'Todos los Titulos Profesionales',
				'edit_item'	=> 'Editar Titulo Profesional',
				'update_item'	=> 'Actualizar Titulo Profesional',
				'add_new_item'	=> 'Nuevo Titulo Profesional',
				'new_item_name'	=> 'Nombre de Nuevo Titulo Profesional',
			),
			'update_count_callback' => function() {
				return; //important
			}
		)
	);
}

add_action( 'admin_menu', 'add_user_professions_admin_page' );

function add_user_professions_admin_page() {
	$taxonomy = get_taxonomy( USER_PROFESSION_NAME );
	add_users_page(
		esc_attr( $taxonomy->labels->menu_name ),//page title
		esc_attr( $taxonomy->labels->menu_name ),//menu title
		$taxonomy->cap->manage_terms,//capability
		'edit-tags.php?taxonomy=' . $taxonomy->name//menu slug
	);
}

add_filter( 'submenu_file', 'set_user_profession_submenu_active' );

function set_user_profession_submenu_active( $submenu_file ) {
	global $parent_file;
	if( 'edit-tags.php?taxonomy=' . USER_PROFESSION_NAME == $submenu_file ) {
		$parent_file = 'users.php';
	}
	return $submenu_file;
}

add_action( 'show_user_profile', 'admin_user_profile_profession_select' );
add_action( 'edit_user_profile', 'admin_user_profile_profession_select' );

function admin_user_profile_profession_select( $user ) {
	$taxonomy = get_taxonomy( USER_PROFESSION_NAME );
	
	if ( !user_can( $user, 'matriculado' ) ) {
		return;
	}
	?>
	<table class="form-table">
		<tr>
			<th>
				<label for="<?php echo USER_PROFESSION_META_KEY ?>">Titulo Profesional</label>
			</th>
			<td>
				<?php
					$user_profession_terms = get_terms( array(
						'taxonomy' => USER_PROFESSION_NAME,
						'hide_empty' => 0
					) );
					
					$select_options = array();
					
					foreach ( $user_profession_terms as $term ) {
						$select_options[$term->term_id] = $term->name;
					}
					
					$meta_values = get_user_meta( $user->ID, USER_PROFESSION_META_KEY, true );
					
					echo custom_form_select(
						USER_PROFESSION_META_KEY,
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

function custom_form_select( $name, $value, $options, $default_var ='', $html_params = array() ) {
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

add_action( 'personal_options_update', 'admin_save_user_professions' );
add_action( 'edit_user_profile_update', 'admin_save_user_professions' );

function admin_save_user_professions( $user_id ) {
	$tax = get_taxonomy( USER_PROFESSION_NAME );
	$user = get_userdata( $user_id );

	if ( !user_can( $user, 'author' ) ) {
		return false;
	}
	
	$new_professions_ids = $_POST[USER_PROFESSION_META_KEY];
	$user_meta = get_user_meta( $user_id, USER_PROFESSION_META_KEY, true );
	$previous_professions_ids = array();
	
	if( !empty( $user_meta ) ) {
		$previous_professions_ids = (array)$user_meta;
	}

	if( ( current_user_can( 'administrator' ) && $_POST['role'] != 'matriculado' ) ) {
		delete_user_meta( $user_id, USER_PROFESSION_META_KEY );
		update_users_professions_count( $previous_professions_ids, array() );
	} else {
		update_user_meta( $user_id, USER_PROFESSION_META_KEY, $new_professions_ids );
		update_users_professions_count( $previous_professions_ids, $new_professions_ids );
	}
}

function update_users_professions_count( $previous_terms_ids, $new_terms_ids ) {
	global $wpdb;

	$terms_ids = array_unique( array_merge( (array)$previous_terms_ids, (array)$new_terms_ids ) );
	
	if( count( $terms_ids ) < 1 ) { return; }
	
	foreach ( $terms_ids as $term_id ) {
		$count = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(*) FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value LIKE %s",
				USER_PROFESSION_META_KEY,
				'%"' . $term_id . '"%'
			)
		);
		$wpdb->update( $wpdb->term_taxonomy, array( 'count' => $count ), array( 'term_taxonomy_id' => $term_id ) );
	}
}
