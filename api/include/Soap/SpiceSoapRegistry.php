<?php
namespace SpiceCRM\includes\Soap;
/*********************************************************************************
 * SugarCRM Community Edition is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/


use SpiceCRM\includes\Logger\LoggerManager;


/**
 * This class is responsible for providing all the registration of all the functions and complex types
 *
 */
class SpiceSoapRegistry {
	
	protected $serviceClass = null;
	
	/**
	 * Constructor.
	 *
	 * @param Class - $serviceClass
	 */
	public function __construct($serviceClass) {
		$this->serviceClass = $serviceClass;
	} // fn
			
	/**
	 * It registers all the functions and types by doign a call back method on service object
	 *
	 */
	public function register() {
		$this->registerFunction();
		$this->registerTypes();
	}
	
	/**
	 * This mehtod registers all the functions on the service class
	 *
	 */
	protected function registerFunction() {
		// START OF REGISTER FUNCTIONS
		
		LoggerManager::getLogger()->info('Begin: registry->registerFunction');
		
		$this->serviceClass->registerFunction(
		  	'login',
		     ['user_auth'=>'tns:user_auth', 'application_name'=>'xsd:string', 'name_value_list'=>'tns:name_value_list'],
		     ['return'=>'tns:entry_value']
		     );
		     
		$this->serviceClass->registerFunction(
			'logout',
			 ['session'=>'xsd:string'],
			 []);
			 
		$this->serviceClass->registerFunction(
		    'get_entry',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string', 'id'=>'xsd:string', 'select_fields'=>'tns:select_fields','link_name_to_fields_array'=>'tns:link_names_to_fields_array'],
		    ['return'=>'tns:get_entry_result_version2']);
		    
		$this->serviceClass->registerFunction(
		    'get_entries',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string', 'ids'=>'tns:select_fields', 'select_fields'=>'tns:select_fields', 'link_name_to_fields_array'=>'tns:link_names_to_fields_array'],
		    ['return'=>'tns:get_entry_result_version2']);
		    
		$this->serviceClass->registerFunction(
		    'get_entry_list',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string', 'query'=>'xsd:string', 'order_by'=>'xsd:string','offset'=>'xsd:int', 'select_fields'=>'tns:select_fields', 'link_name_to_fields_array'=>'tns:link_names_to_fields_array', 'max_results'=>'xsd:int', 'deleted'=>'xsd:int'],
		    ['return'=>'tns:get_entry_list_result_version2']);
		    
		$this->serviceClass->registerFunction(
		    'set_relationship',
		    ['session'=>'xsd:string','module_name'=>'xsd:string','module_id'=>'xsd:string','link_field_name'=>'xsd:string', 'related_ids'=>'tns:select_fields', 'name_value_list'=>'tns:name_value_list', 'delete'=>'xsd:int'],
		    ['return'=>'tns:new_set_relationship_list_result']);
		    
		$this->serviceClass->registerFunction(
		    'set_relationships',
		    ['session'=>'xsd:string','module_names'=>'tns:select_fields','module_ids'=>'tns:select_fields','link_field_names'=>'tns:select_fields','related_ids'=>'tns:new_set_relationhip_ids', 'name_value_lists'=>'tns:name_value_lists', 'delete_array' => 'tns:deleted_array'],
		    ['return'=>'tns:new_set_relationship_list_result']);
		    
		$this->serviceClass->registerFunction(
		    'get_relationships',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string', 'module_id'=>'xsd:string', 'link_field_name'=>'xsd:string', 'related_module_query'=>'xsd:string', 'related_fields'=>'tns:select_fields', 'related_module_link_name_to_fields_array'=>'tns:link_names_to_fields_array', 'deleted'=>'xsd:int'],
		    ['return'=>'tns:get_entry_result_version2']);
		    
		$this->serviceClass->registerFunction(
		    'set_entry',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string',  'name_value_list'=>'tns:name_value_list'],
		    ['return'=>'tns:new_set_entry_result']);
		    
		$this->serviceClass->registerFunction(
		    'set_entries',
		    ['session'=>'xsd:string', 'module_name'=>'xsd:string',  'name_value_lists'=>'tns:name_value_lists'],
		    ['return'=>'tns:new_set_entries_result']);

		$this->serviceClass->registerFunction(
		    'get_entries_count',
	        ['session'=>'xsd:string', 'module_name'=>'xsd:string', 'query'=>'xsd:string', 'deleted' => 'xsd:int'],
	        ['return'=>'tns:get_entries_count_result']);

	    LoggerManager::getLogger()->info('END: registry->registerFunction');
	}

