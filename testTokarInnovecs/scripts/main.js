var root = document.getElementById('fancy');
var data = [{
    id: 'cat',
    text: 'cat'
},
    {
        id: 'dog',
        text: 'dog'
    },
    {
        id: 'fish',
        text: 'fish'
    }];

var fancyList = new fancyList(root, data);

window.onload = createFancy;

function createFancy() {
    
    fancyList.render();
}


