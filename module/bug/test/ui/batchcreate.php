#!/usr/bin/env php
<?php
chdir(__DIR__);
include '../lib/ui/createbug.ui.class.php';

/**

title=批量创建bug测试
timeout=0
cid=1

- 批量创建bug
 - 测试结果 @批量创建bug成功
 - 最终测试状态 @SUCCESS

*/
$tester = new createBugTester();
zenData('product')->loadYaml('product')->gen(1);
$build = zenData('build');
$build->id->range('1');
$build->product->range('1');
$build->project->range('0');
$build->execution->range('0');
$build->branch->range('0');
$build->name->range('版本1');
$build->deleted->range('0');
$build->gen(1);
$story = zenData('story');
$story->id->setFields(array(array('range' => '2')));
$story->version->setFields(array(array('range' => '1')));
$story->gen(1);

$bugs = array();
$bugs[0] = array('title' => 'bug' . time(), 'openedBuild' => array('multiPicker' => '版本1'), 'deadline' => '2025-06-06', 'steps' => 'step1');
$bugs[1] = array('title' => 'bug' . time(), 'openedBuild' => array('multiPicker' => '版本1'), 'deadline' => '2025-06-06', 'steps' => 'step2');
$bugs[2] = array('title' => 'bug' . time(), 'openedBuild' => array('multiPicker' => '版本1'), 'deadline' => '2025-06-06', 'steps' => 'step3');

$product = array();
$product['productID']   = 1;
$product['branch']      = 'all';
$product['executionID'] = 0;
$product['moduleID']    = 0;

r($tester->batchCreate($product, $bugs)) && p('message,status') && e('批量创建bug成功,SUCCESS'); //批量创建bug
$tester->closeBrowser();
