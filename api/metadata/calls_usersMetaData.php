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

SpiceDictionaryHandler::getInstance()->dictionary['calls_users'] = [
    'table' => 'calls_users',
    'contenttype'   => 'relationdata',
    'fields' => [
        ['name' => 'id', 'type' => 'varchar', 'len' => '36'],
        ['name' => 'call_id', 'type' => 'varchar', 'len' => '36'],
        ['name' => 'user_id', 'type' => 'varchar', 'len' => '36'],
        ['name' => 'required', 'type' => 'varchar', 'len' => '1', 'default' => '1'],
        ['name' => 'accept_status', 'type' => 'varchar', 'len' => '25', 'default' => 'none'],
        ['name' => 'date_modified', 'type' => 'datetime'],
        ['name' => 'deleted', 'type' => 'bool', 'len' => '1', 'default' => '0', 'required' => false]
    ],
    'indices' => [
        ['name' => 'calls_userspk', 'type' => 'primary', 'fields' => ['id']],
        ['name' => 'idx_usr_call_call', 'type' => 'index', 'fields' => ['call_id']],
        ['name' => 'idx_usr_call_usr', 'type' => 'index', 'fields' => ['user_id']],
        ['name' => 'idx_call_users', 'type' => 'alternate_key', 'fields' => ['call_id', 'user_id']]
    ],
    'relationships' => [
        'calls_users' => [
            'lhs_module' => 'Calls',
            'lhs_table' => 'calls',
            'lhs_key' => 'id',
            'rhs_module' => 'Users',
            'rhs_table' => 'users',
            'rhs_key' => 'id',
            'relationship_type' => 'many-to-many',
            'join_table' => 'calls_users',
            'join_key_lhs' => 'call_id',
            'join_key_rhs' => 'user_id',
        ],
        // CR1000356
        'calls_users_status_accept' => [
            'lhs_module'		=> 'Calls',
            'lhs_table'			=> 'calls',
            'lhs_key'			=> 'id',
            'rhs_module'		=> 'Users',
            'rhs_table'			=> 'users',
            'rhs_key'			=> 'id',
            'relationship_type'	=> 'many-to-many',
            'relationship_role_column'	=> 'accept_status',
            'relationship_role_column_value'	=> 'accept',
            'join_table'		=> 'calls_users',
            'join_key_lhs'		=> 'call_id',
            'join_key_rhs'		=> 'user_id'
        ],
        'calls_users_status_decline' => [
            'lhs_module'		=> 'Calls',
            'lhs_table'			=> 'calls',
            'lhs_key'			=> 'id',
            'rhs_module'		=> 'Users',
            'rhs_table'			=> 'users',
            'rhs_key'			=> 'id',
            'relationship_type'	=> 'many-to-many',
            'relationship_role_column'	=> 'accept_status',
            'relationship_role_column_value'	=> 'decline',
            'join_table'		=> 'calls_users',
            'join_key_lhs'		=> 'call_id',
            'join_key_rhs'		=> 'user_id'
        ],
        'calls_users_status_tentative' => [
            'lhs_module'		=> 'Calls',
            'lhs_table'			=> 'calls',
            'lhs_key'			=> 'id',
            'rhs_module'		=> 'Users',
            'rhs_table'			=> 'users',
            'rhs_key'			=> 'id',
            'relationship_type'	=> 'many-to-many',
            'relationship_role_column'	=> 'accept_status',
            'relationship_role_column_value'	=> 'tentative',
            'join_table'		=> 'calls_users',
            'join_key_lhs'		=> 'call_id',
            'join_key_rhs'		=> 'user_id'
        ],
    ],
];
