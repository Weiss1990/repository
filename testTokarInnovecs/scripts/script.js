var fancyList = function(root, data) {

    //data - array like [{id:'cat', text: 'cat'}, {id:'dog', text: 'dog'}, {id:'fish', text: 'fish'}]
    //root - html root where fancylist will be render
    var self = this;

    self.data = data;
    self.root = root;
    self.listItems; //there will be array of list items(html elements)
    self.selectAllImg; //there will be item of fancy list 'all'. We will manipulate with style of this item

    self.prepareData = function () {

        var htmlCollection = self.data.map(function (item) {

            return self.createListItem(item);
        })

        return htmlCollection;
    };

    self.createListItem = function (data) {

        var li = document.createElement('li');
        var img = document.createElement('img');
        var span = document.createElement('span');

        img.src = 'images/checkbox.png';
        img.dataset.id = data.id;
        img.onclick = self.selectItem;

        span.innerText = data.text;

        li.appendChild(img);
        li.appendChild(span);

        return li;
    }

    self.render = function () {

        var ul = document.createElement('ul');

        var selectAllItem = self.createListItem({
            id: 'all',
            text: 'all'
        });

        self.selectAllImg = selectAllItem.querySelector('img');

        ul.appendChild(selectAllItem);

        self.listItems = self.prepareData();
        self.listItems.forEach(function (item) {
            ul.appendChild(item);
        });

        root.appendChild(ul);
    };

    self.selectItem = function (e) {
        var img = e.currentTarget;
        var id = img.dataset.id;

        //get all disabled items
        var disabledItems = self.getAllDisabledItems();

        if (id != 'all') {

            //if we select item (not 'all'), add to 'all' class 'disabled'
            self.selectAllImg.classList.add('disabled');
            
            //if no disabled items before click on item, I add 'special' state to 'all' toggler
            //else I see 2 situation:
            //1. I click on active element, after this I make it disable and remove 'special' state from 'all' toggler
            //2. I click on non-active element, after this I change states in easy items and add 'special' state to 'all' toggler
            if (disabledItems.length == 0) {                

                self.selectAllImg.classList.add('toggle-all-special-mode');
            } else {

                self.toggleClass(img, 'disabled');

                disabledItems = self.getAllDisabledItems();

                if (disabledItems.length == self.listItems.length)
                    self.selectAllImg.classList.remove('toggle-all-special-mode');
                else
                    self.selectAllImg.classList.add('toggle-all-special-mode');

            }

            self.toggleListItemState(id);            

        } else {

            self.selectAllImg.classList.remove('disabled');
            self.selectAllImg.classList.remove('toggle-all-special-mode');

            if (disabledItems.length == 0) {

                self.selectAllImg.classList.add('disabled');
                self.toggleListItemState('disableAll');
            }
            else {
                self.selectAllImg.classList.remove('disabled');
                self.toggleListItemState('enableAll');
            }
        }
    };

    self.toggleListItemState = function (type) {
        //by default type will be data-id value of selected list; 
        //in another cases it will be special mode - 'enableAll' or 'disableAll'

        self.listItems.forEach(function (item) {

            var img = item.querySelector('img');

            switch (type) {
                case 'disableAll':

                    img.classList.add('disabled');
                    break;
                case 'enableAll':

                    img.classList.remove('disabled');
                    break;
                default:
                    //by default I disable all siblings of selected item
                    var disabledItems = self.getAllDisabledItems();

                    if (img.dataset.id != type)
                        img.classList.add('disabled');
                    
            }
        })
    }

    self.toggleClass = function (elem, className) {
        if (elem.classList.contains(className)){
            elem.classList.remove(className)
            elem.classList;
        }

        else
            elem.classList.add(className);
    }

    self.getAllDisabledItems = function () {

        var disabledItems = self.listItems.filter(function (item) {

            var img = item.querySelector('img');
            return img.classList.contains('disabled');
        });

        return disabledItems;
    }
}


