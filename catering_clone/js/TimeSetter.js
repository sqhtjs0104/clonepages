function timeSetter() {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    document.querySelector("input[type='datetime-local']").value = date.toISOString().substring(0, 16);
}

export default timeSetter;