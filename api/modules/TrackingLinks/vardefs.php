<?php
/*********************************************************************************
 * This file is part of SpiceCRM. SpiceCRM is an enhancement of SugarCRM Community Edition
 * and is developed by aac services k.s.. All rights are (c) 2016 by aac services k.s.
 * You can contact us at info@spicecrm.io
 * 
 * SpiceCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version
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
 * 
 * SpiceCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ********************************************************************************/



use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['TrackingLink'] = [
    'table' => 'trackinglinks',
    'comment' => 'a Module to store the tracking links sent in an email',
    'audited' => false,
    'duplicate_merge' => false,
    'unified_search' => false,
    'fields' => [
        'event' => [
            'name' => 'event',
            'type' => 'varchar',
            'len' => 36,
        ],
        'url' => [
            'name' => 'url',
            'vname' => 'LBL_URL',
            'type' => 'varchar',
            'len' => 255
        ],
        'date_entered' => [
            'name' => 'date_entered',
            'vname' => 'LBL_DATE_ENTERED',
            'type' => 'datetime',
            'required' => true,
            'comment' => 'Date record created'
        ],
        'parent_id' => [
            'name' => 'parent_id',
            'vname' => 'LBL_LIST_RELATED_TO_ID',
            'type' => 'id',
            'required' => true,
        ],
        'parent_type' => [
            'name' => 'parent_type',
            'vname' => 'LBL_PARENT_TYPE',
            'type' => 'parent_type',
            'dbType' => 'varchar',
            'required' => true,
            'len' => 255,
        ],
        'parent_name' => [
            'name' => 'parent_name',
            'type_name' => 'parent_type',
            'id_name' => 'parent_id',
            'vname' => 'LBL_RELATED_TO',
            'type' => 'parent',
            'source' => 'non-db',
        ],
        'campaigntasks' => [
            'vname' => 'LBL_CAMPAIGNTASKS',
            'name' => 'campaigntasks',
            'type' => 'link',
            'module' => 'CampaignTask',
            'relationship' => 'campaigntask_trackinglinks',
            'source' => 'non-db'
        ],
        'emails' => [
            'vname' => 'LBL_EMAILS',
            'name' => 'emails',
            'type' => 'link',
            'module' => 'Emails',
            'relationship' => 'emails_trackinglinks',
            'source' => 'non-db'
        ],
        'emailtrackingactions' => [
            'name' => 'emailtrackingactions',
            'type' => 'link',
            'module' => 'EmailTrackingActions',
            'relationship' => 'trackinglink_emailtrackingactions',
            'source' => 'non-db'
        ],


    ],
    'relationships' => [
        'campaigntask_trackinglinks' => [
            'lhs_module' => 'CampaignTasks',
            'lhs_table' => 'campaigntasks',
            'lhs_key' => 'id',
            'rhs_module' => 'TrackingLinks',
            'rhs_table' => 'trackinglinks',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many'
        ]
    ],
    'indices' => [],

];

VardefManager::createVardef('TrackingLinks', 'TrackingLink', ['default']);