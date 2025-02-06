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
                    console.log("Image found:", imageData); // Log each image

                    if (imageData.imageUrl) {
                        const img = document.createElement('img');
                        img.src = imageData.imageUrl;
                        img.alt = "Fetched from Firestore";
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
