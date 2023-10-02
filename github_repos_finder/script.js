document.getElementById("searchButton").addEventListener("click", async function () {
    const topicsInput = document.getElementById("topics").value.trim();
    const repoCount = parseInt(document.getElementById("repoCount").value, 10);
    
    if (!topicsInput || isNaN(repoCount) || repoCount < 1) {
        alert("Please enter valid topics and a valid number of repositories.");
        return;
    }
    
    const topics = topicsInput.split(',').map(topic => topic.trim());
    const apiUrl = `https://api.github.com/search/repositories?q=${topics.join('+')}&per_page=${repoCount}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const repoList = document.getElementById("repoList");
        repoList.innerHTML = "";
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(repo => {
                const repoItem = document.createElement("div");
                repoItem.classList.add("repo-item");
                repoItem.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description}</p>
                `;
                repoList.appendChild(repoItem);
            });
        } else {
            repoList.textContent = "No repositories found for the given topics.";
        }
    } catch (error) {
        console.error(error);
        alert("Error fetching repositories. Please try again later.");
    }
});
