import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  bgColor: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

function Button({ children, type="button", bgColor='black', size='md', ...rest }){
  let btnColor = {
    gray: `bg-gray-500`,
    black: 'bg-black',
    red: 'bg-red-500',
  };
  let btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-1 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
  };

  return <button type={ type } className={`${ btnColor[bgColor] } ${ btnSize[size] } text-white font-semibold ml-2 text-base hover:bg-black rounded`} { ...rest }>{ children }</button>
}

export default Button;