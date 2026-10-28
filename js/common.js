async function getCurrentUser() {

    const {
        data
    } =
    await supabaseClient
        .auth
        .getUser();

    return data.user;
}

async function getCurrentProfile() {

    const user =
        await getCurrentUser();

    if (!user)
        return null;

    const { data } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

    return data;
}