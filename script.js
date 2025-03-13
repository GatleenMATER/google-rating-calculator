function validateForm() {
    let currentRating = parseFloat(document.getElementById("currentRating").value);
    let targetRating = parseFloat(document.getElementById("targetRating").value);
    let actionType = document.getElementById("actionType").value;

    // Allow current rating to be higher than target rating if the action is "Avoid Dropping Rating"
    if (actionType === "avoidDrop" && currentRating <= targetRating) {
        alert("You are already above the desired rating.");
        return false;
    }

    // Only check for current rating if the action type is not 'Avoid Dropping Rating'
    if (actionType !== "avoidDrop" && currentRating > 5) {
        alert("The current rating cannot be higher than 5.");
        return false;
    }

    // Check if the target rating exceeds 5
    if (targetRating > 5) {
        alert("The desired rating cannot be higher than 5.");
        return false;
    }

    // Check if the current rating is greater than the target rating (only when 'Increase Rating' is selected)
    if (actionType === "increase" && currentRating > targetRating) {
        alert("The current rating cannot be higher than the desired rating.");
        return false;
    }

    return true;
}

// Function to calculate how many reviews are needed for increasing the rating
function calculateReviewsToTarget(currentRating, currentReviews, targetRating, reviewValue) {
    let totalRating = currentRating * currentReviews;
    let reviewsNeeded = 0;

    while (true) {
        let totalReviews = currentReviews + reviewsNeeded;
        let newRating = (totalRating + (reviewValue * reviewsNeeded)) / totalReviews;

        if (newRating >= targetRating) {
            return reviewsNeeded;
        }

        reviewsNeeded++;
    }
}

// Function to calculate how many 1-star reviews are needed to drop below a target
function calculateReviewsToDropRating(currentRating, currentReviews, targetRating) {
    let totalRating = currentRating * currentReviews;
    let reviewsNeeded = 0;

    while (true) {
        let totalReviews = currentReviews + reviewsNeeded;
        let newRating = (totalRating + (1 * reviewsNeeded)) / totalReviews; // 1-star reviews

        if (newRating < targetRating) {
            return reviewsNeeded;
        }

        reviewsNeeded++;
    }
}

document.getElementById("ratingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    let currentRating = parseFloat(document.getElementById("currentRating").value);
    let currentReviews = parseInt(document.getElementById("currentReviews").value);
    let targetRating = parseFloat(document.getElementById("targetRating").value);
    let reviewType = parseInt(document.getElementById("reviewType").value);
    let actionType = document.getElementById("actionType").value;

    let requiredReviews;

    if (actionType === 'increase') {
        requiredReviews = calculateReviewsToTarget(currentRating, currentReviews, targetRating, reviewType);
        document.getElementById("requiredReviews").innerText = `You need ${requiredReviews} ${reviewType}-star reviews to increase your rating to ${targetRating}.`;
    } else if (actionType === 'avoidDrop') {
        requiredReviews = calculateReviewsToDropRating(currentRating, currentReviews, targetRating);
        document.getElementById("requiredReviews").innerText = `You need ${requiredReviews} 1-star reviews to drop below ${targetRating}.`;
    }

    document.getElementById("result").style.display = "block";
});
