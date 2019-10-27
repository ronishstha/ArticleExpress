$(document).ready(() => {
    $('.delete-article').on('click', function(e) {
        const id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/article/' + id,
            success: response => {
                alert('Deleting Article');
                window.location.href = '/';
            },
            error: err => {
                console.log(err);
            }
        })
    })
});
