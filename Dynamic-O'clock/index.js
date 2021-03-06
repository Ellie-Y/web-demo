var column = document.getElementsByClassName('column');
//面向对象编程
function Index(dom, use24Hours) {
    //get dom and convert to Array
    this.column = Array.from(dom);
    this.classList = ['visible', 'close', 'far', 'far', 'distance', 'distance'];
    this.use24Hours = use24Hours;
    this.start();
}

Index.prototype.start = function() {
    var self = this;
    setInterval(function() {
        var time = self.getOclock();
        self.column.forEach(function(ele, index) {
            var timeIndex = + time[index];
            var offset = timeIndex * 86;
            ele.style.transform = 'translateY( calc(50vh - '+ offset + 'px - 60px) )';
            Array.from(ele.children).forEach(function(ele2, index2) {
                var className = self.getClass(timeIndex, index2);
                ele2.setAttribute('class', className);
            });
        });
    }, 500);
};

Index.prototype.getClass = function(time, i) {
    var className = this.classList.find(function(ele, index) {
        return i - index === time || i + index === time;
    });
    return className || '';
}

//get the current time, and deal with the formate
Index.prototype.getOclock = function() {
    var date = new Date();
    //hours, min and seconds spell to string, obtain 12 when its 0
    return [this.use24Hours ? date.getHours() : date.getHours % 12 || 12, date.getMinutes(), date.getSeconds()].reduce(function(p, n) {
        return p + ('0' + n).slice(-2);
    }, '')
};

new Index(column, true);
