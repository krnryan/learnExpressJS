/*global $*/

$(function () {
    "use strict";
    
    function appendToList(blocks) {
        var i, content, block,
            list = [];
        
        for (i in blocks) {
            block = blocks[i];
            content = '<a href="/blocks/' + block + '">' + block + '</a> ' + '<a href="#" data-block="' + block + '"><img src="delete.png"></a>';
            list.push($('<li>', { html: content }));
        }
        
        $('.block-list').append(list);
    }
    
    $.get('/blocks', appendToList);
    
    $('form').on('submit', function (e) {
        e.preventDefault();
        
        var form = $(this),
            blockData = form.serialize(); // Transforms from data to URL-encoded notation
        
        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData
        }).done(function (blockName) {
            appendToList([blockName]); // Array with the new block as its single argument
            form.trigger('reset'); // Cleans up form text input fields
        });
    });

    $('.block-list').on('click', 'a[data-block]', function (e) {
        "use strict";
        
        if (!confirm('Are you suer?')) {
            return false;
        }
        
        var target = $(e.currentTarget);
        
        $.ajax({
            type: 'DELETE',
            url: '/blocks/' + target.data('block')
        }).done(function () {
            target.parents('li').remove(); 
        });
    });
});