const NotFoundPage = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "4rem" }}>404 Not Found</h1>
                <p style={{ fontSize: "2rem" }}>
                    The page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
