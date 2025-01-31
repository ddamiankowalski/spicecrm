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
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['Opportunity'] = [
    'table' => 'opportunities',
    'audited' => true,
    'unified_search' => true,
    'full_text_search' => true,
    'unified_search_default_enabled' => true,
    'duplicate_merge' => true,
    'comment' => 'An opportunity is the target of selling activities',
    'fields' => [
        'name' => [
            'name' => 'name',
            'vname' => 'LBL_NAME',
            'type' => 'name',
            'dbType' => 'varchar',
            'len' => '50',
            'unified_search' => true,
            'full_text_search' => ['boost' => 3],
            'comment' => 'Name of the opportunity',
            'merge_filter' => 'selected',
            'importable' => 'required',
            'required' => true,
        ],
        'opportunity_type' => [
            'name' => 'opportunity_type',
            'vname' => 'LBL_TYPE',
            'type' => 'enum',
            'options' => 'opportunity_type_dom',
            'len' => '255',
            'audited' => true,
            'comment' => 'Type of opportunity (ex: Existing, New)',
            'merge_filter' => 'enabled',
        ],
        'account_name' => [
            'name' => 'account_name',
            'rname' => 'name',
            'id_name' => 'account_id',
            'vname' => 'LBL_ACCOUNT',
            'type' => 'relate',
            'module' => 'Accounts',
            'link' => 'accounts',
            'source' => 'non-db',
            'required' => true,
        ],
        'account_id' => [
            'name' => 'account_id',
            'vname' => 'LBL_ACCOUNT_ID',
            'type' => 'id',
//            'source' => 'non-db',
            'audited' => true,
        ],
        'campaign_id' => [
            'name' => 'campaign_id',
            'comment' => 'Campaign that generated lead',
            'vname' => 'LBL_CAMPAIGN_ID',
            'rname' => 'id',
            'type' => 'id',
            'dbType' => 'id',
            'table' => 'campaigns',
            'isnull' => 'true',
            'module' => 'Campaigns',
            //'dbType' => 'char',
            'reportable' => false,
            'duplicate_merge' => 'disabled',
        ],
        'campaign_name' => [
            'name' => 'campaign_name',
            'rname' => 'name',
            'id_name' => 'campaign_id',
            'vname' => 'LBL_CAMPAIGN',
            'type' => 'relate',
            'link' => 'campaign_opportunities',
            'isnull' => 'true',
            'table' => 'campaigns',
            'module' => 'Campaigns',
            'source' => 'non-db',
            'additionalFields' => ['id' => 'campaign_id']
        ],
        'campaign_opportunities' => [
            'name' => 'campaign_opportunities',
            'type' => 'link',
            'vname' => 'LBL_CAMPAIGN',
            'relationship' => 'campaign_opportunities',
            'source' => 'non-db',
        ],
        'potentials' => [
            'name' => 'potentials',
            'module' => 'Potentials',
            'type' => 'link',
            'vname' => 'LBL_POTENTIALS',
            'relationship' => 'potentials_opportunities',
            'source' => 'non-db',
            'rel_fields' => [
                'amount' => [
                    'type' => 'currency',
                    'map' => 'opportunity_amount'
                ],
                'amount_systemcurrency' => [
                    'type' => 'currency',
                    'map' => 'opportunity_amount_usdollar'
                ]
            ]
        ],
        'opportunitypotentials' => [
            'name' => 'opportunitypotentials',
            'type' => 'json',
            'vname' => 'LBL_OPPORTUNITYPOTENTIALS',
            'source' => 'non-db'
        ],
        'lead_source' => [
            'name' => 'lead_source',
            'vname' => 'LBL_LEAD_SOURCE',
            'type' => 'enum',
            'options' => 'lead_source_dom',
            'len' => '50',
            'comment' => 'Source of the opportunity',
            'merge_filter' => 'enabled',
        ],
        'amount' => [
            'name' => 'amount',
            'vname' => 'LBL_AMOUNT',
            //'function'=>array('vname'=>'getCurrencyType'),
            'type' => 'currency',
            'dbType' => 'double',
            'comment' => 'Unconverted amount of the opportunity',
            'importable' => 'required',
            'duplicate_merge' => '1',
            'required' => true,
            'options' => 'numeric_range_search_dom',
            'enable_range_search' => true,
        ],
        'amount_usdollar' => [ /**@deprecated**/
            'name' => 'amount_usdollar',
            'vname' => 'LBL_AMOUNT_USDOLLAR',
            'type' => 'currency',
            'dbType' => 'double',
            'disable_num_format' => true,
            'duplicate_merge' => '0',
            'audited' => true,
            'comment' => 'Formatted amount of the opportunity',
        ],
        'amount_systemcurrency' => [
            'name' => 'amount_systemcurrency',
            'vname' => 'LBL_AMOUNT_SYSTEMCURRENCY',
            'type' => 'currency',
            'dbType' => 'double',
            'disable_num_format' => true,
            'duplicate_merge' => '0',
            'audited' => true,
            'comment' => 'Original amount as per default currency of the opportunity',
        ],
        'forecast' => [
            'name' => 'forecast',
            'vname' => 'LBL_FORECAST',
            'type' => 'bool'
        ],
        'budget' => [
            'name' => 'budget',
            'vname' => 'LBL_BUDGET',
            'type' => 'currency',
            'dbType' => 'double',
            'comment' => 'the customers budget',
            'options' => 'numeric_range_search_dom',
            'enable_range_search' => true,
        ],
        'bestcase' => [
            'name' => 'bestcase',
            'vname' => 'LBL_BESTCASE',
            'type' => 'currency',
            'dbType' => 'double',
            'comment' => 'the upsdie in the opportunity',
            'options' => 'numeric_range_search_dom',
            'enable_range_search' => true,
        ],
        'worstcase' => [
            'name' => 'worstcase',
            'vname' => 'LBL_WORSTCASE',
            'type' => 'currency',
            'dbType' => 'double',
            'comment' => 'the downside in the opportunity',
            'options' => 'numeric_range_search_dom',
            'enable_range_search' => true,
        ],
        'currency_id' => [
            'name' => 'currency_id',
            'type' => 'id',
            'vname' => 'LBL_CURRENCY',
            'reportable' => false,
            'comment' => 'Currency used for display purposes'
        ],
        'currency_name' => [
            'name' => 'currency_name',
            'rname' => 'name',
            'id_name' => 'currency_id',
            'vname' => 'LBL_CURRENCY',
            'type' => 'relate',
            'isnull' => 'true',
            'table' => 'currencies',
            'module' => 'Currencies',
            'source' => 'non-db',
            'function' => ['name' => 'getCurrencyNameDropDown', 'returns' => 'html'],
            'duplicate_merge' => 'disabled',
        ],
        'currency_symbol' => [
            'name' => 'currency_symbol',
            'rname' => 'symbol',
            'id_name' => 'currency_id',
            'vname' => 'LBL_CURRENCY_SYMBOL',
            'type' => 'relate',
            'isnull' => 'true',
            'table' => 'currencies',
            'module' => 'Currencies',
            'source' => 'non-db',
            'function' => ['name' => 'getCurrencySymbolDropDown', 'returns' => 'html'],
            'duplicate_merge' => 'disabled',
        ],
        'date_closed' => [
            'name' => 'date_closed',
            'vname' => 'LBL_DATE_CLOSED',
            'type' => 'date',
            'audited' => true,
            'comment' => 'Expected or actual date the oppportunity will close',
            'importable' => 'required',
            'required' => true,
            'enable_range_search' => true,
            'options' => 'date_range_search_dom',
        ],
        'next_step' => [
            'name' => 'next_step',
            'vname' => 'LBL_NEXT_STEP',
            'type' => 'varchar',
            'len' => '100',
            'comment' => 'The next step in the sales process',
            'merge_filter' => 'enabled',
        ],
        'sales_stage' => [
            'name' => 'sales_stage',
            'vname' => 'LBL_SALES_STAGE',
            'type' => 'enum',
            'options' => 'sales_stage_dom',
            'len' => '255',
            'audited' => true,
            'comment' => 'Indication of progression towards closure',
            'merge_filter' => 'enabled',
            'importable' => 'required',
            'required' => true,
        ],
        'probability' => [
            'name' => 'probability',
            'vname' => 'LBL_PROBABILITY',
            'type' => 'int',
            'dbtype' => 'double',
            'audited' => true,
            'comment' => 'The probability of closure',
            'validation' => ['type' => 'range', 'min' => 0, 'max' => 100],
            'merge_filter' => 'enabled',
        ],
        // value proposition
        'cust_busneeds' => [
            'name' => 'cust_busneeds',
            'vname' => 'LBL_CUST_BUSNEEDS',
            'type' => 'text'
        ],
        'cust_painpoints' => [
            'name' => 'cust_painpoints',
            'vname' => 'LBL_CUST_PAINPOINTS',
            'type' => 'text'
        ],
        'cust_solutionproposal' => [
            'name' => 'cust_solutionproposal',
            'vname' => 'LBL_CUST_SOLUTIONPROPOSAL',
            'type' => 'text'
        ],
        'cust_valueproposition' => [
            'name' => 'cust_valueproposition',
            'vname' => 'LBL_CUST_VALUEPROPOSITION',
            'type' => 'text'
        ],
        'loss_reason' => [
            'name' => 'loss_reason',
            'vname' => 'LBL_LOSS_REASON',
            'type' => 'text'
        ],
        // links
        'accounts' => [
            'name' => 'accounts',
            'type' => 'link',
            'relationship' => 'accounts_opportunities',
            'source' => 'non-db',
            'link_type' => 'one',
            'module' => 'Accounts',
            'bean_name' => 'Account',
            'vname' => 'LBL_ACCOUNTS',
        ],
        'contacts' => [
            'name' => 'contacts',
            'type' => 'link',
            'relationship' => 'opportunities_contacts',
            'source' => 'non-db',
            'module' => 'Contacts',
            'bean_name' => 'Contact',
            'rel_fields' => [
                'contact_role' => [
                    'map' => 'opportunity_role'
                ],
                'propensity_to_buy' => [
                    'map' => 'opportunity_propensity_to_buy'
                ],
                'level_of_support' => [
                    'map' => 'opportunity_level_of_support'
                ],
                'level_of_influence' => [
                    'map' => 'opportunity_level_of_influence'
                ]
            ],
            'vname' => 'LBL_CONTACTS',
            'hide_history_contacts_emails' => true,
        ],
        'users' => [
            'name' => 'users',
            'type' => 'link',
            'relationship' => 'opportunities_users',
            'source' => 'non-db',
            'module' => 'Users',
            'rel_fields' => [
                'user_role' => [
                    'type' => 'enum',
                    'options' => 'opportunity_urelationship_type_dom',
                    'map' => 'opportunity_role'
                ]
            ],
            'vname' => 'LBL_USERS'
        ],
        'tasks' => [
            'name' => 'tasks',
            'type' => 'link',
            'relationship' => 'opportunity_tasks',
            'source' => 'non-db',
            'vname' => 'LBL_TASKS',
        ],
        'notes' => [
            'name' => 'notes',
            'type' => 'link',
            'relationship' => 'opportunity_notes',
            'source' => 'non-db',
            'vname' => 'LBL_NOTES',
        ],
        'meetings' => [
            'name' => 'meetings',
            'type' => 'link',
            'relationship' => 'opportunity_meetings',
            'source' => 'non-db',
            'vname' => 'LBL_MEETINGS',
        ],
        'calls' => [
            'name' => 'calls',
            'type' => 'link',
            'relationship' => 'opportunity_calls',
            'source' => 'non-db',
            'vname' => 'LBL_CALLS',
        ],
        'emails' => [
            'name' => 'emails',
            'type' => 'link',
            'relationship' => 'emails_opportunities_rel',/* reldef in emails */
            'source' => 'non-db',
            'vname' => 'LBL_EMAILS',
        ],
        'documents' => [
            'name' => 'documents',
            'type' => 'link',
            'relationship' => 'documents_opportunities',
            'source' => 'non-db',
            'vname' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
        ],
        //@deprecated project. Use projects
//        'project' => array(
//            'name' => 'project',
//            'type' => 'link',
//            'relationship' => 'projects_opportunities',
//            'source' => 'non-db',
//            'vname' => 'LBL_PROJECTS_DEPRECATED',
//        ),
        'projects' => [
            'name' => 'projects',
            'type' => 'link',
            'relationship' => 'projects_opportunities',
            'source' => 'non-db',
            'vname' => 'LBL_PROJECTS',
        ],
        'leads' => [
            'name' => 'leads',
            'type' => 'link',
            'relationship' => 'opportunity_leads',
            'source' => 'non-db',
            'vname' => 'LBL_LEADS',
        ],
        'campaigns' => [
            'name' => 'campaigns',
            'type' => 'link',
            'relationship' => 'opportunities_campaign',
            'module' => 'CampaignLog',
            'bean_name' => 'CampaignLog',
            'source' => 'non-db',
            'vname' => 'LBL_CAMPAIGNS',
            'reportable' => false
        ],
        'campaign_link' => [
            'name' => 'campaign_link',
            'type' => 'link',
            'relationship' => 'opportunities_campaign',
            'vname' => 'LBL_CAMPAIGNS',
            'link_type' => 'one',
            'module' => 'Campaigns',
            'bean_name' => 'Campaign',
            'source' => 'non-db',
            'reportable' => false
        ],
        'currencies' => [
            'name' => 'currencies',
            'type' => 'link',
            'relationship' => 'opportunity_currencies',
            'source' => 'non-db',
            'vname' => 'LBL_CURRENCIES',
        ],
        'competitorassessments' => [
            'name' => 'competitorassessments',
            'type' => 'link',
            'relationship' => 'competitorassessments_opportunities',
            'vname' => 'LBL_COMPETITORASSESSMENTS',
            'link_type' => 'one',
            'module' => 'CompetitorAssessments',
            'bean_name' => 'CompetitorAssessment',
            'source' => 'non-db',
            'reportable' => false
        ],
        'proposals' => [
            'name' => 'proposals',
            'vname' => 'LBL_PROPOSALS',
            'type' => 'link',
            'relationship' => 'opportunities_proposals_rel',
            'link_type' => 'one',
            'source' => 'non-db',
        ],
        'opportunitystages' => [
            'name' => 'opportunitystages',
            'type' => 'link',
            'relationship' => 'opportunity_opportunitystages',
            'source' => 'non-db',
            'link_type' => 'one',
            'module' => 'OpportunityStages',
            'bean_name' => 'OpportunityStage',
            'vname' => 'LBL_OPPORTUNITYSTAGES',
        ],
        'opportunityrevenuesplit' => [
            'name' => 'opportunityrevenuesplit',
            'type' => 'enum',
            'len' => 10,
            'default' => 'none',
            'options' => 'opportunityrevenuesplit_dom',
            'vname' => 'LBL_SPLITTYPE'
        ],
        'opportunityrevenuelines' => [
            'name' => 'opportunityrevenuelines',
            'type' => 'link',
            'relationship' => 'opportunity_opportunityrevenuelines',
            'source' => 'non-db',
            'link_type' => 'one',
            'module' => 'OpportunityRevenueLines',
            'bean_name' => 'OpportunityRevenueLine',
            'vname' => 'LBL_OPPORTUNITYREVENUELINES',
            'default' => true
        ]
    ],
    'indices' => [
        [
            'name' => 'idx_opp_name',
            'type' => 'index',
            'fields' => ['name'],
        ],
        [
            'name' => 'idx_opp_assigned',
            'type' => 'index',
            'fields' => ['assigned_user_id'],
        ],
        [
            'name' => 'idx_opp_id_deleted',
            'type' => 'index',
            'fields' => ['id', 'deleted'],
        ],
        [
            'name' => 'idx_opp_assigned_del_sales_stage', //for UI assitant
            'type' => 'index',
            'fields' => ['assigned_user_id', 'deleted', 'sales_stage'],
        ],
    ],

    'relationships' => [
        'opportunity_calls' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Calls', 'rhs_table' => 'calls', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Opportunities']
    , 'opportunity_meetings' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Meetings', 'rhs_table' => 'meetings', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Opportunities']
    , 'opportunity_tasks' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Tasks', 'rhs_table' => 'tasks', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Opportunities']
    , 'opportunity_notes' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Notes', 'rhs_table' => 'notes', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Opportunities']
    , 'opportunity_emails' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Emails', 'rhs_table' => 'emails', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Opportunities']
    , 'opportunity_leads' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'id',
            'rhs_module' => 'Leads', 'rhs_table' => 'leads', 'rhs_key' => 'opportunity_id',
            'relationship_type' => 'one-to-many']
    , 'opportunity_currencies' => ['lhs_module' => 'Opportunities', 'lhs_table' => 'opportunities', 'lhs_key' => 'currency_id',
            'rhs_module' => 'Currencies', 'rhs_table' => 'currencies', 'rhs_key' => 'id',
            'relationship_type' => 'one-to-many'],
    'accounts_opportunities' => [
        'lhs_module' => 'Accounts',
        'lhs_table' => 'accounts',
        'lhs_key' => 'id',
        'rhs_module' => 'Opportunities',
        'rhs_table' => 'opportunities',
        'rhs_key' => 'account_id',
        'relationship_type' => 'one-to-many',
    ],
