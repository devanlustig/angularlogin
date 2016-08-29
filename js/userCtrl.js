
  // This syntax get the module

MyApp.controller("sampleCtrl",function($scope,$http){

	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
	// variabel awal
	$scope.aksiUsers = "tambahUsers";
	$scope.usersText = {};
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.kurang = 5;

	// mendapatkan semua data dari database agar bisa dirender dalam tabel
	

	$scope.dapatkanDataUsers = function(){
		$http.get(
			'data/users/dapatkan-data.php'
		).success(function(dataUsers){
			$scope.dataUsers = dataUsers;
		});
	};

	//reset form
	

    $scope.resetUsers = function() {
      $scope.usersText = {};
      //$scope.form.$setPristine();
    }

	// aksi menambah data ke database
	

	$scope.tambahDataUsers = function(){
		$http.post(
			'data/users/simpan-data.php',
			{
				data: $scope.usersText
			}
		).success(function(data){

			
			alert(data);
			$scope.dapatkanDataUsers();
			$scope.aksiUsers = "tambahUsers";
			$scope.resetUsers();
			
		}).error(function(){
			alert("Gagal menyimpan data");
		});
		
	};

	
	// aksi mengubah data pada database
	

	$scope.ubahDataUsers = function(){
		$http.post(
			'data/users/ubah-data.php',
			{
				id_user: $scope.idUsersYgAkanDiUbah,
				data: $scope.usersText
			}
		).success(function(data){
			alert(data);
			$scope.dapatkanDataUsers();
			$scope.aksiUsers = "tambahUsers";
			$scope.resetUsers();
		}).error(function(){
			alert("Gagal mengubah data");
		});
	};

	// aksi menset value dari $scope.pelangganText agar bisa diedit
	

	$scope.ubahUsers = function(itemusers,usersText){
		$scope.idUsersYgAkanDiUbah = itemusers.id_user;
		$scope.usersText = itemusers;
		$scope.aksiUsers = "ubahUsers";
	};
	// aksi menyimpan data pada database
	// bisa aksi tambah atau ubah tergantung dari value $scope.aksi
	

	$scope.simpanDataUsers = function(){
		switch($scope.aksiUsers){
			case "tambahUsers":
				$scope.tambahDataUsers();
				$scope.aksiUsers = "tambahUsers";
			break;

			case "ubahUsers":
				$scope.ubahDataUsers();
				
			break;
		}
	};
	
	// aksi menghapus data berdasarkan id
	

	$scope.hapusDataUsers = function(id_user){
		$http.post(
			'data/users/hapus-data.php',
			{
				id_user:id_user
			}
		).success(function(){
			$scope.dapatkanDataUsers();
		}).error(function(){
			alert("Gagal menghapus data");
		});
	};
	
});
