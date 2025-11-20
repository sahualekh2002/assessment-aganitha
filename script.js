// Create a new short link
async function createLink() {
    const longUrl = document.getElementById('longUrl').value;
    const customCode = document.getElementById('customCode').value;

    const response = await fetch('http://localhost:3000/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, customCode })
    });

    const data = await response.json();

    if (data.success) {
        document.getElementById('message').innerText = `Link created: ${data.link.code}`;
        document.getElementById('longUrl').value = '';
        document.getElementById('customCode').value = '';
        loadLinks();
    } else {
        document.getElementById('message').innerText = 'Error creating link';
    }
}

// Load all links
async function loadLinks() {
    const response = await fetch('http://localhost:3000/api/links');
    const links = await response.json();

    const tbody = document.getElementById('linksTable');
    tbody.innerHTML = '';

    links.forEach(link => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${link.code}</td>
            <td>${link.longUrl}</td>
            <td>${link.clicks}</td>
            <td>${link.lastClicked || '-'}</td>
            <td><a href="http://localhost:3000/${link.code}" target="_blank">Visit</a></td>
        `;
        tbody.appendChild(tr);
    });
}

// Load links on page load
window.onload = loadLinks;