//        'opportunities_assigned_user' => [
//            'lhs_module' => 'Users',
//            'lhs_table' => 'users',
//            'lhs_key' => 'id',
//            'rhs_module' => 'Opportunities',
//            'rhs_table' => 'opportunities',
//            'rhs_key' => 'assigned_user_id',
//            'relationship_type' => 'one-to-many'
//        ],
//        'opportunities_modified_user' => [
//            'lhs_module' => 'Users',
//            'lhs_table' => 'users',
//            'lhs_key' => 'id',
//            'rhs_module' => 'Opportunities',
//            'rhs_table' => 'opportunities',
//            'rhs_key' => 'modified_user_id',
//            'relationship_type' => 'one-to-many'
//        ],
//        'opportunities_created_by' => [
//            'lhs_module' => 'Users',
//            'lhs_table' => 'users',
//            'lhs_key' => 'id',
//            'rhs_module' => 'Opportunities',
//            'rhs_table' => 'opportunities',
//            'rhs_key' => 'created_by',
//            'relationship_type' => 'one-to-many'
//        ],
        'opportunities_campaign' => [
            'lhs_module' => 'Campaigns',
            'lhs_table' => 'campaigns',
            'lhs_key' => 'id',
            'rhs_module' => 'Opportunities',
            'rhs_table' => 'opportunities',
            'rhs_key' => 'campaign_id',
            'relationship_type' => 'one-to-many'
        ]
    ]
//This enables optimistic locking for Saves From EditView
, 'optimistic_locking' => true,
];

VardefManager::createVardef('Opportunities', 'Opportunity', ['default', 'assignable']);

if(file_exists('extensions/modules/SalesDocs')) {
    SpiceDictionaryHandler::getInstance()->dictionary['Opportunity']['fields']['salesdocs'] = [
        'name' => 'salesdocs',
        'type' => 'link',
        'relationship' => 'salesdocs_opportunities_parent',
        'module' => 'SalesDocs',
        'bean_name' => 'SalesDoc',
        'source' => 'non-db',
        'vname' => 'LBL_SALESDOCS',
    ];
}

// CR1000661
if(file_exists('extensions/modules/PartnerAgreements')) {
    SpiceDictionaryHandler::getInstance()->dictionary['Opportunity']['fields']['partneragreements'] = [
        'name' => 'partneragreements',
        'vname' => 'LBL_PARTNERAGREEMENTS',
        'type' => 'link',
        'relationship' => 'partneragreements_opportunities',
        'module' => 'PartnerAgreements',
        'bean_name' => 'PartnerAgreement',
        'source' => 'non-db',
    ];
}
