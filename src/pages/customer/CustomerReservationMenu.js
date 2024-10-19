import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../login/axios';
import MyButton from '../../components/MyButton';
import '../../styles/customer/CustomerReservation.css';
import { FaUtensils } from 'react-icons/fa';
import moment from 'moment';

const CustomerReservationMenu = () => {
    const { popupId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [popupData, setPopupData] = useState(null);
    const [menuQuantities, setMenuQuantities] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { selectedDate, selectedTimeSlot, selectedPeople } = location.state || {};

    useEffect(() => {
        axiosInstance.get(`/customers/menu/${popupId}`)
            .then(response => {
                setPopupData(response.data);
                const initialQuantities = response.data.menus.reduce((acc, menu) => {
                    acc[menu.id] = 0;
                    return acc;
                }, {});
                setMenuQuantities(initialQuantities);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [popupId]);

    const incrementMenu = (menuId) => {
        setMenuQuantities((prevQuantities) => {
            if (prevQuantities[menuId] < 20) {
                return { ...prevQuantities, [menuId]: prevQuantities[menuId] + 1 };
            }
            return prevQuantities;
        });
    };

    const decrementMenu = (menuId) => {
        setMenuQuantities((prevQuantities) => {
            if (prevQuantities[menuId] > 0) {
                return { ...prevQuantities, [menuId]: prevQuantities[menuId] - 1 };
            }
            return prevQuantities;
        });
    };

    const handleReservation = () => {
        const selectedMenus = Object.entries(menuQuantities)
            .filter(([_, quantity]) => quantity > 0)
            .map(([menuId, quantity]) => ({
                menuId: parseInt(menuId, 10),
                quantity,
            }));

        const reservationData = {
            popupId: popupData.popupId,
            reservationTimeId: selectedTimeSlot.id,
            numberOfPeople: selectedPeople,
            reservationMenus: selectedMenus,
        };

        axiosInstance.post('customers/reservation/register', reservationData)
            .then(response => {
                if (response.status === 200) {
                    alert('예약이 성공적으로 완료되었습니다.');
                    navigate(`/customer/popup/${popupId}`);
                }
            })
            .catch(error => {
                console.error('Error during reservation:', error);
                alert('예약에 실패했습니다. 다시 시도해주세요.');
            });
    };

    const canReserve = Object.values(menuQuantities).some(quantity => quantity > 0);

    const formattedDate = moment(selectedDate).format('MM월 DD일');
    const formattedTime = selectedTimeSlot?.startTime.substring(0, 5); 

    return (
        <div className="customer-reservation-container">
            <div className='customer-reservation-popup-title'>
                <h1 className="customer-reservation-popup-name">{popupData?.popupName}</h1>
            </div>

            <div className="customer-reservation-divider"></div>

            <div className="customer-reservation-section">
                <div className="customer-reservation-label-container">
                    <FaUtensils size={22} className="customer-reservation-icon" />
                    <div className="customer-reservation-label">메뉴를 선택해주세요</div>
                </div>
            </div>

            <div className="customer-popup-menu">
                {popupData?.menus.map((menu) => (
                    <div key={menu.id} className="customer-popup-menu-item">
                        <img src={menu.imageUrl || "https://via.placeholder.com/100"} alt="menuImage" className="customer-popup-menu-image" />
                        <div className="customer-popup-menu-info">
                            <h3 className="customer-popup-menu-name">{menu.name}</h3>
                            <p className="customer-popup-menu-description">{menu.description}</p>
                            <p className="customer-popup-menu-price">{`₩${menu.price.toLocaleString()}`}</p>
                        </div>
                        <div className="customer-reservation-people-selector">
                            <button className="customer-reservation-quantity-button" onClick={() => decrementMenu(menu.id)}>-</button>
                            <div className="customer-reservation-quantity-number">{menuQuantities[menu.id]}</div>
                            <button className="customer-reservation-quantity-button" onClick={() => incrementMenu(menu.id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="customer-reservation-next-button">
                <MyButton
                    text="예약하기"
                    type="default"
                    onClick={() => setShowConfirmation(true)}
                    disabled={!canReserve}
                />
            </div>

            {showConfirmation && (
                <div className="customer-reservation-confirmation-popup">
                    <p>{`${formattedDate} ${formattedTime}에 예약하시겠습니까?`}</p>
                    <p
                    style={{
                        color: '#888'
                      }}
                    >(해당 예약은 피드백 작성을 전제로 하는 예약입니다.)</p>
                    <MyButton text="예" type="default" onClick={handleReservation}/>
                    <MyButton text="아니오" type="alt" onClick={() => setShowConfirmation(false)}/>
                </div>
            )}
        </div>
    );
};

export default CustomerReservationMenu;
