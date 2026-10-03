// ========================================
// PRO ROZE SIGNUP JAVASCRIPT
// ========================================


// ========================================
// GET SIGNUP FORM
// ========================================

const signupForm =
    document.getElementById("signupForm");


// ========================================
// SIGNUP FORM SUBMIT
// ========================================

signupForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh
        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        const name =
            document.getElementById("signupName")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("signupPassword")
                .value
                .trim();

        const confirmPassword =
            document.getElementById("confirmPassword")
                .value
                .trim();

        const terms =
            document.getElementById("terms").checked;


        // ========================================
        // NAME VALIDATION
        // ========================================

        if (name === "") {

            alert("Please enter your full name.");

            return;
        }


        if (name.length < 3) {

            alert(
                "Name must contain at least 3 characters."
            );

            return;
        }


        // ========================================
        // EMAIL VALIDATION
        // ========================================

        if (email === "") {

            alert(
                "Please enter your email address."
            );

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        // ========================================
        // PASSWORD VALIDATION
        // ========================================

        if (password === "") {

            alert(
                "Please create a password."
            );

            return;
        }


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        // ========================================
        // CONFIRM PASSWORD
        // ========================================

        if (confirmPassword === "") {

            alert(
                "Please confirm your password."
            );

            return;
        }


        if (password !== confirmPassword) {

            alert(
                "Password and confirm password do not match."
            );

            return;
        }


        // ========================================
        // TERMS & CONDITIONS
        // ========================================

        if (!terms) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return;
        }


        // ========================================
        // GET EXISTING USERS
        // ========================================

        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // ========================================
        // CHECK EXISTING EMAIL
        // ========================================

        const existingUser =
            users.find(function (user) {

                return user.email === email;

            });


        if (existingUser) {

            alert(
                "An account with this email already exists."
            );

            return;
        }


        // ========================================
        // CREATE NEW USER
        // ========================================

        const newUser = {

            name: name,

            email: email,

            password: password

        };


        // Add user to users array

        users.push(newUser);


        // ========================================
        // SAVE USER TO LOCAL STORAGE
        // ========================================

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // ========================================
        // SAVE CURRENT USER
        // ========================================

        localStorage.setItem(
            "userName",
            name
        );

        localStorage.setItem(
            "userEmail",
            email
        );


        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        alert(
            "🎉 Account created successfully!\n\n" +
            "Welcome to ProRoze, " +
            name +
            " 🌹"
        );


        // ========================================
        // GO TO LOGIN PAGE
        // ========================================

        window.location.href =
            "login.html";

    }
);