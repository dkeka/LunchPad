
Restaurants = new Meteor.Collection("restaurants");
Assignments = new Meteor.Collection("assignments");
Users = new Meteor.Collection("users");

(function() {
    var currentUser;

    if (Meteor.isClient) {
        Template.userInput.user = function() {
            return currentUser;
        }

        Template.userInput.events({
            'change input': function(event) {
                currentUser = event.target.value;
            }
        })

        Template.restaurants.restaurants = function() {
            return Restaurants.find({});
        }

        Template.restaurant.users = function() {
            var assignments = Assignments.find({
                restaurantId: this._id
            });

            return Users.find({
                _id: {$in: assignments.map(function(assignment) {
                    return assignment.userId;
                })}
            });
        }

        Template.addToRestaurantButton.events({
            'click input': function() {
                if (currentUser) {
                    var user = Users.findOne({email: currentUser});

                    if (!user) {
                        Users.insert({
                            email: currentUser,
                            gravatarUrl: 'http://www.gravatar.com/avatar/' + CryptoJS.md5(currentUser.toLowerCase()) + '?d=monsterid&s=40'
                        });
                        user = Users.findOne({email: currentUser});
                    }

                    Assignments.insert({
                        restaurantId: this._id,
                        userId: user._id
                    });
                }
            }
        })
    }

    if (Meteor.isServer) {
        Meteor.startup(function () {
            // code to run on server at startup
    });
    }
})();