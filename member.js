function skillsMembers() {
    return {
        restrict: 'E',
        templateUrl: 'partials/skills-members.html',
        scope: {
            member: '=',
            skills: '='
        },
        controller: function ($scope) {
            $scope.skills = $scope.skills || [];
            $scope.member = $scope.member || {};
            $scope.member.skills = $scope.member.skills || [];

            $scope.addSkill = function (skill) {
                $scope.member.skills.push(skill);
            };

            $scope.removeSkill = function (skill) {
                var index = $scope.member.skills.indexOf(skill);
                $scope.member.skills.splice(index, 1);
            };
        }
    };
}