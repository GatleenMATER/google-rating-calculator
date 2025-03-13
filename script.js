document.getElementById("ratingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    let currentRating = parseFloat(document.getElementById("currentRating").value);
    let currentReviews = parseInt(document.getElementById("currentReviews").value);
    let targetRating = parseFloat(document.getElementById("targetRating").value);
    let reviewType = parseInt(document.getElementById("reviewType").value);

    // Calculate the number of reviews needed
    let requiredReviews = calculateReviewsToTarget(currentRating, currentReviews, targetRating, reviewType);

    // Display the result
    document.getElementById("requiredReviews").innerText = `You need ${requiredReviews} ${reviewType}-star reviews to achieve a rating of ${targetRating}.`;
    document.getElementById("result").style.display = "block";
});

// Function to calculate the required number of reviews
function calculateReviewsToTarget(currentRating, currentReviews, targetRating, reviewValue) {
    let totalRating = currentRating * currentReviews;
    let reviewsNeeded = 0;

    // Calculate how many reviews are needed
    while (true) {
        let totalReviews = currentReviews + reviewsNeeded;
        let newRating = (totalRating + (reviewValue * reviewsNeeded)) / totalReviews;
        
        if (newRating >= targetRating) {
            return reviewsNeeded;
        }

        reviewsNeeded++;
    }
}
