function removeTrunkBuild(items)
{
    if(!items) return items;
    if(Array.isArray(items)) return items.filter(function(item)
    {
        const value = (item && typeof item === 'object') ? item.value : item;
        return value != 'trunk';
    });
    if(typeof items === 'object')
    {
        const result = $.extend({}, items);
        delete result.trunk;
        return result;
    }
    return items;
}

function normalizeOpenedBuildValue(value)
{
    if(value === undefined || value === null || value === 0 || value === '0' || value === 'trunk') return '';
    if(Array.isArray(value)) return value.filter(function(item){ return item && item != 'trunk' && item != '0'; });
    return String(value).split(',').filter(function(item){ return item && item != 'trunk' && item != '0'; });
}

function loadProjectBuilds(projectID)
{
    let branch = $('[name="branch"]').val();
    if(typeof(branch) == 'undefined') branch = 0;

    const productID = $('[name="product"]').val();
    const link = $.createLink('build', 'ajaxGetProjectBuilds', 'projectID=' + projectID + '&productID=' + productID + '&varName=openedBuild&build=&branch=' + branch);
    $.getJSON(link, function(data)
    {
        let buildID      = normalizeOpenedBuildValue($('[name^="openedBuild"]').val());
        let $buildPicker = $('[name^="openedBuild"]').zui('picker');
        $buildPicker.render({items: removeTrunkBuild(data)});
        $buildPicker.$.setValue(buildID);
        loadBuildActions();
    });
}

function loadProductBuilds(productID, type = 'normal', buildBox = 'all')
{
    let branch = $('[name="branch"]').val();
    if(typeof(branch) == 'undefined') branch = 0;

    if(buildBox == 'all' || buildBox == 'openedBuild')
    {
        const link = $.createLink('build', 'ajaxGetProductBuilds', 'productID=' + productID + '&varName=openedBuild&build=&branch=' + (branch == 0 ? 'all' : branch) + '&type=' + type);
        $.getJSON(link, function(data)
        {
            let buildID      = normalizeOpenedBuildValue($('[name^="openedBuild"]').val());
            let $buildPicker = $('[name^="openedBuild"]').zui('picker');
            $buildPicker.render({items: removeTrunkBuild(data)});
            $buildPicker.$.setValue(buildID);
            loadBuildActions();
        });
    }
}

function loadExecutionBuilds(executionID, num)
{
    if(typeof(num) == 'undefined') num = '';

    let branch           = num != '' ? $('#branch' + num).val() : $('[name="branch"]').val();
    let productID        = num != '' ? $('#product' + num).val() : $('[name="product"]').val();
    const oldOpenedBuild = $('[name^="openedBuild"]' + num).val() ? $('[name^="openedBuild"]' + num).val().toString() : 0;

    if(typeof(branch) == 'undefined')    branch    = 'all';
    if(typeof(productID) == 'undefined') productID = 0;

    const link = $.createLink('build', 'ajaxGetExecutionBuilds', 'executionID=' + executionID + '&productID=' + productID + '&varName=openedBuild&build=' + oldOpenedBuild + "&branch=" + branch + "&needCreate=true");
    $.getJSON(link, function(data)
    {
        let $buildPicker = $('[name^="openedBuild"]').zui('picker');
        $buildPicker.render({items: removeTrunkBuild(data)});
        $buildPicker.$.setValue(normalizeOpenedBuildValue(oldOpenedBuild));
        loadBuildActions();
    });
}

$(function()
{
    const $openedBuild = $('[name^="openedBuild"]');
    if(!$openedBuild.length || typeof $openedBuild.zui !== 'function') return;
    const $buildPicker = $openedBuild.zui('picker');
    if(!$buildPicker) return;
    $buildPicker.render({items: removeTrunkBuild($buildPicker.options.items)});
    $buildPicker.$.setValue(normalizeOpenedBuildValue($openedBuild.val()));
});
