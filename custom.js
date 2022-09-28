
        function pullFromServer() {
            var xhr = new XMLHttpRequest();
            

        
            xhr.open("GET", 'server/fetch.php?state=' + findGetParameter("state") + '&speciality=' + findGetParameter("speciality"), true);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    const myArr = JSON.parse(this.responseText);
                    var inner_html = "";
                    if (myArr['data'].length>0) {
                        
                        document.getElementById("doctor_num").innerHTML = myArr['total'];


                        for (var i=0; i< myArr['data'].length; i++) {
                            inner_html = inner_html + createHtml(myArr['data'][i]);
                        }
                        document.getElementById("outer-container").innerHTML = inner_html;

                    }
                       
                }
            }
            xhr.send();
            return false;
        }

    function createHtml(data) {
        //alert(data.full_name);
        
        var html = '<div class="main mt-5" >' +
            '<div class="doc_pic">' +
                '<img src="uploads/' +  data.photo  + '" height="150">'+
                '<p class="profile"><a href="doctor_detail.html">View Profile</a></p>' +
            '</div>' +
            '<div class="c1">' +
                '<p class="name">Dr. ' + data.full_name + '</p>' +
    '<p class="pro"> ' + data.proffession + '</p>' +
    '<p class="xp"> ' + data.experience + ' years overall experience</p>' +
    '<p class="add"><span class="bold"> ' + data.address + ',' + data.state + '</span> ' + '</p>' +
    '<p class="fee">₹' + data.fee + ' Consultation fee at clinic</p>' +
    '<div class="rating"><span class="taste_the_thunder"><i class="fas fa-solid fa-thumbs-up fa-lg"></i></span></div>' +
   
            '</div>' +
           '<div class="avail">' +
                '<p ><i class="fas fa-calendar"></i> Available Today</p>' +
                '<button type="button" class="btn btn-primary">Book Appointment</button>' +
                
            '</div>' +
        '</div>';
        return html;
    }
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }