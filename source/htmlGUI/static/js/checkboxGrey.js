function toggleDisabled(_checked) {
//    document.getElementById('xCoord').disabled = _checked ? false : true;
//    document.getElementById('yCoord').disabled = _checked ? false : true;
//    document.getElementById('zCoord').disabled = _checked ? false : true;
//    document.getElementById('xCoord').style.display = _checked ? 'block' : 'none';
//    document.getElementById('yCoord').style.display = _checked ? 'block' : 'none';
//    document.getElementById('zCoord').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsX').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsY').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsZ').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsXLab').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsYLab').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsZLab').style.display = _checked ? 'block' : 'none';
}

function toggleDisabled_T(_checked) {
//    document.getElementById('xCoord').disabled = _checked ? false : true;
//    document.getElementById('yCoord').disabled = _checked ? false : true;
//    document.getElementById('zCoord').disabled = _checked ? false : true;
//    document.getElementById('xCoord').style.display = _checked ? 'block' : 'none';
//    document.getElementById('yCoord').style.display = _checked ? 'block' : 'none';
//    document.getElementById('zCoord').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsX_T').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsY_T').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsZ_T').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsXLab_T').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsYLab_T').style.display = _checked ? 'block' : 'none';
    document.getElementById('coordsZLab_T').style.display = _checked ? 'block' : 'none';
}

function toggleDisabled_LR1(_checked) {
    document.getElementById('LRdata1').style.display = _checked ? 'block' : 'none';
}
function toggleDisabled_LR2(_checked) {
    document.getElementById('LRdata2').style.display = _checked ? 'block' : 'none';
}
function toggleDisabled_LR3(_checked) {
    document.getElementById('LRdata3').style.display = _checked ? 'block' : 'none';
}

function toggleDisabled_3D(_checked) {
    document.getElementById('plasma3Dmask').style.display = _checked ? 'block' : 'none';
}
