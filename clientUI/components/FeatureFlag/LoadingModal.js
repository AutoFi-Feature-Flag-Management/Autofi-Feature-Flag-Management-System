/**

A React component for displaying a loading modal.
@returns {JSX.Element} A React component representing the loading modal.
*/

import classes from "../../styles/LoadingModal.module.css";

export default function LoadingModal() {
    return (
        <div className={classes.container}>
            <h2>Loading...</h2>
        </div>
    )
}