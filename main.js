/*
C - POST - hostname:port/api/v1/products (+data)
R - GET(ALL) - hostname:port/api/v1/products
  - GET(BYID) - hostname:port/api/v1/products/{id}
U - PUT - hostname:port/api/v1/products/{id} (+data)
D - DELETE - hostname:port/api/v1/products/{id}
*/
//axios
var url = "http://localhost:3000/comments"; // Điều chỉnh URL để trỏ đến "comments"
var globalList;

function Load() {
    fetch(url).then(
        function (response) {
            return response.json();
        }).then(function (comments) {
            comments.sort(Compare);
            globalList = comments;
            let tbody = document.getElementById('tbody');
            tbody.innerHTML = "";
            for (const comment of comments) {
                tbody.innerHTML += ConvertFromCommentToRow(comment);
            }
        })
}
function Compare(a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
    }
    else {
        return -1;
    }
}

function getMaxID() {
    let ids = globalList.map(element => parseInt(element.id));
    return Math.max(...ids);
}

function Delete(id) {
    fetch(url + "/" + id, {
        method: 'DELETE'
    }).then(function () {
        Load();
    })
}

function Create(data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function () {
        Load()
    })
}

function Edit(id, data) {
    fetch(url + "/" + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function () {
        Load()
    })
}

function Save() {
    let id = document.getElementById('id').value;
    let data = {
        postId: document.getElementById('postId').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        body: document.getElementById('commentBody').value,
    };

    if (id) {
        Edit(id, data);
    } else {
        data.id = (getMaxID() + 1).toString();
        Create(data);
    }
}

function ConvertFromCommentToRow(comment) {
    let string = '<tr>';
    string += "<td>" + comment.id + "</td>";
    string += "<td>" + comment.postId + "</td>";
    string += "<td>" + comment.name + "</td>";
    string += "<td>" + comment.email + "</td>";
    string += "<td>" + comment.body + "</td>";
    string += '<td><button onclick="Delete(' + comment.id + ')">Delete</button></td>';
    string += '</tr>'
    return string;
}
