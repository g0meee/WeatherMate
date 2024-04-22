import Button from '@components/layout/Button';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

DetailPageHeader.propTypes = {
  title: PropTypes.string,
};

function DetailPageHeader({ title }) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="px-5 p-5 border-b-4 flex items-center justify-between">
        <Button onClick={handleGoBack} className="flex items-center">
          <FaArrowLeft className="text-2xl" />
        </Button>

        <h1 className="font-bold text-xl">{title}</h1>
        <div className="w-5"></div>
      </div>
    </>
  );
}

export default DetailPageHeader;
