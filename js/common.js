async function getCurrentUser() {

    const { data, error } =
        await supabaseClient.auth.getUser();

    if (error) {

        console.error(error);
        return null;

    }

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