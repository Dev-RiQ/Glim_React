import { React } from 'react';
import '../style/footer.css';
import FooterButton from '../component/FooterButton';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <FooterButton icon="아이콘" title="menu1" />
        <FooterButton icon="아이콘" title="menu2" />
        <FooterButton icon="아이콘" title="menu3" />
        <FooterButton icon="아이콘" title="menu4" />
        <FooterButton icon="아이콘" title="menu5" />
      </div>
    </footer>
  )
};

export default Footer;
