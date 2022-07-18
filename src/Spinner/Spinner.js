import "./Spinner.css";

const Spinner = () => {
    return (
        <div class="lds-roller" style={{ background: "red" }}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Spinner;