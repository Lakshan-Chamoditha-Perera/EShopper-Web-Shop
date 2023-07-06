
/*
 * created by Shan Perera
 * 5/7/2023
 */

/*
 * created by Shan Perera
 * 5/7/2023
 */

function navigate(id) {
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
