<?php
/***** SPICE-HEADER-SPACEHOLDER *****/

namespace SpiceCRM\modules\ScrumEpics;

use SpiceCRM\data\SugarBean;

class ScrumEpic extends SugarBean {
    public $module_dir = 'ScrumEpics';
    public $object_name = 'ScrumEpic';
    public $table_name = 'scrumepics';

    public function save($check_notify = false, $fts_index_bean = true)
    {
        $this->has_stories = false;

        return parent::save($check_notify, $fts_index_bean); // TODO: Change the autogenerated stub
    }

    public function retrieve($id = -1, $encode = false, $deleted = true, $relationships = true)
    {
        $bean = parent::retrieve($id, $encode, $deleted, $relationships); // TODO: Change the autogenerated stub

        // set has_stories to true if there are related epics
        if(isset($this->id)) {
            $epics = $bean->get_linked_beans('scrumuserstories', $this->object_name);
            if (count($epics) > 0) {
                $this->has_stories = true;
            }
        }
        return $bean;
    }
}
