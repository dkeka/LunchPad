Template.addLunchSpotButtons.events({
    'click button.btn-primary': function (event) {
        Restaurants.insert({
            name: $('#restaurantName').val()
        });
        $('#addRestaurantForm').modal('hide');
        $('#restaurantName').val('');
    }
});
