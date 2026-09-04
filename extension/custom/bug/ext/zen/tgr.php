<?php
/**
 * TGR customizations for bug create/batch create.
 *
 * @access public
 * @param  object $bug
 * @param  array  $param
 * @param  string $from
 * @return void
 */
public function buildCreateForm(object $bug, array $param, string $from): void
{
    parent::buildCreateForm($bug, $param, $from);

    if(!empty($this->view->builds)) $this->view->builds = $this->tgrRemoveTrunkBuilds($this->view->builds);
    if(!empty($this->view->bug) && !empty($this->view->bug->builds)) $this->view->bug->builds = $this->tgrRemoveTrunkBuilds($this->view->bug->builds);
    if(!empty($this->view->bug) && ($this->view->bug->buildID === 'trunk' || $this->view->bug->buildID === 0 || $this->view->bug->buildID === '0')) $this->view->bug->buildID = '';
}

/**
 * Init bug template with TGR default steps.
 *
 * @param  array  $fields
 * @access protected
 * @return object
 */
protected function initBug(array $fields): object
{
    $bug = parent::initBug($fields);
    if(empty($this->lang->bug->tplDefault)) return $bug;

    $oldDefault = $this->lang->bug->tplStep . $this->lang->bug->tplResult . $this->lang->bug->tplExpect;
    if($bug->steps === $oldDefault) $bug->steps = $this->lang->bug->tplDefault;
    return $bug;
}

/**
 * Remove trunk from batch create build pairs.
 *
 * @param  int    $executionID
 * @param  object $product
 * @param  string $branch
 * @param  array  $output
 * @param  array  $bugImagesFile
 * @access protected
 * @return void
 */
protected function assignBatchCreateVars(int $executionID, object $product, string $branch, array $output, array $bugImagesFile): void
{
    parent::assignBatchCreateVars($executionID, $product, $branch, $output, $bugImagesFile);
    if(!empty($this->view->builds)) $this->view->builds = $this->tgrRemoveTrunkBuilds($this->view->builds);
}

/**
 * Remove the system trunk option from build pairs or picker items.
 *
 * @param  array $builds
 * @access protected
 * @return array
 */
protected function tgrRemoveTrunkBuilds(array $builds): array
{
    if(isset($builds['trunk'])) unset($builds['trunk']);

    $first = reset($builds);
    if(is_array($first) && isset($first['value']))
    {
        $filtered = array();
        foreach($builds as $item)
        {
            if(isset($item['value']) && $item['value'] == 'trunk') continue;
            $filtered[] = $item;
        }
        return $filtered;
    }

    return $builds;
}
