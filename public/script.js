document.getElementById('rate-calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Extracting form values
    const destination = document.getElementById('destination').value;
    const originZip = document.getElementById('origin_zip').value;
    const weight = document.getElementById('weight').value || null;
    const length = document.getElementById('length').value || null;
    const width = document.getElementById('width').value || null;
    const height = document.getElementById('height').value || null;
    const predefinedPackage = document.getElementById('predefined_package').value;

    // Constructing the request body
    const requestBody = {
        destination,
        origin_zip: originZip,
        weight,
        length,
        width,
        height,
        predefined_package: predefinedPackage === 'null' ? null : predefinedPackage,
    };

    // Sending POST request to Vesyl Rate Calculator API
    fetch('http://localhost:3000/proxy/rate_calculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then((response) => response.json())
        .then((rates) => displayResults(rates))
        .catch((error) => console.error('Error:', error));
});

function displayResults(rates) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.classList.add('show');

    rates.forEach((rate) => {
        const rateDiv = document.createElement('div');

        const carrier = document.createElement('h4');
        carrier.innerText = `Carrier: ${rate.carrier}`;

        const service = document.createElement('p');
        service.innerText = `Service: ${rate.service}`;

        const vesylRate = document.createElement('p');
        vesylRate.innerText = `VESYL $BEST: ${rate.rate}`;

        const commercialRate = document.createElement('p');
        commercialRate.innerText = `THE OTHER GUYS $OKAY: ${rate.commercial_rate}`;

        const retailRate = document.createElement('p');
        retailRate.innerText = `RETAIL $WORST: ${rate.retail_rate}`;

        rateDiv.appendChild(carrier);
        rateDiv.appendChild(service);
        rateDiv.appendChild(vesylRate);
        rateDiv.appendChild(commercialRate);
        rateDiv.appendChild(retailRate);

        resultsDiv.appendChild(rateDiv);
    });
}
