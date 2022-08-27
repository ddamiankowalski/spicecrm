<?php
/***** SPICE-HEADER-SPACEHOLDER *****/
use SpiceCRM\includes\SugarObjects\VardefManager;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;

SpiceDictionaryHandler::getInstance()->dictionary['AccountCCDetail'] = [
    'table' => 'accountccdetails',
    'audited' => false,
    'fields' => [
        'account_id' => [
            'name' => 'account_id',
            'vname' => 'LBL_ACCOUNT_ID',
            'type' => 'id',
            'reportable' => false,
            'duplicate_merge' => 'disabled',
        ],
        'account_name' => [
            'name' => 'account_name',
            'rname' => 'name',
            'id_name' => 'account_id',
            'vname' => 'LBL_ACCOUNT',
            'join_name' => 'accounts',
            'type' => 'relate',
            'link' => 'accounts',
            'table' => 'accounts',
            'isnull' => 'true',
            'module' => 'Accounts',
            'dbType' => 'varchar',
            'len' => '255',
            'source' => 'non-db',
        ],
        'accounts' => [
            'name' => 'accounts',
            'vname' => 'LBL_ACCOUNTS',
            'type' => 'link',
            'relationship' => 'accounts_accountccdetails',
            'link_type' => 'one',
            'source' => 'non-db',
            'duplicate_merge' => 'disabled',
        ],
        'account_classification' => [
            'name' => 'account_classification',
            'vname' => 'LBL_CLASSIFICATION',
            'type' => 'multienum',
            'options' => 'account_classification_dom',
        ],
        'companycode_id' => [
            'name' => 'companycode_id',
            'type' => 'id',
            'required' => false,
        ],
        'companycode_name' => [
            'name' => 'companycode_name',
            'rname' => 'name',
            'id_name' => 'companycode_id',
            'vname' => 'LBL_COMPANYCODE',
            'join_name' => 'companycodes',
            'type' => 'relate',
            'link' => 'companycodes',
            'table' => 'companycodes',
            'isnull' => 'true',
            'module' => 'CompanyCodes',
            'dbType' => 'varchar',
            'len' => '12',
            'source' => 'non-db',
        ],
        'companycodes' => [
            'name' => 'companycodes',
            'vname' => 'LBL_COMPANYCODES',
            'type' => 'link',
            'relationship' => 'companycodes_accountccdetails',
            'link_type' => 'one',
            'source' => 'non-db',
            'duplicate_merge' => 'disabled',
        ],
        'abccategory' => [
            'name' => 'abccategory',
            'type' => 'enum',
            'len' => 1,
            'options' => 'abccategory_dom',
            'vname' => 'LBL_CATEGORY',
        ],
        'paymentterms' => [
            'name' => 'paymentterms',
            'type' => 'varchar',
            'len' => 50,
            'vname' => 'LBL_PAYMENTTERMS',
        ],
        'incoterm1' => [
            'name' => 'incoterm1',
            'type' => 'varchar',
            'len' => 20,
            'vname' => 'LBL_INCOTERM1',
        ],
        'incoterm2' => [
            'name' => 'incoterm2',
            'type' => 'varchar',
            'len' => 20,
            'vname' => 'LBL_INCOTERM2',
        ],
        'organisational_type' => [
            'name' => 'organisational_type',
            'type' => 'varchar',
            'len' => 20,
            'vname' => 'LBL_TYPE',
        ],
    ],
    'indices' => [
        ['name' => 'idx_accountccdetails_id_del', 'type' => 'index', 'fields' => ['id', 'deleted'],],
        ['name' => 'idx_accountccdetails_companycode_id', 'type' => 'index', 'fields' => ['companycode_id'],],
    ],
    'relationships' => [
        'accounts_accountccdetails' => [
            'lhs_module' => 'Accounts',
            'lhs_table' => 'accounts',
            'lhs_key' => 'id',
            'rhs_module' => 'AccountCCDetails',
            'rhs_table' => 'accountccdetails',
            'rhs_key' => 'account_id',
            'relationship_type' => 'one-to-many',
        ],
        'companycodes_accountccdetails' => [
            'lhs_module' => 'CompanyCodes',
            'lhs_table' => 'companycodes',
            'lhs_key' => 'id',
            'rhs_module' => 'AccountCCDetails',
            'rhs_table' => 'accountccdetails',
            'rhs_key' => 'companycode_id',
            'relationship_type' => 'one-to-many',
        ],
    ],
];

VardefManager::createVardef('AccountCCDetails', 'AccountCCDetail', ['default', 'assignable']);
