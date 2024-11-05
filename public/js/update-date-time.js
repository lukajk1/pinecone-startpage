function updateDateTime() {
    const now = new Date();
    let timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    const dateString = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const shouldShowColon = now.getSeconds() % 2 === 0;
    timeString = timeString.replace(':', shouldShowColon ? ':' : ' ');

    const dateTimeString = `${timeString} <br> ${dateString}`;

    document.getElementById('datetime').innerHTML = dateTimeString;
    document.title = "it's " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    setTimeout(updateDateTime, 1000);
}

document.addEventListener('DOMContentLoaded', updateDateTime);
