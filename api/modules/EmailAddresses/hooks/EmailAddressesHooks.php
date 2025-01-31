<?php


namespace SpiceCRM\modules\EmailAddresses\hooks;

use SpiceCRM\modules\EmailAddresses\EmailAddress;

class EmailAddressesHooks
{

    /**
     * write relationship audit entries
     * event: be
     * @throws \Exception
     */
    public function writeRelationshipAudit(&$bean, $related, $data)
    {
        if ($data['related_module'] != 'EmailAddresses') return;

        $dataBefore = $bean->email_addresses->relationship->fetchedRow ?? [];
        $dataAfter = $bean->email_addresses->relationship->updatedRow ?? ['opt_in_status' => $data['related_bean']->opt_in_status, 'id' => $bean->email_addresses->relationship->relid];

        EmailAddress::writeRelationshipAudit($dataBefore, $dataAfter);
    }
}