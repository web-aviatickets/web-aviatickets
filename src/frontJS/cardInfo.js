const getCookies = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getResource = () => {
  JSON.parse(getCookies(`flight`)).forEach(({ flight_date, flight_duration, flight_id, flight_name, from, to, ticket_price, seat_number }) => {
      new TicketCard(flight_date, flight_duration, flight_id, flight_name, from, to, ticket_price, seat_number).render();
  });
}

class TicketCard {
    constructor(date, duration, id, name, from, to, price, seat) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.price = price;
        this.seat = seat;
        this.parent = document.querySelector(".wrapper-inner");
    }

    render() {
        const element = document.createElement('div');
        //element.classList.add(this.classes);
        element.innerHTML = `
        <h1>КОНТАКТНА ІНФОРМАЦІЯ ДЛЯ ЗАМОВЛЕННЯ</h1>


        <div class="ticket_information"> 
            <h4 class="subhead">Деталі перельоту</h4>
            <p>Час вильоту та прильоту місцевий</p>
            <div class="ticket_information_blk">
                <div class="ticket_information_blk_date-time">
                    <div class="ticket_information_blk_date"> ${this.date.split('T')[0]}</div>
                    <div class="ticket_information_blk_time">${this.duration.split(':')[0]} год ${this.duration.split(':')[1]} хв</div>
                </div>
                <div class="ticket_information_blk_city-duration">
                    <div class="airports">
                        <div class="departure" style="margin-right: 5px">${this.date.split('T')[1].split('.')[0]}</div>
                        <div class="plane">
                            <div class="stick"></div>
                            <div class="plane_img">
                                <img src="../img/icons/Icons8-Windows-8-Transport-Airplane-Mode-On.ico" alt="plane">
                            </div>
                        </div>
                    </div>
                    <div class="company">
                        <img src="../img/windrose.png" alt="company">
                    </div>
                </div>
                <div class="ticket_information_blk_addition">
                    <div class="ticket_information_blk_addition-name">
                        <div class="city_name_from">${this.from}</div>
                        <div class="city_name_to">${this.to}</div>
                    </div>
                    <div class="ticket_information_blk_addition-race">
                        <div class="race_to" style="margin-left:30px">${this.name}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tariff_information_blk">
            <h4 class="subhead">Ваш тариф</h4>
            <div>Переліт: <span class="tariff_text">Париж</span>-<span class="tariff_text">Пекін</span></div>
            <div class="tariff_information_blk-price-place">
                <div class="num_price">Ціна квитка: <span>${this.price}</span> грн</div>
                <div class="num_place">Номер посадкового місця: <span>${this.seat}</span></div>
            </div>
        </div>
    </div>
            `;
        this.parent.prepend(element);
    }
}

getResource();

