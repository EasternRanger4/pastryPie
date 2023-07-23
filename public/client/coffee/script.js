const content = `<form id="coffeeOrderForm">
<label for="name">Name:</label>
<input type="text" id="name" name="name" required>

<label for="email">Email:</label>
<input type="email" id="email" name="email" required>

<label for="milk">Select Milk:</label>
<select id="milk" name="milk">
    <option value="regular">Regular Milk</option>
    <option value="almond">Almond Milk</option>
    <option value="oat">Oat Milk</option>
    <option value="soy">Soy Milk</option>
</select>

<label for="sugar">Sugar (in teaspoons):</label>
<input type="number" id="sugar" name="sugar" min="0" max="5" step="0.5">

<label for="orderNotes">Order Notes:</label>
<textarea id="orderNotes" name="orderNotes" rows="4"></textarea>

<button type="button" onclick="submitOrder()">Submit Order</button>
</form>

</div>
</div>
`

const button = `<button onclick="admin()">Admin</button> <button onclick="trackOrderId()">Track Order</button>`

function validateAndSubmit() {
    const form = document.getElementById("orderForm");
    const isValid = form.checkValidity();

    if (isValid) {
        submitOrder();
    } else {
        // Show error message or perform any other actions to indicate that the form is incomplete.
        // For example, you can display an error message at the top of the form:
        const errorMessage = document.getElementById("error");
        errorMessage.textContent = "Please fill out all required fields.";
    }
}

function trackOrderId() {
    const orderId = prompt("Order ID");
    trackOrder(orderId);
}
function reLoad() {
    window.track = false;
    document.getElementById("content").innerHTML= content;
    document.getElementById("button").innerHTML= button;
}
async function submitOrder() {
    //document.getElementById("content").innerHTML= content;
    //document.getElementById("button").innerHTML= button;
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const milk = document.getElementById("milk").value;
    const sugar = document.getElementById("sugar").value;
    const orderNotes = document.getElementById("orderNotes").value;
    const data = {name, email, milk, sugar, orderNotes};
    document.getElementById("content").innerHTML= `<div class="loader"></div>`;
    console.log(data)

    console.log("res")
    const response = await fetch('/coffee/newOrder', { // Endpoint for creating new orders
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    const nData = await response.json()
    console.log(nData)
    if (nData.message == true) {
        const orderId = nData.content;
        // Order successfully submitted
        alert(`Order submitted successfully! Your order ID is ${orderId}`);
        trackOrder(orderId);
    } else {
        // Error occurred
        alert('Error submitting order. Please try again.');
    }
}  

async function trackOrder(orderId){
    console.log(orderId)
    const response = await fetch('/coffee/orderUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId })
    });
    const data = await response.json();
    console.log(data)

    const date = new Date(data.timestamp);
    const currentTime = date.toLocaleString('en-US', { timeZone: 'UTC' });
    console.log(currentTime);

    const txt0 = `<button onclick="reLoad()">Back</button> 
    <button onclick="trackOrder('${orderId}')">Refresh</button>${button}`;
    const txt1 = `
    <h1> Order ID: ${orderId} </h1>
    <h3> Status: ${data.content} </h3>
    Last Updated ${currentTime}`;
    document.getElementById("content").innerHTML= txt1;
    document.getElementById("button").innerHTML= txt0;
}

async function admin() {
    window.track = false;
    const pin = prompt("Admin Pin")
    const response = await fetch('/pinCodes/CM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pin})
    });
    const data = await response.json()
    if (data.message == true) {
        orders()
    } else {
        alert("Incorrect pin")
    }
}

async function orders() {
    const txt3 = `
        <button onclick="reLoad()">Back</button>
        <button onclick="admin()>Refresh</button>"`
        document.getElementById("content").innerHTML= "";
        document.getElementById("button").innerHTML= txt3;
        const reseponse = await fetch('/coffee/getOrders')
        const daata = await reseponse.json()
        console.log(daata)

        const TBLdflt = `<br>
        <table><therd><tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Milk</th>
        <th>Sugar</th>
        <th>Notes</th>
        <th>Update</th>
        <th>Delete</th>
        </tr></thread><tbody id="tableData"> </tbody>
        </table>`
        document.getElementById("content").innerHTML= TBLdflt;
        var toSet = ""
        for (i in daata) {
            var update = "";
            if (daata[i].status == "Received") {
                const nOrderID = daata[i].id;
                const nStatus = "Making"
                update = `<button onclick="updateOrd('${nOrderID}', '${nStatus}')">Making Order</button>`;
            } else if (daata[i].status == "Making") {
                const nOrderID = daata[i].id;
                const nStatus = "Made"
                update = `<button onclick="updateOrd('${nOrderID}', '${nStatus}')">Made Order</button>`;
            } else {
                update = `<button onclick="delOrder('${daata[i].id}')">Delete</button>`;
            }
            toSet += `<tr>
            <td>${daata[i].id}</td>
            <td>${daata[i].name}</td>
            <td>${daata[i].email}</td>
            <td>${daata[i].milk}</td>
            <td>${daata[i].sugar}</td>
            <td>${daata[i].orderNotes}</td>
            <td>
                ${update}
            </td>
            <td>
                <button onclick="delOrder('${daata[i].id}')">Delete</button>
            </tr>`
        }
        document.getElementById("tableData").innerHTML= toSet;
}

async function updateOrd(orderId, newStatus) {
    const response = await fetch('/coffee/editOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId, newStatus})
    });
    const data = await response.json();
    console.log(data)
    orders()

}

async function delOrder(orderId) {
    const response = await fetch('/coffee/delOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId})
    });
    const data = await response.json();
    console.log(data)
    orders()
}