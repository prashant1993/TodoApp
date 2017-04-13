myApp.controller('homeController', function($scope,$uibModal, $state, taskService,$timeout){
    $scope.todoDisplay= false;
    $scope.result = []; // Http call Then server kal ka data
     $scope.isList = false;
     $scope.load_modal_sms = function (data) {
         console.log(data);
            var modal = $uibModal.open({
              templateUrl: "template/popup.html",
              ariaLabelledBy: 'modal-title-bottom',
              ariaDescribedBy: 'modal-body-bottom',
              size: 'sm',

              controller:function($uibModalInstance){
                  this.title=data.title;
                  var $ctrl = this;
                  this.description = data.description;

                     this.cancel = function () {
                    console.log('called');
                      $uibModalInstanceProvider.dismiss('cancel');
                    };
                  this.ok = function () {
                        $uibModalInstance.close({title:$ctrl.title,description:$ctrl.description});
                  };

                  this.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                };

              },
              controllerAs:"$ctrl"
//              scope: data
            });
            modal.result.catch(function(error){
                console.log("error::",error);
            }).then(function(data)
                    {
                console.log("data::",data);
              });

        };
      });
