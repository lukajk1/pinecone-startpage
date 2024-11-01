function updateDateTime() {
    const now = new Date();
    let timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    const dateString = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Create a blinking effect for the colon by toggling it on/off every second
    const shouldShowColon = now.getSeconds() % 2 === 0;
    timeString = timeString.replace(':', shouldShowColon ? ':' : ' ');

    const dateTimeString = `${timeString} <br> ${dateString}`;

    document.getElementById('datetime').innerHTML = dateTimeString;
    document.title = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    // Schedule the next update for exactly one second later
    setTimeout(updateDateTime, 1000);
}

document.addEventListener('DOMContentLoaded', updateDateTime);
