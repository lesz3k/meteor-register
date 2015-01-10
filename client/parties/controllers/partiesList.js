angular.module("socially").controller("PartiesListCtrl", ['$scope', '$collection', '$methods',
    function($scope, $collection, $methods) {

        $collection(Parties).bind($scope, 'parties', true, true);

        $scope.remove = function(party) {
            $scope.parties.splice($scope.parties.indexOf(party), 1);
        };
        $collection(Meteor.users).bind($scope, 'users', false, true);

        $scope.orderProperty = 'name';


        $scope.getUserById = function(userId) {
            return Meteor.users.findOne(userId);
        };

        $scope.creator = function(party) {
            if (!party)
                return;
            var owner = $scope.getUserById(party.owner);
            if (!owner)
                return "nobody";

            if ($scope.user)
                if ($scope.user._id)
                    if (owner._id === $scope.user._id)
                        return "me";

            return owner;
        };

        $scope.rsvp = function(partyId, rsvp) {
            $methods.call('rsvp', partyId, rsvp).then(
                function(data) {
                    console.log('success responding', data);
                },
                function(err) {
                    console.log('failed', err);
                }
            );
        };
    }
]);