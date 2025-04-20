import { React } from 'react';
import '../style/footer.css';
import IconButton from '../../../components/IconButton';
import { faHouse, faSearch, faAdd, faFilm, faUser } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <IconButton icon={faHouse} />
        <IconButton icon={faSearch} />
        <IconButton icon={faAdd} />
        <IconButton icon={faFilm} />
        <IconButton icon={faUser} />
      </div>
    </footer>
  )
};

export default Footer;
