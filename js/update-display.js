function updateDisplay() {
    // document.getElementById('wood-total').innerHTML = resource.wood.total;
    // document.getElementById('wood-max').innerHTML = resource.wood.max;
    // document.getElementById('wood-click-increment').innerHTML = resource.wood.clickIncrement;
    //
    // // document.getElementById('stone-total').innerHTML = resource.stone.total;
    // document.getElementById('stone-max').innerHTML = resource.stone.max;
    for (r in resource) {
        document.getElementById(r + "-total").innerHTML = eval(resource[r].total)
        document.getElementById(r + "-max").innerHTML = eval(resource[r].max)
        document.getElementById(r + "-click-increment").innerHTML = eval(resource[r].clickIncrement)
    }
}
