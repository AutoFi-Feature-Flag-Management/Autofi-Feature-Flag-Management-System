import logo from "../../public/AutoFi_Logo_2020.png";
import Image from "next/Image";
import classes from '../../styles/Header.module.css';

/**

This is the Header component of the AutoFi website.
It displays the company logo in the header section.
@returns {JSX.Element} - A JSX element representing the Header component.
@example
<Header />
*/

const Header = () => {
    return(
        <div className={classes.header}><Image src={logo} className={classes.img}></Image>
        </div>
    )

}
export default Header;