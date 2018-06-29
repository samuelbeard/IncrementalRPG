/*
 * Displays Messages
 * str - string = The message.
 * location - string = Where the message will be displayed ("console", "upgrades", "info")
 */
function message(str, location) {
    if (location === 'console') {
        console.log(str);
        return;
    } else {
        let messageHTML = '<p>' + str + '</p>';
        let parent = document.getElementById('message-' + location);
        parent.innerHTML = messageHTML + parent.innerHTML;
    }
}
