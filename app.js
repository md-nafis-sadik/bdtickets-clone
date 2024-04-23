const info = [
    {
        "from": "Dhaka",
        "to": "Chittagong",
        "fare": 1100,
        "date":"11-06-24"
    },
    {
        "from": "Dhaka",
        "to": "Chittagong",
        "fare": 1100,
        "date":"30-04-24"
    },
    {
        "from": "Dhaka",
        "to": "Chittagong",
        "fare": 1100,
        "date":"01-05-24"
    },
    {
        "from": "Barisal",
        "to": "Chittagong",
        "fare": 900,
        "date":"11-05-24"
    },
    {
        "from": "Barisal",
        "to": "Chittagong",
        "fare": 1200,
        "date":"21-05-24"
    },
    {
        "from": "Barisal",
        "to": "Chittagong",
        "fare": 900,
        "date":"14-05-24"
    },
    {
        "from": "Barisal",
        "to": "Rajshahi",
        "fare": 1900,
        "date":"28-04-24"
    },
    {
        "from": "Barisal",
        "to": "Rajshahi",
        "fare": 1900,
        "date":"02-05-24"
    }
];



document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = formatDate(document.getElementById('date').value); // Format the date
    searchTickets(from, to, date);
});

function searchTickets(from, to, date) {
    const results = info.filter(ticket => 
        ticket.from.toLowerCase() === from.toLowerCase() && 
        ticket.to.toLowerCase() === to.toLowerCase() && 
        ticket.date === date
    );
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'p-4 mt-2 bg-gray-200 rounded-md';
            resultDiv.textContent = `From: ${result.from} - To: ${result.to} - Date: ${result.date} - Fare: ${result.fare} BDT`;
            resultContainer.appendChild(resultDiv);
        });
    } else {
        resultContainer.textContent = 'No bus are available.';
        resultContainer.className = 'p-4 mt-2 bg-red-100 rounded-md';
    }
}

function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year.slice(2)}`; // Format date to DD-MM-YY
}

function showSuggestions(input, field) {
    const suggestionsDiv = document.getElementById(field + '-suggestions');
    suggestionsDiv.innerHTML = '';
    let suggestions = info.reduce((acc, item) => {
        if (item[field].toLowerCase().startsWith(input.toLowerCase())) {
            if (!acc.includes(item[field])) {
                acc.push(item[field]);
            }
        }
        return acc;
    }, []).sort();

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            document.getElementById(field).value = suggestion;
            suggestionsDiv.innerHTML = '';
        });
        suggestionsDiv.appendChild(li);
    });
}

// Add event listener to the arrow icon for swapping
document.getElementById('swap-icon').addEventListener('click', function() {
    // Swap the values of the 'from' and 'to' input fields
    const fromValue = document.getElementById('from').value;
    const toValue = document.getElementById('to').value;
    document.getElementById('from').value = toValue;
    document.getElementById('to').value = fromValue;
});
