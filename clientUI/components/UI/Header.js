import logo from "../../public/AutoFi_Logo_2020.png";
import Image from "next/Image";
import classes from '../../styles/Header.module.css';

const Header = (props) => {
    return(
        <div className={classes.header}><Image src={logo} className={classes.img}></Image>
        </div>
    )

}
export default Header;