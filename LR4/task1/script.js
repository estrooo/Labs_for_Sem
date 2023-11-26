var tab;
var tabContent;

window.onload = function () {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = function (event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

var rtl = document.getElementById('rtl');
var rtr = document.getElementById('rtr');
var rbr = document.getElementById('rbr');
var rbl = document.getElementById('rbl');
var ttl = document.getElementById('ttl');
var ttr = document.getElementById('ttr');
var tbr = document.getElementById('tbr');
var tbl = document.getElementById('tbl');
var block = document.getElementById('block');
var cssCode = document.getElementById('cssCode');

function generate() {
    cssCode.value = "";

    var topLeft = rtl.value + "px";
    var topRight = rtr.value + "px";
    var bottomRight = rbr.value + "px";
    var bottomLeft = rbl.value + "px";
    ttl.value = rtl.value;
    ttr.value = rtr.value;
    tbr.value = rbr.value;
    tbl.value = rbl.value;
    block.style.borderRadius = topLeft + " " + topRight + " " + bottomRight + " " + bottomLeft;
    cssCode.value += `border-radius: ${topLeft} ${topRight} ${bottomRight} ${bottomLeft};\n`;
}
