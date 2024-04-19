import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { IoIosBookmark } from 'react-icons/io';
import LocationKeywords from './LocationKeyword';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import Loading from '@components/layout/Loading';

/* eslint-disable */
const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;
const SEVER_KEY = import.meta.env.VITE_API_SERVER;

function Location({ keyword }) {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contentID, setContentID] = useState('12');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);
  const radius = '100000';
  const { latitude, longitude } = useCurrentLocation();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (locationReady && !searchKeyword.trim().length) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=6&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
          );
          setLocationData(response.data.response.body.items.item);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };
      fetchData();
    }
  }, [locationReady, latitude, longitude, contentID]);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    if (searchKeyword) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${apiKey}&keyword=${keyword}&_type=json&contentTypeId=${contentID}`,
          );
          setLocationData(response.data.response.body.items.item);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };
      fetchData();
    }
  }, [searchKeyword, contentID]);

  const formatDistance = distance => `${(distance / 1000).toFixed(1)} km`;
  const recoDefaultImg = '/defaultImg.svg';

  const fetchNextPage = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=${currentPage + 1}&numOfRows=10&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
      );
      setLocationData(prevData => [
        ...prevData,
        ...response.data.response.body.items.item,
      ]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(
        '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
        error,
      );
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      locationData.length > 0
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locationData]);

  const handleBookMark = contentId => {
    if (!user) {
      const confirmed = confirm('로그인 부터 해주세요');
      if (confirmed) {
        navigate('/user/login');
      }
    } else {
      try {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(contentId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log('북마크 추가 성공:', contentId);
      } catch (error) {
        console.error('북마크 추가 실패:', error);
      }
    }
  };

  const options = [
    { id: '12', label: '관광지' },
    { id: '14', label: '문화시설' },
    { id: '15', label: '축제공연행사' },
    { id: '25', label: '여행지' },
    { id: '28', label: '레포츠' },
    { id: '32', label: '숙박' },
    { id: '38', label: '비오는 날 쇼핑어때요?' },
    { id: '39', label: '음식점' },
  ];

  const getCategoryText = cat2 => {
    switch (cat2) {
      case 'A0101':
        return '자연 관광지';
      case 'A0102':
        return '관광자원';
      case 'A0201':
        return '역사 관광지';
      case 'A0202':
        return '휴양&쉼터';
      case 'A0203':
        return '체험관광지';
      case 'A0401':
        return '쇼핑';
      case 'A0502':
        return '음식점';
      case 'B0201':
        return '숙박시설';
      default:
        return '문화';
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl mb-2">추천 키워드</h1>
      <div className="flex flex-wrap justify-center items-center gap-5 mb-5">
        {options.map(option => (
          <LocationKeywords
            key={option.id}
            id={option.id}
            label={option.label}
            onClick={setContentID}
          />
        ))}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locationData?.map((item, index) => (
            <div
              className="p-4 rounded-md shadow-md overflow-y-hidden"
              key={index}
            >
              <IoIosBookmark
                className="text-sub_sal w-[35px] h-[35px] ml-auto"
                onClick={() => handleBookMark(item.contentid)}
              />
              <Link key={index} to={`/location/${item.contentid}`}>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="">{item.addr1}</p>

                <img
                  src={item.firstimage ? item.firstimage : recoDefaultImg}
                  alt="이미지1"
                  className="w-full  mb-2 rounded-md overflow-hidden aspect-square object-cover"
                />

                <div className="flex w-[200px] box-border gap-3 mt-8">
                  <div className="flex justify-center items-center ml-auto gap-3">
                    <div className="bg-white w-[112px] h-[95px] flex flex-col gap-5">
                      <p className="text-center"></p>
                    </div>
                    <div className="bg-[#FFF387] w-[112px] h-[95px] flex flex-col gap-5">
                      <p className="text-center">거리</p>
                      <p className="text-xs text-center">
                        {formatDistance(item.dist)}
                      </p>
                    </div>
                    <div className="bg-primary w-[112px] h-[95px] flex flex-col gap-5">
                      <p className="text-center">분류</p>
                      <p className="text-xs text-center">
                        {getCategoryText(item.cat2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Location;
