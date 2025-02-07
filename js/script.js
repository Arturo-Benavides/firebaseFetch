// Function to open the popup when an image is clicked
function openPopup(imageSrc) {
    document.getElementById("popupImage").src = imageSrc;
    document.getElementById("imagePopup").style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling

}

// Function to close the popup
function closePopup() {
    document.getElementById("imagePopup").style.display = "none";
    document.body.style.overflow = "auto"; // Allow scrolling again

}

// Modify displayImages() to add the click event to each image
function displayImages() {
    console.log("Fetching images...");
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ""; // Clear previous images

    db.collection("images").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.warn("No images found in Firestore.");
            } else {
                snapshot.forEach(doc => {
                    const imageData = doc.data();
                    console.log("Image found:", imageData);

                    if (imageData.imageUrl) {
                        const img = document.createElement('img');
                        img.src = imageData.imageUrl;
                        img.alt = "Fetched from Firestore";
                        img.onclick = () => openPopup(imageData.imageUrl); // Open popup on click
                        gallery.appendChild(img);
                    } else {
                        console.warn("Document missing imageUrl field:", doc.id);
                    }
                });
            }
        })
        .catch(error => console.error("Error fetching images:", error));
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", displayImages);
