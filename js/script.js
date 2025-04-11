// Function to open the popup when an image or video is clicked
function openPopup(mediaSrc) {
    const popup = document.getElementById("imagePopup");
    const popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = ""; // Clear previous content

    if (mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".webm") || mediaSrc.endsWith(".ogg")) {
        const video = document.createElement("video");
        video.src = mediaSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.controls = true;

        popupContent.appendChild(video);
    } else {
        const img = document.createElement("img");
        img.src = mediaSrc;
        img.alt = "Expanded Image";
        popupContent.appendChild(img);
    }

    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Function to close the popup
function closePopup() {
    document.getElementById("imagePopup").style.display = "none";
    document.body.style.overflow = "auto";
}

// Function to fetch and display images/videos in order (newest first)
function displayImages() {
    console.log("Fetching images...");
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = "";

    db.collection("images").orderBy("timestamp", "desc").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.warn("No media found in Firestore.");
            } else {
                snapshot.forEach(doc => {
                    const imageData = doc.data();
                    const thumb = document.createElement('img');
                    const src = imageData.imageUrl;

                    if (src) {
                        thumb.src = src;
                        thumb.alt = "Fetched from Firestore";
                        thumb.onclick = () => openPopup(src);
                        gallery.appendChild(thumb);
                    } else {
                        console.warn("Missing imageUrl:", doc.id);
                    }
                });
            }
        })
        .catch(error => console.error("Error fetching media:", error));
}

document.addEventListener("DOMContentLoaded", displayImages);
