const createSlug = (title) => {
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return slug;
}

module.exports = {
    createSlug
}