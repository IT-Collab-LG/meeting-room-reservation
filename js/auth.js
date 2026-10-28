//--------------------------------------------------
// REGISTER
//--------------------------------------------------

async function registerUser() {

    const fullName =
        document.getElementById("fullName")?.value?.trim();

    const email =
        document.getElementById("email")?.value?.trim();

    const password =
        document.getElementById("password")?.value;

    if (!fullName || !email || !password) {

        alert("Please fill in all fields.");

        return;
    }

    const { data, error } =
        await supabaseClient.auth.signUp({

            email,
            password,

            options: {

                data: {
                    full_name: fullName
                }

            }

        });

    if (error) {

        alert(error.message);

        return;
    }

    alert("Account created successfully.");

    window.location.href = "index.html";
}

//--------------------------------------------------
// LOGIN
//--------------------------------------------------

async function loginUser() {

    const email =
        document.getElementById("email")?.value?.trim();

    const password =
        document.getElementById("password")?.value;

    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }

    const { error } =
        await supabaseClient
            .auth
            .signInWithPassword({

                email,
                password

            });

    if (error) {

        alert(error.message);

        return;
    }

    window.location.href =
        "dashboard.html";
}

//--------------------------------------------------
// LOGOUT
//--------------------------------------------------

async function logoutUser() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "index.html";
}

//--------------------------------------------------
// SESSION CHECK
//--------------------------------------------------

async function checkSession() {

    const {

        data: {

            session

        }

    } = await supabaseClient.auth.getSession();

    const currentPage =
        window.location.pathname;

    const isPublicPage =
        currentPage.includes("index.html") ||
        currentPage.includes("register.html");

    if (!session && !isPublicPage) {

        window.location.href =
            "index.html";

        return;
    }
}

//--------------------------------------------------
// AUTO RUN
//--------------------------------------------------

checkSession();