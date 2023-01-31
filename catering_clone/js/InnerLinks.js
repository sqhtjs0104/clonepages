function Link(cur) {
    const target = cur.dataset.target; // .header
    document.querySelector(target).scrollIntoView();
}

export default Link;