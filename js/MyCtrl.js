MyApp.controller("MyCtrl",function($scope,$http){

	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
	// variabel awal
	$scope.aksi = "tambah";
	$scope.aksiUsers = "tambahUsers";
	$scope.pelangganText = {};
	$scope.usersText = {};
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.kurang = 5;

	// mendapatkan semua data dari database agar bisa dirender dalam tabel
	$scope.dapatkanData = function(){
		$http.get(
			'data/pelanggan/dapatkan-data.php'
		).success(function(data){
			$scope.dataPelanggan = data;
		});
	};

	$scope.dapatkanDataUsers = function(){
		$http.get(
			'data/users/dapatkan-data.php'
		).success(function(dataUsers){
			$scope.dataUsers = dataUsers;
		});
	};

	//reset form
	$scope.reset = function() {
      $scope.pelangganText = {};
      //$scope.form.$setPristine();
    }

    $scope.resetUsers = function() {
      $scope.usersText = {};
      //$scope.form.$setPristine();
    }

	// aksi menambah data ke database
	$scope.tambahData = function(){
		$http.post(
			'data/pelanggan/simpan-data.php',
			{
				data: $scope.pelangganText
			}
		).success(function(data){

			
			alert(data);
			$scope.dapatkanData();
			$scope.aksi = "tambah";
			$scope.reset();
			
		}).error(function(){
			alert("Gagal menyimpan data");
		});
		
	};

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
	$scope.ubahData = function(){
		$http.post(
			'data/pelanggan/ubah-data.php',
			{
				id: $scope.idYgAkanDiUbah,
				data: $scope.pelangganText
			}
		).success(function(data){
			alert(data);
			$scope.dapatkanData();
			$scope.aksi = "tambah";
			$scope.reset();
		}).error(function(){
			alert("Gagal mengubah data");
		});
	};

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
	$scope.ubah = function(item,pelangganText){
		$scope.idYgAkanDiUbah = item.id;
		$scope.pelangganText = item;
		$scope.aksi = "ubah";
	};

	$scope.ubahUsers = function(itemusers,usersText){
		$scope.idUsersYgAkanDiUbah = itemusers.id_user;
		$scope.usersText = itemusers;
		$scope.aksiUsers = "ubahUsers";
	};
	// aksi menyimpan data pada database
	// bisa aksi tambah atau ubah tergantung dari value $scope.aksi
	$scope.simpanData = function(){
		switch($scope.aksi){
			case "tambah":
				$scope.tambahData();
				$scope.aksi = "tambah";
			break;
			
			case "ubah":
				$scope.ubahData();
				
			break;

		}
	};

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
	$scope.hapusData = function(id){
		$http.post(
			'data/pelanggan/hapus-data.php',
			{
				id:id
			}
		).success(function(){
			var deleteUser = alert('Are you absolutely sure you want to delete?');
			 if (deleteUser) {
      			alert('Going to delete');
    				}else{
    					"";
    				}
			$scope.dapatkanData();
		}).error(function(){
			alert("Gagal menghapus data");
		});
	};

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
