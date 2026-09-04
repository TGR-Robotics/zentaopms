function setOpenedBuilds(link, $currentRow)
{
    $.getJSON(link, function(builds)
    {
        if(!builds) return;

        if(Array.isArray(builds))
        {
            builds = builds.filter(function(item)
            {
                const value = (item && typeof item === 'object') ? item.value : item;
                return value != 'trunk';
            });
        }
        else if(typeof builds === 'object')
        {
            delete builds.trunk;
        }

        let $row = $currentRow;
        while($row.length)
        {
            const $build = $row.find('[data-name="openedBuild"] .picker').zui('picker');
            $build.render({items: builds});
            const currentValue = ($build.$.value || '').split(',').filter(function(value){ return value && value != 'trunk'; });
            $build.$.setValue(currentValue);

            $row = $row.next('tr');

            if(!$row.find('td[data-name="openedBuild"][data-ditto="on"]').length || !$row.find('td[data-name="branch"][data-ditto="on"]').length) break;
        }
    });
}

$(function()
{
    $('[data-name="openedBuild"] .picker').each(function()
    {
        const $build = $(this).zui('picker');
        if(!$build) return;
        const items = $build.options.items || [];
        const filtered = Array.isArray(items) ? items.filter(function(item)
        {
            const value = (item && typeof item === 'object') ? item.value : item;
            return value != 'trunk';
        }) : items;
        $build.render({items: filtered});
        const currentValue = ($build.$.value || '').split(',').filter(function(value){ return value && value != 'trunk'; });
        $build.$.setValue(currentValue);
    });
});
