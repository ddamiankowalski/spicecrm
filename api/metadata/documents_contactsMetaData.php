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

SpiceDictionaryHandler::getInstance()->dictionary["documents_contacts"] = [
  'true_relationship_type' => 'many-to-many',
  'relationships' => 
  [
    'documents_contacts' => 
    [
      'lhs_module' => 'Documents',
      'lhs_table' => 'documents',
      'lhs_key' => 'id',
      'rhs_module' => 'Contacts',
      'rhs_table' => 'contacts',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'documents_contacts',
      'join_key_lhs' => 'document_id',
      'join_key_rhs' => 'contact_id',
    ],
  ],
  'table' => 'documents_contacts',
    'contenttype'   => 'relationdata',
  'fields' => 
  [
    0 => 
    [
      'name' => 'id',
      'type' => 'varchar',
      'len' => 36,
    ],
    1 => 
    [
      'name' => 'date_modified',
      'type' => 'datetime',
    ],
    2 => 
    [
      'name' => 'deleted',
      'type' => 'bool',
      'len' => '1',
      'default' => '0',
      'required' => true,
    ],
    3 => 
    [
      'name' => 'document_id',
      'type' => 'varchar',
      'len' => 36,
    ],
    4 => 
    [
      'name' => 'contact_id',
      'type' => 'varchar',
      'len' => 36,
    ],
  ],
  'indices' => 
  [
    0 => 
    [
      'name' => 'documents_contactsspk',
      'type' => 'primary',
      'fields' => 
      [
        0 => 'id',
      ],
    ],
    1 => 
    [
      'name' => 'documents_contacts_contact_id',
      'type' => 'alternate_key',
      'fields' => 
      [
        0 => 'contact_id',
        1 => 'document_id',
      ],
    ],
    2 => 
    [
      'name' => 'documents_contacts_document_id',
      'type' => 'alternate_key',
      'fields' => 
      [
        0 => 'document_id',
        1 => 'contact_id',
      ],
    ],
  ],
];
