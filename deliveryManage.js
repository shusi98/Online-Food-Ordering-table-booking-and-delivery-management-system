const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('blue');
	} else {
		document.body.classList.remove('blue');
	}
})
///////////////////////////////////firebase

function selectAllData()
{
	  
    auth.onAuthStateChanged((user)=>{

        if(user){
    db.collection("deliveries").get().then((AllRecords)=>{
        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
			<tr>
						<td class="Name">${currentRecord.data().Name}</td>
						<td class="Surname">${currentRecord.data().Surname}</td>
                        <td >${currentRecord.data().AllItems}</td>
                        <td><span>R</span> ${currentRecord.data().AllTotalPrice} <td>
                       <td>${currentRecord.data().AllOderDate}</td>
					   <td>${currentRecord.data(). Address}</td>
                          <td>${currentRecord.data().Status}</td>
                                    
									<td class="show">
										<span class="updateIm"> <img src="./img/edit.png" alt="" data-toggle="modal" data-target="#exampleModal" onclick="viewEachProduct('${currentRecord.id}')"></span>
										<span class="deleteIm"> <img src="./img/delete.png" alt="" onclick="removeItem('${currentRecord.id}')"></span>
									</td>
    
                                </tr>
       
            `
            html += div
            list.innerHTML =html
        })

    })
	}
})

}
var viewedItem =""
function viewEachProduct(id){

db.collection("deliveries").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("statOptions").innerHTML = ` <option>${info.data().Status}</option>
    <option value="Awaist delivery">Awaist delivery</option>
	<option value="On it's way">On it's way</option>
    <option value="Delivered">Delivered</option>
	`
	viewedItem= id
	
})

}
function updateProduct(){
	//take entered values and update
	var newStatus = document.getElementById("statOptions").value;
	
	
		console.log("clicked")
		db.collection("deliveries").doc(viewedItem).update({
			Status:newStatus

		}, merge=true).then(()=>{
			swal("Success!", "Order status updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})

}
function removeItem(id)
{
	
  
		swal({
			title: "Are you sure?",
			text: "Once deleted,Customer wont be able to order It",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {

			if (willDelete) {
				willDelete=db.collection("deliveries").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Your Item is safe!");
			}
		  });


}
///////////////////////////////////////////////////////////

function signOut()
{

    auth.signOut().then(()=>{
        location.href ="adminLogin.html";
    })
}
///////////////////////////////searching/////////////////////////////////
function myFunction() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("show");
	tr = table.getElementsByTagName("tr");
  
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[0];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = " ";
		} else {
		  tr[i].style.display = "none";
		}
	  }
	}
  }