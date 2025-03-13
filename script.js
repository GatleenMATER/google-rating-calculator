document.getElementById("ratingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    let currentRating = parseFloat(document.getElementById("currentRating").value);
    let currentReviews = parseInt(document.getElementById("currentReviews").value);
    let targetRating = parseFloat(document.getElementById("targetRating").value);
    let reviewType = parseInt(document.getElementById("reviewType").value);
    let actionType = document.getElementById("actionType").value;

    // Calculate the number of reviews needed
    let requiredReviews;

    if (actionType === 'increase') {
        requiredReviews = calculateReviewsToTarget(currentRating, currentReviews, targetRating, reviewType);
        document.getElementById("requiredReviews").innerText = `You need ${requiredReviews} ${reviewType}-star reviews to increase your rating to ${targetRating}.`;
    } else if (actionType === 'avoidDrop') {
        requiredReviews = calculateReviewsToAvoidDrop(currentRating, currentReviews, targetRating, reviewType);
        document.getElementById("requiredReviews").innerText = `You need ${requiredReviews} 5-star reviews to avoid dropping below ${targetRating}.`;
    }

    document.getElementById("result").style.display = "block";
});

// Function to calculate the required number of reviews to increase rating
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

// Function to calculate how many 5-star reviews are needed to avoid dropping below target
function calculateReviewsToAvoidDrop(currentRating, currentReviews, targetRating, reviewValue) {
    let totalRating = currentRating * currentReviews;
    let reviewsNeeded = 0;

    // Calculate how many reviews are needed to avoid dropping below target
    while (true) {
        let totalReviews = currentReviews + reviewsNeeded;
        let newRating = (totalRating + (reviewValue * reviewsNeeded)) / totalReviews;
        
        if (newRating < targetRating) {
            break;
        }

        reviewsNeeded++;
    }
    return reviewsNeeded;
}