	/**
	 * This method registers all the complex types
	 *
	 */
	protected function registerTypes() {
		
		// START OF REGISTER COMPLEX TYPES
		LoggerManager::getLogger()->info('Begin: registry->registerTypes');

		$this->serviceClass->registerType(
		   	 'user_auth',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'user_name'=> ['name'=>'user_name', 'type'=>'xsd:string'],
				'password' => ['name'=>'password', 'type'=>'xsd:string'],
            ]
		);
		
		$this->serviceClass->registerType(
		    'field',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
					'name'=> ['name'=>'name', 'type'=>'xsd:string'],
					'type'=> ['name'=>'type', 'type'=>'xsd:string'],
					'label'=> ['name'=>'label', 'type'=>'xsd:string'],
					'required'=> ['name'=>'required', 'type'=>'xsd:int'],
					'options'=> ['name'=>'options', 'type'=>'tns:name_value_list'],
		            'default_value'=> ['name'=>'name', 'type'=>'xsd:string'],
                ]
		);

		$this->serviceClass->registerType(
		    'field_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType','wsdl:arrayType'=>'tns:field[]']
            ],
			'tns:field'
		);

		$this->serviceClass->registerType(
		    'link_field',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
					'name'=> ['name'=>'name', 'type'=>'xsd:string'],
					'type'=> ['name'=>'type', 'type'=>'xsd:string'],
					'relationship'=> ['name'=>'relationship', 'type'=>'xsd:string'],
					'module'=> ['name'=>'module', 'type'=>'xsd:string'],
					'bean_name'=> ['name'=>'bean_name', 'type'=>'xsd:string'],
                ]
		);
		
		$this->serviceClass->registerType(
		    'link_field_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType','wsdl:arrayType'=>'tns:link_field[]']
            ],
			'tns:link_field'
		);

		$this->serviceClass->registerType(
		    'name_value',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
		        	'name'=> ['name'=>'name', 'type'=>'xsd:string'],
					'value'=> ['name'=>'value', 'type'=>'xsd:string'],
                ]
		);

		$this->serviceClass->registerType(
		    'name_value_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:name_value[]']
            ],
			'tns:name_value'
		);

		$this->serviceClass->registerType(
		    'name_value_lists',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:name_value_list[]']
            ],
			'tns:name_value_list'
		);

		$this->serviceClass->registerType(
		    'select_fields',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'xsd:string[]']
            ],
			'xsd:string'
		);

		$this->serviceClass->registerType(
		    'deleted_array',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'xsd:int[]']
            ],
			'xsd:string'
		);
		
		$this->serviceClass->registerType(
		    'new_module_fields',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
		        	'module_name'=> ['name'=>'module_name', 'type'=>'xsd:string'],
					'module_fields'=> ['name'=>'module_fields', 'type'=>'tns:field_list'],
					'link_fields'=> ['name'=>'link_fields', 'type'=>'tns:link_field_list'],
                ]
		);
		
		$this->serviceClass->registerType(
		    'entry_value',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
		        	'id'=> ['name'=>'id', 'type'=>'xsd:string'],
					'module_name'=> ['name'=>'module_name', 'type'=>'xsd:string'],
					'name_value_list'=> ['name'=>'name_value_list', 'type'=>'tns:name_value_list'],
                ]
		);
		
		$this->serviceClass->registerType(
		    'entry_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:entry_value[]']
            ],
			'tns:entry_value'
		);

		$this->serviceClass->registerType(
		   	 'set_entries_detail_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'name_value_lists' => ['name'=>'name_value_lists', 'type'=>'tns:name_value_lists'],
            ]
		);			
		$this->serviceClass->registerType(
		    'link_names_to_fields_array',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_name_to_fields_array[]']
            ],
			'tns:link_name_to_fields_array'
		);
		
		$this->serviceClass->registerType(
		    'link_name_to_fields_array',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
		        		'name'=> ['name'=>'name', 'type'=>'xsd:string'],
						'value'=> ['name'=>'value', 'type'=>'tns:select_fields'],
                ]
		);
		
		$this->serviceClass->registerType(
		    'link_value',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:name_value[]']
            ],
			'tns:name_value'
		);
		
		$this->serviceClass->registerType(
		    'link_array_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_value[]']
            ],
			'tns:link_value'
		);

		$this->serviceClass->registerType(
		    'link_name_value',
			'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
				[
		        	'name'=> ['name'=>'name', 'type'=>'xsd:string'],
					'records'=> ['name'=>'records', 'type'=>'tns:link_array_list'],
                ]
		);

		$this->serviceClass->registerType(
		    'link_list',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_name_value[]']
            ],
			'tns:link_name_value'
		);
		
		$this->serviceClass->registerType(
		    'link_lists',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_list[]']
            ],
			'tns:link_list'
		);
		
		$this->serviceClass->registerType(
		   	 'get_entry_result_version2',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'entry_list' => ['name' =>'entry_list', 'type'=>'tns:entry_list'],
				'relationship_list' => ['name' =>'relationship_list', 'type'=>'tns:link_lists'],
            ]
		);
		
		$this->serviceClass->registerType(
		   	 'return_search_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'entry_list' => ['name' =>'entry_list', 'type'=>'tns:link_list'],
            ]
		);

		$this->serviceClass->registerType(
		   	 'get_entry_list_result_version2',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'result_count' => ['name'=>'result_count', 'type'=>'xsd:int'],
				'next_offset' => ['name'=>'next_offset', 'type'=>'xsd:int'],
				'entry_list' => ['name' =>'entry_list', 'type'=>'tns:entry_list'],
				'relationship_list' => ['name' =>'relationship_list', 'type'=>'tns:link_lists'],
            ]
		);
		
		$this->serviceClass->registerType(
		   	 'new_set_entry_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'id' => ['name'=>'id', 'type'=>'xsd:string'],
            ]
		);
		
		$this->serviceClass->registerType(
		   	 'new_set_entries_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'ids' => ['name'=>'ids', 'type'=>'tns:select_fields'],
            ]
		);
		
		$this->serviceClass->registerType(
		    'new_set_relationhip_ids',
			'complexType',
		   	 'array',
		   	 '',
		  	  'SOAP-ENC:Array',
			[],
		    [
		        ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:select_fields[]']
            ],
			'tns:select_fields'
		);
		
		$this->serviceClass->registerType(
		   	 'new_set_relationship_list_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'created' => ['name'=>'created', 'type'=>'xsd:int'],
				'failed' => ['name'=>'failed', 'type'=>'xsd:int'],
				'deleted' => ['name'=>'deleted', 'type'=>'xsd:int'],
            ]
		);


		$this->serviceClass->registerType(
		   	 'get_entries_count_result',
		   	 'complexType',
		   	 'struct',
		   	 'all',
		  	  '',
			[
				'result_count'=> ['name'=>'result_count', 'type'=>'xsd:int'],
            ]
		);


        // v2_1
        $this->serviceClass->registerType(
            'link_list2',
            'complexType',
            'struct',
            'all',
            '',
            [
                'link_list'=> ['name'=>'link_list', 'type'=>'tns:link_list'],
            ]
        );

        $this->serviceClass->registerType(
            'link_lists',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_list2[]']
            ],
            'tns:link_list2'
        );

        $this->serviceClass->registerType(
            'link_array_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_value2[]']
            ],
            'tns:link_value2'
        );

        $this->serviceClass->registerType(
            'link_value2',
            'complexType',
            'struct',
            'all',
            '',
            [
                'link_value'=> ['name'=>'link_value', 'type'=>'tns:link_value'],
            ]
        );
        $this->serviceClass->registerType(
            'entry_list2',
            'complexType',
            'struct',
            'all',
            '',
            [
                "entry_list"=> ['name'=>'entry_list', 'type'=>'tns:entry_list'],
            ]
        );

        $this->serviceClass->registerType(
            'get_entry_list_result_version2',
            'complexType',
            'struct',
            'all',
            '',
            [
                'result_count' => ['name'=>'result_count', 'type'=>'xsd:int'],
                'total_count' => ['name'=>'total_count', 'type'=>'xsd:int'],
                'next_offset' => ['name'=>'next_offset', 'type'=>'xsd:int'],
                'entry_list' => ['name' =>'entry_list', 'type'=>'tns:entry_list'],
                'relationship_list' => ['name' =>'relationship_list', 'type'=>'tns:link_lists'],
            ]
        );


        $this->serviceClass->registerType(
            'link_list2',
            'complexType',
            'struct',
            'all',
            '',
            [
                'link_list'=> ['name'=>'link_list', 'type'=>'tns:link_list'],
            ]
        );
        $this->serviceClass->registerType(
            'link_lists',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_list2[]']
            ],
            'tns:link_list2'
        );

        $this->serviceClass->registerType(
            'link_array_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_value2[]']
            ],
            'tns:link_value2'
        );

        $this->serviceClass->registerType(
            'link_value2',
            'complexType',
            'struct',
            'all',
            '',
            [
                'link_value'=> ['name'=>'link_value', 'type'=>'tns:link_value'],
            ]
        );

        $this->serviceClass->registerType(
            'report_field_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType','wsdl:arrayType'=>'tns:field_list2[]']
            ],
            'tns:field_list2'
        );
        $this->serviceClass->registerType(
            'field_list2',
            'complexType',
            'struct',
            'all',
            '',
            [
                "field_list"=> ['name'=>'field_list', 'type'=>'tns:field_list'],
            ]
        );
        $this->serviceClass->registerType(
            'report_entry_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:entry_list2[]']
            ],
            'tns:entry_list2'
        );
        $this->serviceClass->registerType(
            'entry_list2',
            'complexType',
            'struct',
            'all',
            '',
            [
                "entry_list"=> ['name'=>'entry_list', 'type'=>'tns:entry_list'],
            ]
        );

        $this->serviceClass->registerType(
            'search_link_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:search_link_name_value[]']
            ],
            'tns:search_link_name_value'
        );

        $this->serviceClass->registerType(
            'search_link_name_value',
            'complexType',
            'struct',
            'all',
            '',
            [
                'name'=> ['name'=>'name', 'type'=>'xsd:string'],
                'records'=> ['name'=>'records', 'type'=>'tns:search_link_array_list'],
            ]
        );

        $this->serviceClass->registerType(
            'search_link_array_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:link_value[]']
            ],
            'tns:link_value'
        );

        // v4_1
        $this->serviceClass->registerType
        (
            'error_value',
            'complexType',
            'struct',
            'all',
            '',
            [
                'number'=> ['name'=>'number', 'type'=>'xsd:string'],
                'name'=> ['name'=>'name', 'type'=>'xsd:string'],
                'description'=> ['name'=>'description', 'type'=>'xsd:string'],
            ]
        );

        //modified_relationship_entry_list
        //This type holds the array of modified_relationship_entry types
        $this->serviceClass->registerType(
            'modified_relationship_entry_list',
            'complexType',
            'array',
            '',
            'SOAP-ENC:Array',
            [],
            [
                ['ref'=>'SOAP-ENC:arrayType', 'wsdl:arrayType'=>'tns:modified_relationship_entry[]']
            ],
            'tns:modified_relationship_entry'
        );

        //modified_relationship_entry
        //This type consists of id, module_name and name_value_list type
        $this->serviceClass->registerType
        (
            'modified_relationship_entry',
            'complexType',
            'struct',
            'all',
            '',
            [
                'id' => ['name'=>'id', 'type'=>'xsd:string'],
                'module_name' => ['name'=>'module_name', 'type'=>'xsd:string'],
                'name_value_list' => ['name'=>'name_value_lists', 'type'=>'tns:name_value_list']
            ]
        );

        //modified_relationship_result
        //the top level result array
        $this->serviceClass->registerType
        (
            'modified_relationship_result',
            'complexType',
            'struct',
            'all',
            '',
            [
                'result_count' => ['name'=>'result_count', 'type'=>'xsd:int'],
                'next_offset' => ['name'=>'next_offset', 'type'=>'xsd:int'],
                'entry_list' => ['name'=>'entry_list', 'type'=>'tns:modified_relationship_entry_list'],
                'error' => ['name' =>'error', 'type'=>'tns:error_value'],
            ]
        );
		
		LoggerManager::getLogger()->info('End: registry->registerTypes');
	}
}