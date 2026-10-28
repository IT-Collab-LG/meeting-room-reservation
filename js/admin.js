checkAdmin();

async function checkAdmin() {

    const profile =
        await getCurrentProfile();

    if (!profile)
        return;

    if (
        profile.role !==
        "admin"
    ) {

        alert(
            "Access denied"
        );

        location.href =
            "dashboard.html";

    }
}