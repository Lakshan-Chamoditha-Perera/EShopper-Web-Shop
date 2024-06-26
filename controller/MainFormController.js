function navigate(id) {
    $('#manage_order').css('display', id == 'manage_order' ? 'flex' : 'none');
    $('#manage_customer').css('display', id == 'manage_customer' ? 'flex' : 'none');
    $('#manage_item').css('display', id == 'manage_item' ? 'flex' : 'none');
    $('#menu-section').css('display', id == 'home' ? 'flex' : 'none');
}
document.getElementById('customer').addEventListener('click',
    (e) => {
    e.preventDefault()
    navigate('manage_customer');
});
document.getElementById('item').addEventListener('click',
    (e) => {
    e.preventDefault()
    navigate('manage_item');
});
document.getElementById('order').addEventListener('click',
    (e) => {
    e.preventDefault()
    navigate('manage_order');
});
