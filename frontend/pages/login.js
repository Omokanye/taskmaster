// Initialize Google API Client for OAuth
function initGoogleAPI() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
        });
    });
}

function googleSignIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
        const profile = googleUser.getBasicProfile();
        const user = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            image: profile.getImageUrl()
        };
        // Handle user login here, e.g., redirect to dashboard or save user info
        window.location.href = 'dashboard.html';
    }).catch(error => {
        console.error('Error signing in with Google:', error);
    });
}

// Form Submission Handling
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Perform your authentication logic here
    if (email && password) {
        alert("Login successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
});

// Initialize Google API Client
initGoogleAPI();
