import { GoHomeFill } from 'react-icons/go';
import { SiGooglechat } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="w-full flex text-white min-h-28 rounded-t-lg items-center justify-center gap-14 p-3 bg-slate-50 position: fixed bottom-0">
        <Link to="/" className="flex flex-col items-center text-primary">
          <GoHomeFill className="text-4xl" />
          <p className="text-nowrap">홈</p>
        </Link>
        <Link className="flex flex-col items-center  text-primary">
          <SiGooglechat className="text-4xl" />
          <p className="text-nowrap">커뮤니티</p>
        </Link>
        <Link
          to="/allcities"
          className="flex flex-col items-center  text-primary"
        >
          <MdLocationOn className="text-4xl" />
          <p className="text-nowrap">장소추천</p>
        </Link>
        <Link className="flex flex-col items-center text-primary">
          <FaAddressBook className="text-4xl" />
          <p className="text-nowrap">마이페이지</p>
        </Link>
      </footer>
    </>
  );
}

export default Footer;
