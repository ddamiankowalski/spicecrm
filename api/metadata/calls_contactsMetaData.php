<?php
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


use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;

SpiceDictionaryHandler::getInstance()->dictionary['calls_contacts'] = [
    'table' => 'calls_contacts',
    'contenttype'   => 'relationdata',
    'fields' => [
        'id' => ['name' =>'id', 'type' =>'varchar', 'len'=>'36']
      , 'call_id' => ['name' =>'call_id', 'type' =>'varchar', 'len'=>'36',]
      , 'contact_id' => ['name' =>'contact_id', 'type' =>'varchar', 'len'=>'36',]
      , 'required' => ['name' =>'required', 'type' =>'varchar', 'len'=>'1', 'default'=>'1']
      , 'accept_status' => ['name' =>'accept_status', 'type' =>'varchar', 'len'=>'25', 'default'=>'none']
      , 'date_modified' => ['name' => 'date_modified','type' => 'datetime']
      , 'deleted' => ['name' =>'deleted', 'type' =>'bool', 'len'=>'1', 'default'=>'0', 'required'=>false]
    ]
                                  , 'indices' => [
       ['name' =>'calls_contactspk', 'type' =>'primary', 'fields'=> ['id']]
      , ['name' =>'idx_con_call_call', 'type' =>'index', 'fields'=> ['call_id']]
      , ['name' =>'idx_con_call_con', 'type' =>'index', 'fields'=> ['contact_id']]
      , ['name' => 'idx_call_contact', 'type'=>'alternate_key', 'fields'=> ['call_id','contact_id']]
    ]

 	  , 'relationships' => ['calls_contacts' => ['lhs_module'=> 'Calls', 'lhs_table'=> 'calls', 'lhs_key' => 'id',
							  'rhs_module'=> 'Contacts', 'rhs_table'=> 'contacts', 'rhs_key' => 'id',
							  'relationship_type'=>'many-to-many',
							  'join_table'=> 'calls_contacts', 'join_key_lhs'=>'call_id', 'join_key_rhs'=>'contact_id']]

];
