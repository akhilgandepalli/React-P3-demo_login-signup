import styles from './Header.module.css'


const Header = () =>{

    return(
        <div className={`${styles.header}`}>
            <div>My Webpage</div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}

export default Header;