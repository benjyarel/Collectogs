export const LoginButton = () => {
    const getRequestToken = async () => {
        try {
            const res = await fetch("/api/discog/auth");

            const textData = await res.text();
            const params = new URLSearchParams(textData);
            const { oauth_token } = Object.fromEntries(params);

            window.location.href = `https://www.discogs.com/oauth/authorize?oauth_token=${oauth_token}`;
        } catch (err) {
            console.error(err);
        }
    };
    return <button className="btn" onClick={getRequestToken}>Login</button>
}