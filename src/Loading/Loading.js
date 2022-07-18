import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading container step">
            <h1>Loading...</h1>
            <div className="progress">
                <div className="color"></div>
            </div>
        </div>
    )
}

export default Loading;