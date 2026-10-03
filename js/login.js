// ========================================
// PRO ROZE LOGIN JAVASCRIPT
// ========================================


// ========================================
// GET LOGIN FORM
// ========================================

const loginForm =
    document.getElementById("loginForm");


// ========================================
// LOGIN FORM SUBMIT
// ========================================

loginForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh
        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        const email =
            document.getElementById("email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("password")
                .value
                .trim();


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
                "Please enter your password."
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
        // GET REGISTERED USERS
        // ========================================

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // ========================================
        // FIND USER
        // ========================================

        const user =
            users.find(function (user) {

                return (
                    user.email === email &&
                    user.password === password
                );

            });


        // ========================================
        // CHECK LOGIN
        // ========================================

        if (!user) {

            alert(
                "Invalid email or password.\n\n" +
                "Please create an account first."
            );

            return;
        }


        // ========================================
        // LOGIN SUCCESS
        // ========================================

        localStorage.setItem(
            "userName",
            user.name
        );

        localStorage.setItem(
            "userEmail",
            user.email
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        alert(
            "🎉 Login successful!\n\n" +
            "Welcome back, " +
            user.name +
            " 🌹"
        );


        // ========================================
        // GO TO HOME
        // ========================================

        window.location.href =
            "index.html";

    }
);