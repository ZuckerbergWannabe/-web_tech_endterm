const trackForm = document.getElementById("track-search-form");
const trackInput = document.getElementById("track-search-input");
const trackButton = document.getElementById("track-search-button");
const trackStatus = document.getElementById("track-search-status");
const trackResults = document.getElementById("track-search-results");
const trackErrorMessage = "Could not load tracks. Please try again.";

trackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = trackInput.value.trim().replace(/["\\]/g, "");
    trackResults.textContent = "";

    if (title === "") {
        trackStatus.textContent = "Enter a song title.";
        return;
    }

    trackButton.disabled = true;
    trackStatus.textContent = "Searching…";

    const query = 'artist:"Bad Bunny" AND recording:"' + title + '"';
    const url = "https://musicbrainz.org/ws/2/recording?fmt=json&limit=10&query=" +
        encodeURIComponent(query);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            trackStatus.textContent = trackErrorMessage;
            return;
        }

        const data = await response.json();

        if (data.recordings.length === 0) {
            trackStatus.textContent = "No tracks found. Try another title.";
            return;
        }

        for (const track of data.recordings) {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = track.title;
            link.href = "https://musicbrainz.org/recording/" + encodeURIComponent(track.id);
            item.appendChild(link);

            const releaseDate = track["first-release-date"];
            if (releaseDate) {
                item.append(" (" + releaseDate.slice(0, 4) + ")");
            }

            trackResults.appendChild(item);
        }

        trackStatus.textContent = "Results from MusicBrainz";
    } catch (error) {
        trackStatus.textContent = trackErrorMessage;
    } finally {
        trackButton.disabled = false;
    }
});
